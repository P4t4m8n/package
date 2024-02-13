import fs from 'fs-extra'
import path from 'path'
import ejs from 'ejs'

export async function processEjsTemplates(srcDir, destDir, entityName, ejsFiles) {
    for (const fileName of ejsFiles) {
        const ejsFilePath = path.join(srcDir, fileName)
        const ejsContent = await fs.readFile(ejsFilePath, 'utf-8')
        const renderedContent = ejs.render(ejsContent, { entityName })

        const newFileName = fileName.replace('Item', entityName.charAt(0).toUpperCase() + entityName.slice(1)).replace('.ejs', '')
        await fs.outputFile(path.join(destDir, newFileName), renderedContent)
    }
}
