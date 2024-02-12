import fs from 'fs-extra'
import ejs from 'ejs'
import { fileURLToPath } from 'url'
import path from 'path'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function customize(answers, targetDir) {
    const { name, version, databaseType, entityName, includeRedux, features, serverServices, hooks, localServices } = answers
    let dependencies = {
        "react": "*",
        "react-dom": "*"
    }
    let devDependencies = {
        "vite": "*",
    }

    if (features.includes('customHooks') && hooks) {
        const customHooksDir = path.join(__dirname, '..', 'templates', 'src', 'customHooks')

        for (const hook of hooks) {
            const hookTemplatePath = path.join(customHooksDir, `${hook}.js`)
            if (await fs.pathExists(hookTemplatePath)) {
                const hookContent = await fs.readFile(hookTemplatePath, 'utf-8')

                await fs.outputFile(path.join(targetDir, 'src', 'customHooks', `${hook}.js`), hookContent)
            } else {
                console.log(`Template for ${hook} hook not found.`)
            }
        }
    }

    if (databaseType === 'server' && serverServices) {
        const serverServicesDir = path.join(__dirname, '..', '..', 'templates', 'src', 'services', 'server')
        console.log("serverServicesDir:", serverServicesDir)
        console.log("__dirname:", __dirname)

        for (const service of serverServices) {
            const serviceTemplatePath = path.join(serverServicesDir, `${service}.js`)
            if (await fs.pathExists(serviceTemplatePath)) {
                const serviceContent = await fs.readFile(serviceTemplatePath, 'utf-8')
                await fs.outputFile(path.join(targetDir, 'src', 'services', `${service}.js`), serviceContent)
            } else {
                console.log(`Template for ${service} service not found.`)
            }
        }
    }

    if (databaseType === 'local' && localServices) {
        const localServicesDir = path.join(__dirname, '..', 'templates', 'src', 'services', 'local')

        for (const service of localServices) {
            const serviceTemplatePath = path.join(localServicesDir, `${service}.js`)
            if (await fs.pathExists(serviceTemplatePath)) {
                const serviceContent = await fs.readFile(serviceTemplatePath, 'utf-8')
                await fs.outputFile(path.join(targetDir, 'src', 'services', `${service}.js`), serviceContent)
            } else {
                console.log(`Template for ${service} service not found.`)
            }
        }
    }

    const utilTemplatePath = path.join(__dirname, '..', '..', 'templates', 'src', 'services', 'util.service.js')
    const utilContent = await fs.readFile(utilTemplatePath, 'utf-8')
    await fs.outputFile(path.join(targetDir, 'src', 'services', 'util.service.js'), utilContent)

    if (databaseType === 'server') {
        dependencies['axios'] = '*'
    }

    const serviceSrcDir = path.join(__dirname, '..', 'templates', 'src', 'services', databaseType)
    const serviceDestDir = path.join(targetDir, 'src', 'services')
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

    const pagesSrcDir = path.join(__dirname, '..', 'templates', 'src', 'pages')
    const pagesDestDir = path.join(targetDir, 'src', 'pages')
    await fs.copy(pagesSrcDir, pagesDestDir)

    const ejsPagesFiles = ['ItemEdit.jsx.ejs', 'ItemIndex.jsx.ejs', 'ItemDetails.jsx.ejs']

    for (const fileName of ejsPagesFiles) {
        const ejsFilePath = path.join(pagesSrcDir, fileName)
        const ejsContent = await fs.readFile(ejsFilePath, 'utf-8')
        const renderedContent = ejs.render(ejsContent, { entityName })

        const newFileName = fileName.replace('Item', entityName.charAt(0).toUpperCase() + entityName.slice(1)).replace('.ejs', '')
        await fs.outputFile(path.join(pagesDestDir, newFileName), renderedContent)
    }

    for (const fileName of ejsPagesFiles) {
        await fs.remove(path.join(pagesDestDir, fileName))
    }

    const appJsxTemplatePath = path.join(__dirname, '..', 'templates', 'App.jsx.ejs')
    const appJsxTemplate = await fs.readFile(appJsxTemplatePath, 'utf-8')
    const appJsxContent = ejs.render(appJsxTemplate, {
        includeRedux,
    })
    await fs.outputFile(path.join(targetDir, 'src', 'App.jsx'), appJsxContent)

    if (includeRedux) {
        const storeSrcDir = path.join(__dirname, '..', 'templates', 'src', 'store')
        const storeDestDir = path.join(targetDir, 'src', 'store')
        await fs.copy(storeSrcDir, storeDestDir)

        const ejsFiles = ['item.actions.js.ejs', 'item.reducer.js.ejs']

        for (const fileName of ejsFiles) {
            const ejsFilePath = path.join(storeSrcDir, fileName)
            const ejsContent = await fs.readFile(ejsFilePath, 'utf-8')
            const renderedContent = ejs.render(ejsContent, { entityName })

            const newFileName = fileName.replace('Item', entityName.charAt(0).toUpperCase() + entityName.slice(1)).replace('.ejs', '')
            await fs.outputFile(path.join(storeDestDir, newFileName), renderedContent)
        }

        for (const fileName of ejsFiles) {
            await fs.remove(path.join(storeDestDir, fileName))
        }
    }

    const cmpsSrcDir = path.join(__dirname, '..', 'templates', 'src', 'Cmps')
    const cmpsDestDir = path.join(targetDir, 'src', 'Cmps')
    await fs.copy(cmpsSrcDir, cmpsDestDir)

    const ejsCmpsFiles = ['ItemList.jsx.ejs', 'ItemPreview.jsx.ejs']

    for (const fileName of ejsCmpsFiles) {
        const ejsFilePath = path.join(cmpsSrcDir, fileName)
        const ejsContent = await fs.readFile(ejsFilePath, 'utf-8')
        const renderedContent = ejs.render(ejsContent, { entityName })

        const newFileName = fileName.replace('Item', entityName.charAt(0).toUpperCase() + entityName.slice(1)).replace('.ejs', '')
        await fs.outputFile(path.join(cmpsDestDir, newFileName), renderedContent)
    }

    for (const fileName of ejsCmpsFiles) {
        await fs.remove(path.join(cmpsDestDir, fileName))
    }

    const packageJsonTemplate = await fs.readFile(path.join(__dirname, '..', 'templates', 'package.json.ejs'), 'utf-8')
    const packageJsonContent = ejs.render(packageJsonTemplate, {
        name,
        version,
        dependencies,
        devDependencies,
    })

    await fs.outputFile(path.join(targetDir, 'package.json'), packageJsonContent)

    const viteConfigTemplate = await fs.readFile(path.join(__dirname, '..', 'templates', 'vite.config.js.ejs'), 'utf-8')
    const viteConfigContent = ejs.render(viteConfigTemplate, {
        usesTypescript: answers.features.includes('typescript'),
    })

    await fs.outputFile(path.join(targetDir, 'vite.config.js'), viteConfigContent)
}