#!/usr/bin/env node

import prompt from 'inquirer'
import fs from 'fs-extra'
import path from 'path'
import ejs from 'ejs'
import createVite from '../lib/createVite.js'
import customizeProject from '../lib/cutomizeProject.js'

console.log('Index.js is running')

export async function init() {

    const projectName = 'your-project-name'
    const template = 'react'

    createVite(projectName, template)
    await customizeProject(projectName)
    const answers = await inquirer.prompt([
        {
            type: 'checkbox',
            message: 'Select components to include:',
            name: 'components',
            choices: ['Header', 'Footer', 'Sidebar'] // Example components
        }

    ])
    // Create project structure
    const projectDir = path.join(process.cwd(), 'my-new-project');
    await fs.ensureDir(projectDir);

    // Example: Create an index.html file
    const htmlContent = `<html><body><div id="app"></div></body></html>`;
    await fs.writeFile(path.join(projectDir, 'index.html'), htmlContent);

    // Create components based on user input
    for (const component of answers.components) {
        const componentTemplate = `<div>This is the ${component} component.</div>`; // Customize this template based on your needs
        await fs.writeFile(path.join(projectDir, 'src', `${component}.jsx`), componentTemplate);
    }

    // Handle layout selection
    const layoutTemplate = `function App() { return <div>App with ${answers.layout}</div>; }`; // Customize based on selected layout
    await fs.writeFile(path.join(projectDir, 'src', 'App.jsx'), layoutTemplate);

    console.log('Project created successfully!');
}

init().catch(console.error);
