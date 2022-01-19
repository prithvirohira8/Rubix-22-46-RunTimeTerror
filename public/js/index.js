const { spawn } = require('child_process');

//const childPython = spawn('python', ['--version']);
const childPython = spawn('python', ['main.py', 'obama1.jpeg', 'obama2.jpeg']);

childPython.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

childPython.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
});

childPython.on('close', (code) => {
    console.log(`Program closed with code: ${code}`);
});
