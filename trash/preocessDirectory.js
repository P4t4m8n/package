import fs from 'fs-extra'
import path from 'path'
import ejs from 'ejs'


export async function preProcessDirectory(srcDir, destDir, entityName) {
    const entries = await fs.readdir(srcDir, { withFileTypes: true })

    for (const entry of entries) {
        const srcPath = path.join(srcDir, entry.name)
        const destEntryName = entry.name.replace('item', entityName).replace('.ejs', '')
        const destPath = path.join(destDir, destEntryName)

        if (entry.isDirectory()) {
            await fs.ensureDir(destPath)
            await processDirectory(srcPath, destPath, entityName)
        } else if (entry.name.endsWith('.ejs')) {
            const ejsContent = await fs.readFile(srcPath, 'utf-8')
            const renderedContent = ejs.render(ejsContent, { entityName })
            await fs.outputFile(destPath, renderedContent)
        } else {
            await fs.copy(srcPath, destPath)
        }
    }
}
