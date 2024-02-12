import path from 'path'
import fs from 'fs-extra'


export async function handleServerServices(__dirname,serverServices, targetDir) {
    console.log("__dirname:", __dirname)
    console.log("targetDir:", targetDir)
    if (!serverServices) return;

    const serverServicesDir = path.join(__dirname, '..', '..', 'templates', 'src', 'services', 'server');
    console.log("serverServicesDir:", serverServicesDir)

    for (const service of serverServices) {

        const serviceTemplatePath = path.join(serverServicesDir, `${service}.js`);

        if (await fs.pathExists(serviceTemplatePath)) {
            const serviceContent = await fs.readFile(serviceTemplatePath, 'utf-8');
            await fs.outputFile(path.join(targetDir, 'src', 'services', `${service}.js`), serviceContent);
            
        } else {
            console.log(`Template for ${service} service not found.`);
        }
    }
}
