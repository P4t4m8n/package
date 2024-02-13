
import { exec } from 'child_process'
import util from 'util'

const execAsync = util.promisify(exec)


export async function postScaffolding(targetDir, { initializeGit }) {
    console.log('Installing dependencies...')
    await execAsync('npm install', { cwd: targetDir })
    if (initializeGit) {
        console.log('Initializing git repository...')
        await execAsync('git init', { cwd: targetDir })
    }

    console.log('Project setup complete! Here are some commands to get started:')
    console.log(`cd ${targetDir}`)
    console.log('npm run dev')
}
