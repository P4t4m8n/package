import fs from 'fs-extra'

export async function createProjectStructure() {
    const projectDir = path.join(process.cwd(), 'my-new-project')
    await fs.ensureDir(projectDir)  // Create project directory

    // Define paths for your template files
    const templateDir = path.join(__dirname, 'templates')
    const headerTemplatePath = path.join(templateDir, 'Header.jsx')
    const footerTemplatePath = path.join(templateDir, 'Footer.jsx')

    // Define target paths in the new project
    const targetHeaderPath = path.join(projectDir, 'src', 'Header.jsx')
    const targetFooterPath = path.join(projectDir, 'src', 'Footer.jsx')

    // Copy template files to the new project
    await copyTemplateFile(headerTemplatePath, targetHeaderPath)
    await copyTemplateFile(footerTemplatePath, targetFooterPath)

    // You can add more files as needed following the same pattern
}

createProjectStructure().catch(console.error)

export async function copyTemplateFile(templateFilePath, targetFilePath) {
    try {
        const content = await fs.readFile(templateFilePath, 'utf8')
        await fs.ensureFile(targetFilePath)  // Ensures that the file exists, and if the file that is requested to be created is in directories that do not exist, these directories are created.
        await fs.writeFile(targetFilePath, content)
        console.log(`File ${templateFilePath} was copied to ${targetFilePath}`)
    } catch (error) {
        console.error('An error occurred while copying the file:', error)
    }
}

