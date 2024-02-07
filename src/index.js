#!/usr/bin/env node

import prompt from 'inquirer'
import fs from 'fs-extra'
import path, { dirname } from 'path'
import ejs from 'ejs'
import createVite from '../lib/createVite.js'
import { fileURLToPath } from 'url'

console.log('Index.js is running')

export async function scaffoldProject(projectName) {
    const targetDir = path.join(process.cwd(), projectName)
    const __dirname = dirname(fileURLToPath(import.meta.url))
    const templateDir = path.join(__dirname, '..', 'templates')


    await fs.copy(templateDir, targetDir)
    await createVite(targetDir)
    const promptForProjectDetails = await promptForPackageJson()

    const packageJsonContent = {
        ...promptForProjectDetails,
        dependencies: {
            "react": "^18.2.0",
            "react-dom": "^18.2.0",
            "axios": "^1.5.0",
            "react-redux": "^8.1.2",
            "react-router": "^6.16.0",
            "react-router-dom": "^6.16.0",
            "redux": "^4.2.1",
            "socket.io-client": "^4.7.2"
        },
        devDependencies: {
            "@types/react": "^18.2.43",
            "@types/react-dom": "^18.2.17",
            "@vitejs/plugin-react": "^4.2.1",
            "eslint": "^8.55.0",
            "eslint-plugin-react": "^7.33.2",
            "eslint-plugin-react-hooks": "^4.6.0",
            "eslint-plugin-react-refresh": "^0.4.5",
            "vite": "^5.0.8",
            "sass": "^1.67.0"
        },
        "type": "module",
        "scripts": {
            "dev": "vite",
            "build": "vite build",
            "preview": "vite preview"
        }
    }

    await fs.writeJson(path.join(targetDir, 'package.json'), packageJsonContent, { spaces: 2 })
    console.log('Finished');

}

async function promptForPackageJson() {
    return await prompt.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the project:',
            default: 'projectName',

        },
        {
            type: 'input',
            name: 'version',
            message: 'Enter the version of the project (e.g., 1.0.0):',
            default: '1.0.0',
        },
        {
            type: 'input',
            name: 'description',
            message: 'Enter a description for the project:',

        },
    ])
}











