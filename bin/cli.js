#!/usr/bin/env node

import { program } from 'commander'
import { scaffoldProject } from '../src/index.js'

program
    .name('my-starter-test')
    .description('CLI to scaffold new projects')
    .version('1.0.0')

program.command('create <project-name>')
    .description('Create a new project')
    .action((projectName) => {
        scaffoldProject(projectName)
    })

program.parse(process.argv)

