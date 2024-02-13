#!/usr/bin/env node

import path from 'path'
import { promptForStructure } from './lib/promptForStructure.js'
import { customize } from './lib/customize.js'
import { postScaffolding } from './lib/postScaffolding.js'

console.log('Index.js is running')

export async function scaffoldProject(projectName) {
    const targetDir = path.join(process.cwd(), projectName)
    const answers = await promptForStructure()

    await customize(answers, targetDir)
    await postScaffolding(targetDir,answers)
    console.log('Your project is ready!')

}

















