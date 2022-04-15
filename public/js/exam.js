let link = "";
let duration = "";
function beginTest(studentId, key, database, getDatabase, ref, onValue, set) {
    console.log(key);
    onValue(ref(database, key), snap => {
        // console.log(snap.val());
        link = snap.val().test_link;
        duration = snap.val().test_duration;
        console.log("duration", duration)
        console.log("Link", link)
        link.replace("usp=sf_link", "embedded=true");
        document.body.removeChild(document.getElementById("loading"))
        document.getElementById("test-Interface").style.display = "block";
        document.getElementById("googleForm").src = link;
        startCam();
    });
}

function startCam() {
    document.getElementById('canvas').style.display = "none";
    const canvasElement = document.getElementById('canvas');
    const webcamElement = document.getElementById('webcam');
    const webcam = new Webcam(webcamElement, 'user', canvasElement);
    webcam.start().then(res => {
        let webcamPic = webcam.snap();
    });
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    document.getElementById("time").innerHTML = time;
    setInterval(() => {
        let today = new Date();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        document.getElementById("time").innerHTML = time;
    }, 1000);
}
