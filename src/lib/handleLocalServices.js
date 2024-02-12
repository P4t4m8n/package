import path from 'path'
import fs from 'fs-extra'

export async function handleLocalServices(__dirname,localServices, targetDir) {
    if (!localServices) return;

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