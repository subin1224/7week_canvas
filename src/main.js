/* import App from "./app.js";

new App(document.querySelector('.dynamic')); */

const radion = function (degree) {
    return degree * Math.PI/180 ;
}

let data = function () {
    return (Math.round((Math.random() * 1001))/10).toFixed(1);
}

const startClick = function () {
    document.querySelector('.toggle').classList.remove('toggle');
    this.classList.add('toggle');

    return dataInterval = setInterval(function(){   //나중에 data로 바꿀것
        data;
        console.log(data());
    }, 1000);   //나중에 5000으로 바꿀것
}

const endClick = function () {
    document.querySelector('.toggle').classList.remove('toggle');
    this.classList.add('toggle');

    clearInterval(dataInterval);    //클로저 이용
}

const animate = function () {
    //게이지 판과 text 판
    
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







