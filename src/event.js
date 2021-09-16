import { DEFAULT, ON, OFF, mousePos, data, colors } from './util.js';
import { radion, degree, isInsideArc, pointDegree, toPercent } from './calc.js';

let down = false;

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

const downEvent = function (e) {
    
    mousePos.x  =   e.layerX;
    mousePos.y  =   e.layerY;
    
    if (!isInsideArc(this.gauge.circleX, this.gauge.circleY, mousePos.x, mousePos.y, this.gauge.radius) ) return;
    
    down = true;

    this.pre = toPercent(pointDegree(this.gauge.circleX, this.gauge.circleY, mousePos.x, mousePos.y));

    this.moveGauge();
}

const moveEvent = function (e) {
    if (!down) return;
    
    mousePos.x  =   e.layerX;
    mousePos.y  =   e.layerY;
    
    if (!isInsideArc(this.gauge.circleX, this.gauge.circleY, mousePos.x, mousePos.y, this.gauge.radius) ) return;
    
    this.pre = toPercent(pointDegree(this.gauge.circleX, this.gauge.circleY, mousePos.x, mousePos.y));

    this.moveGauge();
}

const upEvent = function (e) {
    down = false;
}


export { toggleEvent, downEvent, moveEvent, upEvent };