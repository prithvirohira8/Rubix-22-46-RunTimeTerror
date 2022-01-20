
function fun(pic) {

    document.querySelector('.start').addEventListener('click', (e) => {
        document.querySelector('.god').removeChild(document.querySelector('.face'));

        const link = "https://docs.google.com/forms/d/e/1FAIpQLSeQS6-3-A94lBOzins6oyO0A04DssSdUYhPG5nWJTpfF5byEw/viewform?usp=sf_link";
        link.replace("usp=sf_link", "embedded=true");
        const iframe = document.createElement('iframe');
        iframe.src = link;
        iframe.width = 650;
        iframe.height = 680;
        document.querySelector('.god').appendChild(iframe);
        document.querySelector('.god').removeChild(document.querySelector('.start'));
        document.documentElement.webkitRequestFullscreen();
        $(window).blur(function () {
            alert('You are not allowed to leave');
            //do something else
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
                picture = webcam.snap();
                // console.log(pic);
                // console.log(picture);
                fetch("http://localhost:4000/compare", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify({ picture, pic })
                }).then(res => res.json())
                    .then(data => {
                        console.log(data.data);
                    })
            }, 20000);
        })
    })
}




