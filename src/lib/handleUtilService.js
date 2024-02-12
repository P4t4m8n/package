import path from 'path'
import fs from 'fs-extra'

export async function handleUtilService(__dirname, targetDir) {
    const utilTemplatePath = path.join(__dirname, '..', '..', 'templates', 'src', 'services', 'util.service.js')
    const utilContent = await fs.readFile(utilTemplatePath, 'utf-8')
    await fs.outputFile(path.join(targetDir, 'src', 'services', 'util.service.js'), utilContent)
}