const { exec, spawn } = require('child_process');

// => EXEC -
// exec('ls', (error, stdout, stderr) => {
//     if (error) {
//         console.log('error en la ejecución', error.message);
//         return;
//     }

//     if (stderr) {
//         console.log('stderr: ', stderr);
//         return;
//     }

//     console.log('stdout: ', stdout)

// });

// exec('ls -la', (error, stdout, stderr) => {
//     if (error) {
//         console.log('error en la ejecución', error.message);
//         return;
//     }

//     if (stderr) {
//         console.log('stderr: ', stderr);
//         return;
//     }

//     console.log('stdout: ', stdout)

// });

// => SPAWN

// const child = spawn('ls');
const child = spawn('ls', ['-la']);

child.stdout.on('data', (data) => {
    console.log(`stdout:\n${data}`)
})

child.stderr.on('data', (data) => {
    console.log(`stderr:\n${data}`)
})

