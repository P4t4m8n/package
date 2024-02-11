#!/usr/bin/env node

import path from 'path'
import { promptForStructure } from './lib/promptForStructure'
import { customize } from './lib/customize'
import { postScaffolding } from './lib/postScaffolding'

console.log('Index.js is running')

export async function scaffoldProject(projectName) {
    const targetDir = path.join(process.cwd(), projectName)
    const answers = await promptForStructure()

    await customize(answers, targetDir)
    await postScaffolding(targetDir)
    console.log('Your project is ready!')

}

















