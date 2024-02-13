import fs from 'fs-extra'
import path from 'path'
import ejs from 'ejs'

export async function processDirectory(srcDir, destDir, entityName, includeRedux = false) {
    const entries = await fs.readdir(srcDir, { withFileTypes: true })

    for (const entry of entries) {
        const srcPath = path.join(srcDir, entry.name)
        const destEntryName = entry.name
            .replace(/^Item/i, (match) => {

                return match === 'Item'
                    ? entityName.charAt(0).toUpperCase() + entityName.slice(1)
                    : entityName.charAt(0).toLowerCase() + entityName.slice(1)
            })
            .replace('.ejs', entry.name.endsWith('.ejs') ? '' : path.extname(entry.name))
        const destPath = path.join(destDir, destEntryName)

        if (entry.isDirectory()) {
            await fs.ensureDir(destPath)
            await processDirectory(srcPath, destPath, entityName, includeRedux)
        } else if (entry.name.endsWith('.ejs')) {
            const ejsContent = await fs.readFile(srcPath, 'utf-8')
            const renderedContent = ejs.render(ejsContent, { entityName, includeRedux })
            await fs.outputFile(destPath, renderedContent)
        } else {
            await fs.copy(srcPath, destPath)
        }
    }
}
