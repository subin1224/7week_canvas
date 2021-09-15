/* import App from "./app.js";

new App(document.querySelector('.dynamic')); */

const radion = function (degree) {
    return degree * Math.PI/180 ;
}

let data = function () {
    return (Math.round((Math.random() * 1001))/10).toFixed(1);
}

const colors = [
    {code : "rgb(163, 254, 0)"}, {code : "rgb(186, 249, 72)"},
    {code : "rgb(255, 87, 51)"}, {code : "rgb(201, 244, 124)"},
    {code : "rgb(218, 247, 166)"}, {code : "rgb(255, 195, 0)"},
    {code : "rgb(255, 87, 51)"}, {code : "rgb(199, 0, 57)"},
    {code : "rgb(144, 12, 63)"}, {code : "rgb(88, 24, 69)"},
]



const startClick = function () {
    document.querySelector('.toggle').classList.remove('toggle');
    this.classList.add('toggle');    

    return dataInterval = setInterval(function(){   //나중에 data로 바꿀것
        console.log(data());
        render(data());
    }, 1000);   //나중에 5000으로 바꿀것
}

const endClick = function () {
    document.querySelector('.toggle').classList.remove('toggle');
    this.classList.add('toggle');

    clearInterval(dataInterval);    //클로저 이용
}

const render = function (data) {
    //게이지 판과 text 판
    const animateCanvas = document.createElement('canvas');
    animateCanvas.className = "animateCanvas";

    animateCanvas.width = 600;
    animateCanvas.height = 350;
    
    const animateCtx = animateCanvas.getContext('2d');
    
    animateCtx.clearRect(0, 0, animateCanvas.width, animateCanvas.height);
    
    animateCtx.font = "bold 50px Arial";
    for(let i=0; i<data; i++){
        animateCtx.fillText(i, 270, 280);
    }

    requestAnimationFrame(render);

}


const init = function () {
    const gaugeCanvas = document.createElement('canvas');
    gaugeCanvas.className = "gaugeCanvas";

    gaugeCanvas.width = 600;
    gaugeCanvas.height = 350;

    document.querySelector('.dynamic').appendChild(gaugeCanvas);
    drawInit();
    
    const footer = document.createElement('div');
    footer.className = "footer";
    document.querySelector('.dynamic').appendChild(footer);

    const startBtn = document.createElement('button');
    startBtn.className = "btn";
    startBtn.textContent = "START";
    document.querySelector('.footer').appendChild(startBtn);
    
    const endBtn = document.createElement('button');
    endBtn.className = "btn toggle";
    endBtn.textContent = "STOP";
    document.querySelector('.footer').appendChild(endBtn);

    startBtn.addEventListener('click', startClick);
    endBtn.addEventListener('click', endClick);
}

const drawInit = function () {
    const ctx = document.querySelector('.gaugeCanvas').getContext('2d');

    ctx.beginPath();
    ctx.arc(300, 200, 150, radion(135), radion(405), false);
    ctx.lineWidth = 50;

    ctx.strokeStyle = '#eee';
    ctx.stroke();

    ctx.font = "bold 50px Arial";
    ctx.fillText('0.0', 270, 280);

    ctx.font = "bold 30px Arial";
    ctx.fillText('percent', 250, 320);
}

init();

//resize 기능 추가해야







