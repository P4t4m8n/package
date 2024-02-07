import fs from 'fs-extra'

export async function createProjectStructure() {
    const projectDir = path.join(process.cwd(), 'my-new-project')
    await fs.ensureDir(projectDir) 

    const templateDir = path.join(__dirname, 'templates')
    const headerTemplatePath = path.join(templateDir, 'Header.jsx')
    const footerTemplatePath = path.join(templateDir, 'Footer.jsx')

    const targetHeaderPath = path.join(projectDir, 'src', 'Header.jsx')
    const targetFooterPath = path.join(projectDir, 'src', 'Footer.jsx')

    await copyTemplateFile(headerTemplatePath, targetHeaderPath)
    await copyTemplateFile(footerTemplatePath, targetFooterPath)

}

createProjectStructure().catch(console.error)

export async function copyTemplateFile(templateFilePath, targetFilePath) {
    try {
        const content = await fs.readFile(templateFilePath, 'utf8')
        await fs.ensureFile(targetFilePath) 
        await fs.writeFile(targetFilePath, content)
        console.log(`File ${templateFilePath} was copied to ${targetFilePath}`)
    } catch (error) {
        console.error('An error occurred while copying the file:', error)
    }
}

