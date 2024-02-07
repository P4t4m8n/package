import pkg from 'fs-extra'
const { writeJson } = pkg
import readJson from 'fs-extra'
import { join } from 'path'

async function customizeProject(projectName) {
  const projectPath = join(process.cwd(), projectName)

  // Example: Add a custom config file
  const configFilePath = join(projectPath, 'custom-config.json')
  const configContent = {
    // Your custom configuration here
  }
  await writeJson(configFilePath, configContent, { spaces: 2 })

  // Example: Modify an existing file
  const packageJsonPath = join(projectPath, 'package.json')
  const packageJson = await readJson(packageJsonPath)
  // Modify package.json as needed
  await writeJson(packageJsonPath, packageJson, { spaces: 2 })

  // You can also add directories, copy files, etc.
}

export default customizeProject