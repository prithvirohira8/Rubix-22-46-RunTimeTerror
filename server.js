const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const { spawn } = require("child_process");
const fs = require("fs");
const Jimp = require("jimp");
const atob = require("atob")

const admin = require("firebase-admin");
var keys = require("./keys.json");
const jwt = require("jsonwebtoken")
const bodyParser = require('body-parser');

admin.initializeApp({
    credential: admin.credential.cert(keys),
    databaseURL: "https://proctor-it-abd2f-default-rtdb.asia-southeast1.firebasedatabase.app"
});

function dataURLtoFile(dataurl, filename) {
    let base64Image = dataurl.split(';base64,').pop();
    fs.writeFile(filename, base64Image, { encoding: 'base64' }, function (err) {
        // console.log('File created');
    });
}

//Middle - wares 
// app.use(express.urlencoded({
//     extended: true
// }))`
app.use(express.static(__dirname + '/public'));
// app.use(cookieParser());
// app.use(express.json());
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(bodyParser.json({ limit: '50mb' }))

let refs = "";
app.post("/post", (req, res) => {
    res.setHeader("Content-type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    var keys = Object.keys(req.body);
    refs = JSON.parse(keys[0]);
    console.log(refs);
    res.status(200).send("okay")
})
app.get("/face", (req, res) => {
    // res.setHeader("Content-type", "text/html");
    // console.log(req.params);
    // console.log(req.body.name)

    res.render('face', { ref: JSON.stringify(refs) })
})

app.post("/compare", (req, res) => {
    let picture = req.body.picture;
    let pic = req.body.pic;
    dataURLtoFile(picture, 'test.jpg');
    dataURLtoFile(pic, 'testURL.jpg');
    const childPython = spawn('python', ['main.py', "test.jpg", "testURL.jpg"]);

    childPython.stdout.on('data', (data) => {
        // console.log(`stdout: ${data}`);
        // console.log(typeof (data));
        // console.log(`${data}`);
        res.status(200).json({ data: `${data}` });
    });

    childPython.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });

    childPython.on('close', (code) => {
        console.log(`Program closed with code: ${code}`);
    });


})
app.post("/detect", (req, res) => {

    console.log("Came here")
    let pic = req.body.picture;
    dataURLtoFile(pic, 'object.jpg');

    const childPython = spawn('python', ['mobile.py', 'object.jpg']);

    childPython.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        // console.log(typeof (data));
        // console.log(`${data}`);
        res.status(200).json({ data: `${data}` });
    });

})
app.listen(4000, () => {
    console.log("Listening on port 4000");
})