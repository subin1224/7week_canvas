import { Gauge } from "./gauge.js";
import { DEFAULT, ON, OFF, data, timestamp, colors } from './util.js';
import { toggleEvent, downEvent, moveEvent, upEvent } from './event.js';

export default class App {
    constructor () {
        this.canvas =   document.createElement('canvas');
        this.ctx    =   this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
        
        // const offCanvas  =   document.createElement('canvas');
        // const offscreen  =   offCanvas.transferControlToOffscreen();
        // const worker =   new Worker("./worker.js");
        // // => worker.js - not Found 
        // worker.postMessage({ canvas: offscreen }, [ offscreen ]);

        this.btn    =  document.createElement('button');
        this.btn.className  =   "btn";
        this.btn.textContent    =  "START";
        document.body.appendChild(this.btn);

        this.init();
        this.resize();
        this.addEvent();
    }

    init () {
        this.active =   DEFAULT;
        
        this.pre    =   0.0;
        this.cur    =   data();

        this.lastTime   =   timestamp();
        this.gauge  =   new Gauge();
    }

    resize () {
        this.stageWidth     =   document.body.clientWidth;
        this.stageHeight    =   document.body.clientHeight;
        
        const dpr = window.devicePixelRatio;

        this.canvas.width   =   this.stageWidth * dpr ;
        this.canvas.height  =   this.stageHeight/1.5 * dpr ;

        //게이지에도 리사이즈가 적용 되도록 설정
        this.gauge.resize(this.stageWidth, this.stageHeight);

        //resize 될때마다 render()의 requestAnimationFrame 중지
        if ( this.rafId ) {
            cancelAnimationFrame(this.rafId);
        }

        this.ctx.scale(dpr, dpr);

        this.render();
    }

    render () {
        this.x  =   this.canvas.width;
        this.y  =   this.canvas.height;
        this.ctx.clearRect(0, 0, this.x, this.y);
        
        switch (this.active) {
            case DEFAULT :
                break;
            
            case ON :
                this.curTime = timestamp();
                // if (this.curTime  - this.lastTime < 5000 ) {  //5초
                //     this.lastTime ++;
                // } else {
                //     this.cur = data();
                //     this.lastTime   =   timestamp();
                // }
                if (this.curTime - this.lastTime >= 5000) {
                    this.cur = data();
                    this.lastTime = timestamp()
                }

                //수정 
                if ( this.pre < this.cur ) {
                    this.pre += this.gauge.speed;
                    if ( this.pre >= this.cur ) {
                        this.pre = this.cur;
                    }
                } else if ( this.pre > this.cur ) {
                    this.pre -= this.gauge.speed;
                    if ( this.pre <= this.cur ) {
                        this.pre = this.cur;
                    }
                }

                break;
            
            case OFF :
                this.cur    =   this.pre;
                break;
        }

        this.gauge.color    =   colors[parseInt(this.pre/10)];
        this.gauge.percent  =   this.pre.toFixed(1);
        this.gauge.draw(this.ctx);

        this.rafId  =   requestAnimationFrame(this.render.bind(this));

        if (this.active === OFF || this.active === DEFAULT ){
            cancelAnimationFrame(this.rafId);
        }
    }
   

    addEvent () {
        window.addEventListener('resize', this.resize.bind(this));

        document.querySelector('.btn').addEventListener('click', toggleEvent.bind(this));

        document.querySelector('canvas').addEventListener('mousedown', downEvent.bind(this));
        document.querySelector('canvas').addEventListener('mousemove', moveEvent.bind(this));
        document.querySelector('canvas').addEventListener('mouseup', upEvent.bind(this));
        document.querySelector('canvas').addEventListener('mouseleave', upEvent.bind(this));
    }
}