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
    // var arr = dataurl.split(','),
    //     mime = arr[0].match(/:(.*?);/)[1],
    //     bstr = atob(arr[1]),
    //     n = bstr.length,
    //     u8arr = new Uint8Array(n);
    // while (n--) {
    //     u8arr[n] = bstr.charCodeAt(n);
    // }
    // return new File([u8arr], filename, { type: mime });

    // const buffer = Buffer.from(dataurl, "base64");
    // fs.writeFileSync("picture.jpg", buffer);
    let base64Image = dataurl.split(';base64,').pop();
    fs.writeFile(filename, base64Image, { encoding: 'base64' }, function (err) {
        console.log('File created');
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

app.post("/post", (req, res) => {
    res.setHeader("Content-type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).send("okay")
})
app.get("/face", (req, res) => {
    // res.setHeader("Content-type", "text/html");
    // console.log(req.params);
    // console.log(req.body.name)

    res.render('face')
})

app.post("/compare", (req, res) => {


    // req.body
    console.log("yes came here")
    // console.log(req.body)
    res.status(200).send("hello")
    // dataURLtoFile(req.body.picture, 'test')
    let picture = req.body.picture;
    // picture = picture.replace("data:image/png;base64,", "")
    let pic = req.body.pic;


    dataURLtoFile(picture, 'test.jpg');
    dataURLtoFile(pic, 'testURL.jpg');
    // const childPython = spawn('python', ['--version']);
    const childPython = spawn('python', ['main.py', "test.jpg", "testURL.jpg"]);

    childPython.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    childPython.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });

    childPython.on('close', (code) => {
        console.log(`Program closed with code: ${code}`);
    });
})
app.listen(4000, () => {
    console.log("Listening on port 4000");
})