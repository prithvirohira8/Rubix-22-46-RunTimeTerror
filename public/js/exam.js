let link = "";
let duration = "";
let code = "";
let fullScreenMode = 0;
function beginTest(studentId, key, database, getDatabase, ref, onValue, set) {
    console.log(key);
    onValue(ref(database, key), snap => {
        // console.log(snap.val());
        link = snap.val().test_link;
        duration = snap.val().test_duration;
        code = snap.val().test_key;
        console.log("duration", duration)
        console.log("Link", link)
        link.replace("usp=sf_link", "embedded=true");
        document.body.removeChild(document.getElementById("loading"))
        document.getElementById("test-Interface").style.display = "block";
        document.getElementById("googleForm").src = link;
        startWebcam();
    });
    detects(studentId, key, database, getDatabase, ref, onValue, set);
}

function detects(studentId, key, database, getDatabase, ref, onValue, set) {
    // FullScreen interval

    setInterval(() => {
        if (window.innerHeight == screen.height) {
        } else {
            if (fullScreenMode == 0) {
                fullScreenMode = 1;
                let refStr = 'Students/' + studentId + '/Tests/' + code;
                let readfs = 0;
                let readts = 0;
                onValue(ref(database, refStr), (snap) => {
                    readts = snap.val().tabs_changed;
                    readfs = snap.val().fullScreen;
                })
                set(ref(database, refStr), {
                    fullScreen: readfs + 1,
                    tabs_changed: readts
                })
                const fullScreen = document.createElement('div');
                fullScreen.id = "fullScreen";
                const okContent = document.createElement('div');
                okContent.id = "ok-content";
                okContent.innerHTML = `<p>Please go full Screen</p>
                <button type="button" class="btn btn-warning" id="ok">OK</button>`;
                fullScreen.appendChild(okContent);
                document.getElementById("test-Interface").appendChild(fullScreen);
                document.getElementById("ok").addEventListener('click', hideChecker)
            }
        }
    }, 1000);

    //Tab change detection
    document.addEventListener("visibilitychange", (event) => {
        if (document.visibilityState == "visible") {
        } else {
            let refStr = 'Students/' + studentId + '/Tests/' + code;
            alert("Looks like you are cheating.")
            let readfs = 0;
            let readts = 0;
            onValue(ref(database, refStr), (snap) => {
                readts = snap.val().tabs_changed;
                readfs = snap.val().fullScreen;
            })
            set(ref(database, refStr), {
                fullScreen: readfs,
                tabs_changed: readts + 1
            })
        }
    });

    //Check if terminated
    setInterval(() => {
        let refStr = 'Students/' + studentId + '/Tests/' + code;
        let term = 0;
        onValue(ref(database, refStr), (snap) => {
            term = snap.val().terminate
        })
        if (term == 1) {
            let str = `http://localhost:3000`;
            window.location.href = str;
        }
    }, 1000);
}

function startWebcam() {

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

    //Timer interval
    setInterval(() => {
        let today = new Date();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        document.getElementById("time").innerHTML = time;
    }, 1000);

    document.getElementById('endTest').addEventListener('click', e => {
        let str = `http://localhost:3000`;
        window.location.href = str;
    })

}

function hideChecker() {

    document.documentElement.webkitRequestFullscreen();
    document.getElementById("test-Interface").removeChild(document.getElementById("fullScreen"));
    fullScreenMode = 0;

}


