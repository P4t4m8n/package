import pkg from 'fs-extra'
const { writeJson } = pkg
import readJson from 'fs-extra'
import { join } from 'path'

async function customizeProject(projectName) {
  const projectPath = join(process.cwd(), projectName)

  const configFilePath = join(projectPath, 'custom-config.json')
  const configContent = {
  }
  await writeJson(configFilePath, configContent, { spaces: 2 })

  const packageJsonPath = join(projectPath, 'package.json')
  const packageJson = await readJson(packageJsonPath)
  await writeJson(packageJsonPath, packageJson, { spaces: 2 })

}

export default customizeProject