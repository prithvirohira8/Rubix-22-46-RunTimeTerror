const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken")
const bodyParser = require('body-parser');


//Middle - wares 
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static(__dirname + '/public'));
// app.use(cookieParser());
app.use(express.json());
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

let userdata = "";
app.post("/post", (req, res) => {
    res.setHeader("Content-type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    userdata = req.body;
    console.log("userdata", userdata);
    var keys = Object.keys(req.body);
    userdata = JSON.parse(keys[0]);
    res.status(200).send("okay")
})
app.get("/face", (req, res) => {
    // res.setHeader("Content-type", "text/html");
    // console.log(req.params);
    // console.log(req.body.name)

    res.render('face', { userdata: JSON.stringify(userdata) })
})

app.listen(4000, () => {
    console.log("Listening on port 4000");
})