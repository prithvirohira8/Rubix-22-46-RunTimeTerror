
// function fun(pic) {

//     document.querySelector('.start').addEventListener('click', (e) => {
//         document.querySelector('.god').removeChild(document.querySelector('.face'));

//         const link = "https://docs.google.com/forms/d/e/1FAIpQLSeQS6-3-A94lBOzins6oyO0A04DssSdUYhPG5nWJTpfF5byEw/viewform?usp=sf_link";
//         link.replace("usp=sf_link", "embedded=true");
//         const iframe = document.createElement('iframe');
//         iframe.src = link;
//         iframe.width = 650;
//         iframe.height = 680;
//         document.querySelector('.god').appendChild(iframe);
//         document.querySelector('.god').removeChild(document.querySelector('.start'));
//         document.documentElement.webkitRequestFullscreen();
//         $(window).blur(function () {
//             alert('You are not allowed to leave');
//             //do something else
//         });
//         const video = document.createElement('div');
//         video.className = "new-video";
//         document.querySelector('.god').appendChild(video);
//         video.innerHTML = `<video id="webcam" autoplay playsinline width="300" height="250"></video>
//         <canvas id="canvas" class="d-none"></canvas>`;
//         document.getElementById('canvas').style.display = "none";
//         const canvasElement = document.getElementById('canvas');
//         const webcamElement = document.getElementById('webcam');

//         const webcam = new Webcam(webcamElement, 'user', canvasElement);
//         webcam.start().then(res => {
//             setInterval(() => {
//                 picture = webcam.snap();
//                 // console.log(pic);
//                 // console.log(picture);
//                 fetch("http://localhost:4000/compare", {
//                     method: "POST",
//                     headers: {
//                         'Content-Type': 'application/json'
//                         // 'Content-Type': 'application/x-www-form-urlencoded',
//                     },
//                     body: JSON.stringify({ picture, pic })
//                 }).then(res => res.json())
//                     .then(data => {
//                         console.log(data.data);
//                     })

//                 fetch("http://localhost:4000/detect", {
//                     method: "POST",
//                     headers: {
//                         'Content-Type': 'application/json'
//                         // 'Content-Type': 'application/x-www-form-urlencoded',
//                     },
//                     body: JSON.stringify({ picture })
//                 }).then(res => res.json())
//                     .then(data => {
//                         console.log(data.data)
//                     })
//             }, 10000);



//         })
//     })
// }

// function fun(pic) {

//     let code = "Code";
//     let link = "link";
//     onValue(ref(database, refs.testref), snap => {
//         console.log(snap.val())
//         code = snap.val().test_key;
//         link = snap.val().test_link;
//         console.log(code);


//         let ref_str = 'Students/' + refs.studentref + '/Tests/' + code;
//         let read = 0;
//         onValue(ref(database, ref_str), (snapshot) => {
//             console.log(snapshot.val());
//             read = snapshot.val().tabs_changed;
//         });

//         document.querySelector('.start').addEventListener('click', (e) => {
//             document.querySelector('.god').removeChild(document.querySelector('.face'));
//             // link = "https://docs.google.com/forms/d/e/1FAIpQLSeQS6-3-A94lBOzins6oyO0A04DssSdUYhPG5nWJTpfF5byEw/viewform?usp=sf_link";
//             link.replace("usp=sf_link", "embedded=true");
//             const iframe = document.createElement('iframe');
//             iframe.src = link;
//             iframe.width = 650;
//             iframe.height = 680;
//             document.querySelector('.god').appendChild(iframe);
//             // document.querySelector('.god').removeChild(document.querySelector('.start'));
//             document.querySelector('.start').style.display = "none";
//             document.documentElement.webkitRequestFullscreen();

//             $(window).blur(function () {
//                 alert('You are not allowed to leave');
//                 let ref_str = 'Students/' + refs.studentref + '/Tests/' + code;
//                 // let student_tabs_changed = 0;
//                 let read = 0;
//                 onValue(ref(database, ref_str), (snapshot) => {
//                     console.log(snapshot.val());
//                     read = snapshot.val().tabs_changed;
//                 });
//                 set(ref(database, ref_str), {
//                     tabs_changed: read + 1
//                 })

//             });
//             const video = document.createElement('div');
//             video.className = "new-video";
//             document.querySelector('.god').appendChild(video);
//             video.innerHTML = `<video id="webcam" autoplay playsinline width="300" height="250"></video>
//             <canvas id="canvas" class="d-none"></canvas>`;
//             document.getElementById('canvas').style.display = "none";
//             const canvasElement = document.getElementById('canvas');
//             const webcamElement = document.getElementById('webcam');

//             const webcam = new Webcam(webcamElement, 'user', canvasElement);
//             webcam.start().then(res => {
//                 setInterval(() => {
//                     picture = webcam.snap();
//                     console.log(pic);
//                     console.log(picture);
//                     fetch("http://localhost:4000/compare", {
//                         method: "POST",
//                         headers: {
//                             'Content-Type': 'application/json'
//                             // 'Content-Type': 'application/x-www-form-urlencoded',
//                         },
//                         body: JSON.stringify({ picture, pic })
//                     }).then(res => res.json())
//                         .then(data => {
//                             console.log(data.data);
//                         })

//                     fetch("http://localhost:4000/detect", {
//                         method: "POST",
//                         headers: {
//                             'Content-Type': 'application/json'
//                             // 'Content-Type': 'application/x-www-form-urlencoded',
//                         },
//                         body: JSON.stringify({ picture })
//                     }).then(res => res.json())
//                         .then(data => {
//                             console.log(data.data)
//                             alert("Mobile detected")
//                         })
//                 }, 20000);



//             })
//         })
//     })
// }
