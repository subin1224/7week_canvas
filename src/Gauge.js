
export default class Gauge{
    template () {
        const gaugeCanvas = document.createElement('canvas');
        gaugeCanvas.className = "gaugeCanvas";

        gaugeCanvas.width = 600;
        gaugeCanvas.height = 500;

        document.querySelector('.gauge').appendChild(gaugeCanvas);

        this.draw();
    }

    draw () {
        const ctx = document.querySelector('.gaugeCanvas').getContext('2d');

        //ctx.arc(x, y, 반지름, 시작점, 끝점, 방향 설정)
        // * 방향 설정 - false : (기본 값) 시계방향, true : 반시계 방향
        ctx.beginPath();
        ctx.arc(300, 200, 150, radion(135), radion(405), false);
        ctx.lineWidth = 50;

        ctx.strokeStyle = '#eee';
        ctx.stroke();

        ctx.font = "30px Arial";
        ctx.fillText('시험', 250, 250);
        ctx.fillText('PERCENT', 190, 320);
    }

    animate (data) {

    }
}

const radion = function (degree) {
    return degree * Math.PI/180 ;
}