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
const cryptoJs = require("crypto-js");

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

app.use(express.static(__dirname + '/public'));
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
    console.log("refs: ", refs);
    res.status(200).send("okay")
})

app.post("/compare", (req, res) => {
    let picture = req.body.webcamPic;
    let pic = req.body.databasePic;
    console.log(pic)
    dataURLtoFile(picture, "img1.jpg");
    dataURLtoFile(pic, "img2.jpg")


    const childPython = spawn('python', ['main.py']);

    childPython.stdout.on('data', (data) => {
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

app.get("/face/:key", (req, res) => {
    const key = req.params.key;
    res.render('face', { ref: JSON.stringify(refs), key: JSON.stringify(key) })
})

app.get("/Test/:id/:key", (req, res) => {
    let key = req.params.key;
    key = key.replace(/@/g, '/')
    let bytes = cryptoJs.AES.decrypt(key, 'my-secret-key@123');
    console.log(bytes.toString(cryptoJs.enc.Utf8));
    res.render('test', { studentId: JSON.stringify(req.params.id), key: JSON.stringify(bytes.toString(cryptoJs.enc.Utf8)) });

})


app.listen(4000, () => {
    console.log("Listening on port 4000");
})