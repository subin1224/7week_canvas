import { Gauge } from "./gauge.js";
import { OFF, ON, DEFAULT, radion, colors, data, degree } from './util.js';
import { toggleEvent, pointerEvent } from './event.js';

class App {
    constructor () {
        this.canvas =   document.createElement('canvas');
        this.ctx    =   this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        this.btn    =  document.createElement('button');
        this.btn.className  =   "btn";
        this.btn.textContent    =  "START";
        document.body.appendChild(this.btn);

        //https://sculove.github.io/post/addEventListener-passive/
        window.addEventListener('resize', this.resize.bind(this), {
            once :  false,
            passive :   false,
            capture :   false,
        });
        
        this.init();
        this.resize();
        this.addEvent();
    }

    resize () {
        //나중에 다시 정리
        this.stageWidth     =   document.body.clientWidth;
        this.stageHeight    =   document.body.clientHeight;

        this.canvas.width   =   Math.floor(this.stageWidth) ;
        this.canvas.height  =   Math.floor(this.stageHeight/1.5) ;

        //각 픽셀 크기 조정
        //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/scale
        //this.ctx.scale(2, 2);

        //게이지에도 리사이즈가 적용 되도록 설정
        this.gauge.resize(this.stageWidth, this.stageHeight);
        this.render();
    }

    init () {
        this.active =   DEFAULT;
        
        this.pre    =   0.0;
        this.cur    =   data();

        this.time   =   0;
        this.gauge  =   new Gauge();
    }
    
    render () {
        this.x  =   this.canvas.width;
        this.y  =   this.canvas.height;
        this.ctx.clearRect(0, 0, this.x, this.y);
        
        switch (this.active) {
            case DEFAULT :
                this.gauge.draw(this.ctx);
                break;
            
            case ON :
                if (this.time < 300) {  //5초
                    this.time++;
                } else {
                    this.cur = data();
                    this.time = 0;
                }
                
                this.gauge.color    =   colors[parseInt(this.pre/10)];

                //수정 
                if (this.pre < this.cur ) {
                    this.pre += this.gauge.speed;
                    if(this.pre >= this.cur ){
                        this.pre = this.cur;
                    }
                } else if (this.pre > this.cur ) {
                    this.pre -= this.gauge.speed;
                    if(this.pre <= this.cur ){
                        this.pre = this.cur;
                    }
                } 
                
                this.gauge.percent  =   this.pre.toFixed(1);
                this.gauge.limit  =   this.cur;

                this.gauge.draw(this.ctx);

                console.log("ON:::" + this.cur);
                break;
            
            case OFF :
                this.cur    =   this.pre;
                this.gauge.color    =   colors[parseInt(this.pre/10)];
                this.gauge.percent  =   this.pre.toFixed(1);
                this.gauge.draw(this.ctx);
                break;
        }

        this.rafId  =   requestAnimationFrame(this.render.bind(this));
        if (this.active === OFF || this.active === DEFAULT ){
            cancelAnimationFrame(this.rafId);
        }
    }

    moveGauge () {
        this.ctx.clearRect(0, 0, this.x, this.y);
        this.gauge.color    =   colors[parseInt(this.pre/10)];
        this.gauge.percent  =   this.pre.toFixed(1);
        this.gauge.draw(this.ctx);
    }

    addEvent () {
        document.querySelector('.btn').addEventListener('click', toggleEvent.bind(this));
        document.querySelector('canvas').addEventListener('pointerdown', pointerEvent.bind(this));
    }
}

//나중에 main.js 에서 객체 생성으로 변경 해주기
window.onload = () => {
    new App();
}