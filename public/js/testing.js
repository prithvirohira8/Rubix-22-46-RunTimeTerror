
function fun() {
    document.querySelector('.start').addEventListener('click', (e) => {
        document.querySelector('.god').removeChild(document.querySelector('.face'));

        const link = "https://docs.google.com/forms/d/e/1FAIpQLSeQS6-3-A94lBOzins6oyO0A04DssSdUYhPG5nWJTpfF5byEw/viewform?usp=sf_link";
        link.replace("usp=sf_link", "embedded=true");
        const iframe = document.createElement('iframe');
        iframe.src = link;
        iframe.width = 650;
        iframe.height = 874;
        document.querySelector('.god').appendChild(iframe);
        document.documentElement.webkitRequestFullscreen();
        $(window).blur(function () {
            alert('You are not allowed to leave');
            //do something else
        });
    })
}




