import { exec } from 'child_process'

  function createVite(projectName, template) {
    console.log("projectName:", projectName)
    
    const command = `npm create vite@latest`
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`)
            return
        }
        console.log(`stdout: ${stdout}`)
        console.error(`stderr: ${stderr}`)

        customizeProject(projectName)
    })
}

export default createVite
