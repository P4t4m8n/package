import fs from 'fs-extra'
import ejs from 'ejs'
import { fileURLToPath } from 'url'
import path from 'path'

import { handleServerServices } from './handleServerServices.js'
import { handleLocalServices } from './handleLocalServices.js'
import { handleUtilService } from './handleUtilService.js'
import { handleCustomHooks } from './handleCustomHooks.js'
import { processDirectory } from './processDirectory.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function customize(answers, targetDir) {
    const { name, version, databaseType, entityName, includeRedux, features, serverServices, hooks, localServices } = answers
    let dependencies = {
        "react": "*",
        "react-dom": "*",
        "react-router-dom": "*",
        "sass": "*"
    }
    let devDependencies = {
        "vite": "*",
        "@types/react": "*",
        "@types/react-dom": "*",
        "@vitejs/plugin-react": "*",
        "eslint": "*",
        "eslint-plugin-react": "*",
        "eslint-plugin-react-hooks": "*",
        "eslint-plugin-react-refresh": "*",
    }

    if (databaseType === 'server') {
        dependencies['axios'] = '*'
    }

    await handleCustomHooks(__dirname, hooks, targetDir)
    await handleServerServices(__dirname, serverServices, targetDir)
    await handleLocalServices(__dirname, localServices, targetDir)
    await handleUtilService(__dirname, targetDir)

    const serviceSrcDir = path.join(__dirname, '..', '..', 'templates', 'src', 'services', databaseType)
    const serviceDestDir = path.join(targetDir, 'src', 'services')

    const eventBusTemplate = await fs.readFile(path.join(__dirname, '..', '..', 'templates', 'src', 'services', 'event-bus.service.js'), 'utf-8')
    await fs.outputFile(path.join(serviceDestDir, 'event-bus.service.js'), eventBusTemplate)

    const utilTemplate = await fs.readFile(path.join(__dirname, '..', '..', 'templates', 'src', 'services', 'util.service.js'), 'utf-8')
    await fs.outputFile(path.join(serviceDestDir, 'util.service.js'), utilTemplate)


    await fs.copy(serviceSrcDir, serviceDestDir)

    const originalServiceFilePath = path.join(serviceDestDir, 'item.service.js')
    const newServiceFilePath = path.join(serviceDestDir, `${entityName}.service.js`)

    if (await fs.pathExists(originalServiceFilePath)) {
        let serviceFileContent = await fs.readFile(originalServiceFilePath, 'utf-8')

        serviceFileContent = serviceFileContent.replaceAll('item', entityName)
        serviceFileContent = serviceFileContent.replaceAll('Item', entityName.charAt(0).toUpperCase() + entityName.slice(1))

        await fs.outputFile(newServiceFilePath, serviceFileContent)
        await fs.remove(originalServiceFilePath)
    }

    const pagesSrcDir = path.join(__dirname, '..', '..', 'templates', 'src', 'pages')
    const pagesDestDir = path.join(targetDir, 'src', 'pages')
    await processDirectory(pagesSrcDir, pagesDestDir, entityName)

    const appJsxTemplatePath = path.join(__dirname, '..', '..', 'templates', 'src', 'App.jsx.ejs')
    const appJsxTemplate = await fs.readFile(appJsxTemplatePath, 'utf-8')
    const appJsxContent = ejs.render(appJsxTemplate, {
        includeRedux,
        entityName
    })
    await fs.outputFile(path.join(targetDir, 'src', 'App.jsx'), appJsxContent)

    if (includeRedux) {
        const storeSrcDir = path.join(__dirname, '..', '..', 'templates', 'src', 'store')
        const storeDestDir = path.join(targetDir, 'src', 'store')
        await processDirectory(storeSrcDir, storeDestDir, entityName)
        dependencies["react-redux"] = "*"
        dependencies["redux"] = "*"
    }

    const styleSrcDir = path.join(__dirname, '..', '..', 'templates', 'src', 'style')
    const styleDestDir = path.join(targetDir, 'src', 'style')
    await processDirectory(styleSrcDir, styleDestDir, entityName)

    const cmpsSrcDir = path.join(__dirname, '..', '..', 'templates', 'src', 'cmps')
    const cmpsDestDir = path.join(targetDir, 'src', 'cmps')
    await processDirectory(cmpsSrcDir, cmpsDestDir, entityName)

    const packageJsonTemplate = await fs.readFile(path.join(__dirname, '..', '..', 'templates', 'package.json.ejs'), 'utf-8')
    const packageJsonContent = ejs.render(packageJsonTemplate, {
        name,
        version,
        dependencies,
        devDependencies,
    })

    await fs.outputFile(path.join(targetDir, 'package.json'), packageJsonContent)

    const viteConfigTemplate = await fs.readFile(path.join(__dirname, '..', '..', 'templates', 'vite.config.js.ejs'), 'utf-8')
    const viteConfigContent = ejs.render(viteConfigTemplate, {
        usesTypescript: answers.features.includes('typescript'),
    })
    await fs.outputFile(path.join(targetDir, 'vite.config.js'), viteConfigContent)

    const indexTemplate = await fs.readFile(path.join(__dirname, '..', '..', 'templates', 'index.html'), 'utf-8')
    await fs.outputFile(path.join(targetDir, 'index.html'), indexTemplate)

    const RootCmpTemplate = await fs.readFile(path.join(__dirname, '..', '..', 'templates', 'src', 'RootCmp.jsx'), 'utf-8')
    await fs.outputFile(path.join(targetDir, 'src', 'RootCmp.jsx'), RootCmpTemplate)

    const gitignoreTemplate = await fs.readFile(path.join(__dirname, '..', '..', 'templates', '.gitignore'), 'utf-8')
    await fs.outputFile(path.join(targetDir, '.gitignore'), gitignoreTemplate)

    const eslintrcTemplate = await fs.readFile(path.join(__dirname, '..', '..', 'templates', '.eslintrc.cjs'), 'utf-8')
    await fs.outputFile(path.join(targetDir, '.eslintrc.cjs'), eslintrcTemplate)
}