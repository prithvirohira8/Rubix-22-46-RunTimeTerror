const { spawn } = require('child_process');

//const childPython = spawn('python', ['--version']);
const childPython = spawn('python', ['scripty1.py', '--shape-predictor', 'shape_predictor_68_face_landmarks.dat']);

childPython.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

childPython.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
});

childPython.on('close', (code) => {
    console.log(`Program closed with code: ${code}`);
});
