let globalRef;
let gloabalTestkey;
function Start(app, database, getDatabase, ref, onValue, set, refs, key) {

    let name = "";
    let databasePic = "";
    let webcamPic = "";
    globalRef = refs;
    gloabalTestkey = key;
    const starCountRef = ref(database, 'Students/' + refs.studentref);
    const webcamElement = document.getElementById('webcam');
    const canvasElement = document.getElementById('canvas');
    const webcam = new Webcam(webcamElement, 'user', canvasElement);

    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        name = data.Student_Name;
        if (document.querySelector('.face'))
            document.getElementById('name').innerHTML = `Welcome ${name}`
        databasePic = data.Photo;
    });



    webcam.start().then(res => {
        document.getElementById("snap").addEventListener('click', e => {

            webcamPic = webcam.snap();
            console.log(webcamPic);
            alert("Photo taken");
            fetch("http://localhost:4000/compare", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({ webcamPic, databasePic })
            }).then(res => res.json())
                .then(data => {
                    alert(data.data)
                })
        });
    })


    //     document.getElementById("snap").addEventListener('click', (e) => {

    //         setTimeout(() => {
    //             webcamPic = webcam.snap();
    //             canvasElement.className = "";

    //             const register = document.createElement('button');
    //             register.className = "start";
    //             register.innerHTML = `Start`
    //             document.querySelector('.god').appendChild(register);
    //             // fun(pic)
    //             // fetch("http://localhost:4000/compare", {
    //             //     method: "POST",
    //             //     headers: {
    //             //         'Content-Type': 'application/json'
    //             //         // 'Content-Type': 'application/x-www-form-urlencoded',
    //             //     },
    //             //     body: JSON.stringify({ webcamPic, pic })
    //             // }).then(res => res.json())
    //             //     .then(data => {
    //             //         alert(data.data)
    //             //         // const register = document.createElement('button');
    //             //         // register.className = "start";
    //             //         // register.innerHTML = `Start`
    //             //         // document.querySelector('.god').appendChild(register);
    //             //         fun(pic);
    //             //     })

    //         }, 1000);

    //     })
    // })



    function fun(pic) {

        let code = "Code";
        let link = "link";
        let duration = "dur";
        onValue(ref(database, refs.testref), snap => {
            console.log(snap.val())
            code = snap.val().test_key;
            link = snap.val().test_link;
            duration = snap.val().test_duration;
            console.log("duration", duration)
            console.log(code);


            let ref_str = 'Students/' + refs.studentref + '/Tests/' + code;
            let read = 0;
            onValue(ref(database, ref_str), (snapshot) => {
                console.log(snapshot.val());
                read = snapshot.val().tabs_changed;
            });

            document.querySelector('.start').addEventListener('click', (e) => {
                document.querySelector('.god').removeChild(document.querySelector('.face'));

                TimeMe.initialize({
                    currentPageName: `${document.title}`, // current page
                    idleTimeoutInSeconds: 30 // seconds
                });

                setInterval(() => {
                    let timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();
                    console.log(timeSpentOnPage);
                }, 1000);

                link = "https://docs.google.com/forms/d/e/1FAIpQLSeQS6-3-A94lBOzins6oyO0A04DssSdUYhPG5nWJTpfF5byEw/viewform?usp=sf_link";

                link.replace("usp=sf_link", "embedded=true");
                const iframe = document.createElement('iframe');
                iframe.src = link;
                iframe.width = 650;
                iframe.height = 720;
                document.querySelector('.god').appendChild(iframe);
                // document.querySelector('.god').removeChild(document.querySelector('.start'));
                document.querySelector('.start').style.display = "none";
                document.getElementById('snap').style.display = "none";
                document.documentElement.webkitRequestFullscreen();

                document.querySelector('.ok').addEventListener('click', e => {
                    document.documentElement.webkitRequestFullscreen();
                    document.querySelector('.alert').style.display = "none";
                })


                // setTimeout(() => {
                //     window.location.href = "http://localhost:3000/"
                // }, duration * 100);

                $(window).blur(function () {
                    // alert('You are not allowed to leave');
                    let ref_str = 'Students/' + refs.studentref + '/Tests/' + code;
                    let read = 0;
                    onValue(ref(database, ref_str), (snapshot) => {
                        console.log(snapshot.val());
                        read = snapshot.val().tabs_changed;
                    });
                    set(ref(database, ref_str), {
                        tabs_changed: read + 1
                    })

                });


                const video = document.createElement('div');
                video.className = "new-video";
                document.querySelector('.god').appendChild(video);
                video.innerHTML = `<video id="webcam" autoplay playsinline width="300" height="250"></video>
                <canvas id="canvas" class="d-none"></canvas>`;
                document.getElementById('canvas').style.display = "none";
                const canvasElement = document.getElementById('canvas');
                const webcamElement = document.getElementById('webcam');


                const webcam = new Webcam(webcamElement, 'user', canvasElement);
                webcam.start().then(res => {

                    setInterval(() => {
                        webcamPic = webcam.snap();
                        fetch("http://localhost:4000/compare", {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json'
                                // 'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            body: JSON.stringify({ webcamPic, pic })
                        }).then(res => res.json())
                            .then(data => {
                                console.log(data.data);
                            })

                        fetch("http://localhost:4000/detect", {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json'
                                // 'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            body: JSON.stringify({ webcamPic })
                        }).then(res => res.json())
                            .then(data => {
                                console.log(data.data)
                                console.log(typeof (data.data))
                                if (data.data == 1) {
                                    alert("Mobile Detected !!")
                                }
                            })
                    }, 20000);



                })
            })
        })
    }
}

function StartTest() {
    document.documentElement.webkitRequestFullscreen();
    let str = `http://localhost:4000/Test/${globalRef.studentref}/${gloabalTestkey}`;
    window.location.href = str;

}
