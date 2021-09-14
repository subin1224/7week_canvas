import { Gauge } from "./gauge.js";
import { _OFF, _ON, radion, colors, data, degree } from './util.js';
import { toggleEvent } from './event.js';

class App {
    constructor () {
        this.canvas =   document.createElement('canvas');
        this.ctx    =   this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        this.btn = document.createElement('button');
        this.btn.className = "btn";
        this.btn.textContent = "START";
        this.active = _OFF;
        document.body.appendChild(this.btn);

        //https://sculove.github.io/post/addEventListener-passive/
        window.addEventListener('resize', this.resize.bind(this), {
            once :  false,
            passive :   false,
            capture :   false,
        });

        this.gauge = new Gauge('#eee', 0.0);

        this.resize();
        this.addEvent();

    }

    resize () {
        //나중에 다시 정리
        this.stageWidth     =   document.body.clientWidth;
        this.stageHeight    =   document.body.clientHeight;

        this.canvas.width   =   Math.floor(this.stageWidth) ;
        this.canvas.height  =   Math.floor(this.stageHeight/1.3) ;

        //크기를 2배로 늘렸으므로 각 픽셀이 2개씩 차지
        //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/scale
        //this.ctx.scale(2, 2);

        //게이지에도 리사이즈가 적용 되도록 설정
        this.gauge.resize(this.stageWidth, this.stageHeight);
        this.render();
    }

    render () {
        this.x = this.canvas.width;
        this.y = this.canvas.height;
        this.ctx.clearRect(0, 0, this.x, this.y);

        const percent = data();

        switch (this.active) {
            case _OFF :
                this.gauge.draw(this.ctx);
                break;
            case _ON :
                this.gauge = new Gauge(colors[parseInt(percent/10)], percent);
                this.gauge.draw(this.ctx);
                break;
        }

        this.rafId = requestAnimationFrame(this.render);
        if (this.active === _OFF ){
            cancelAnimationFrame(this.rafId);
        }

        // this.ctx.beginPath();

        // this.ctx.arc(this.x/2, this.y/2, this.y/4, radion(135), radion(405), false);
        // this.ctx.lineWidth = this.y/8;
    
        // this.ctx.strokeStyle = '#eee';
        // this.ctx.stroke();
        
        // //font 위치 맞춰야 함.
        // this.ctx.font = `bold ${this.y/8}px Arial`;
        // this.ctx.fillText('0.0', this.x/2 - 30, this.y/2 + 80);
    
        // this.ctx.font = `bold ${this.y/12}px Arial`;
        // this.ctx.fillText('percent', this.x/2 - 50, this.y/1.2);
    }

    addEvent () {
        document.querySelector('.btn').addEventListener('click', toggleEvent.bind(this));
    }
}

//나중에 main.js 에서 객체 생성으로 변경 해주기
window.onload = () => {
    new App();
}