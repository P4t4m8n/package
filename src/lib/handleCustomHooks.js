import path from 'path'
import fs from 'fs-extra'


export async function handleCustomHooks(__dirname,hooks, targetDir) {
    if (!hooks) return
    const customHooksDir = path.join(__dirname, '..','..', 'templates', 'src', 'customHooks')
    console.log("customHooksDir:", customHooksDir)
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
