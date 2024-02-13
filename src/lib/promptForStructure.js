import prompt from 'inquirer'


export async function promptForStructure() {
    const answers = await prompt.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the project:',
            default: 'projectname',
        },
        {
            type: 'input',
            name: 'version',
            message: 'Enter the version of the project (e.g., 1.0.0):',
            default: '1.0.0',
        },
        {
            type: 'confirm',
            name: 'includeRedux',
            message: 'Would you like to include Redux Tookit in your project?(store, reducers and actions)',
            default: false,
        },
        {
            type: 'checkbox',
            name: 'features',
            message: 'Select features to include in your project:',
            choices: [
                { name: 'Custom Hooks', value: 'customHooks' },
            ],
        },
        {
            type: 'checkbox',
            name: 'hooks',
            message: 'Select Custom hooks to include:',
            choices: [
                { name: 'Contex Menu', value: 'useContextMenu' },
                { name: 'Device Check', value: 'useDeviceCheck' },
                { name: 'Drag and Drop', value: 'useDND' },
                { name: 'Use Effect Update', value: 'useEffectUpdate' },
                { name: 'Use Form', value: 'useForm' },
                { name: 'Use Image Upload', value: 'useImageUpload' },
            ],
            when: (answers) => answers.features.find(feature => feature === 'customHooks')
        },

        {
            type: 'list',
            name: 'databaseType',
            message: 'Choose the database type for your project:',
            choices: [
                { name: 'Backend-Server', value: 'server' },
                { name: 'async Local Storage', value: 'local' }
            ],
        },
        {
            type: 'checkbox',
            name: 'serverServices',
            message: 'Select additional server services you want to include:',
            choices: [
                { name: 'HTTP Service', value: 'http.service' },
                { name: 'Socket Service', value: 'socket.service' },
                { name: 'Upload Service', value: 'upload.service' },
                { name: 'User Service', value: 'user.service' }
            ],
            when: (answers) => answers.databaseType === 'server'
        },
       
        {
            type: 'checkbox',
            name: 'localServices',
            message: 'Select additional local services you want to include:',
            choices: [
                { name: 'User Service', value: 'user.service' }
            ],
            when: (answers) => answers.databaseType === 'local'
        },
        {
            type: 'input',
            name: 'entityName',
            message: 'Enter the entity name (e.g., toy, book):',
            default: 'item',
        },
        {
            type: 'confirm',
            name: 'initializeGit',
            message: 'Would you like to initialize a Git repository?',
            default: false,
        },

    ])
    return answers
}