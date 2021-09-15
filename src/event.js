import { mousePos, data, radion, ON, OFF, DEFAULT } from './util.js';
import { Gauge } from './gauge.js';

const toggleEvent = function (e) {
    if (this.active === OFF || this.active === DEFAULT) {
        this.active = ON;
        e.target.textContent = "STOP";

    } else {
        e.target.textContent = "START";
        this.active = OFF;        
    }
    this.render();    
}

const pointerEvent = function (e) {
    mousePos.x  =   e.layerX;
    mousePos.y  =   e.layerY;
    console.log(mousePos.x);
    console.log(`중심 = ${this.x/2}`)

    //this.x/2 this.y/2 <= arc의 중심점
    console.log(`####${mousePos.x === this.x/2}`)
    if(mousePos.x === this.x/2){
        this.pre = 50.0;
    }
    this.moveGauge();
}

export { toggleEvent, pointerEvent } ;