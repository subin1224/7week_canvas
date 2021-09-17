import { DEFAULT, ON, OFF, mousePos, timestamp, colors } from './util.js';
import { isInsideArc, pointDegree, toPercent } from './calc.js';

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
    down = true;
    
    mousePos.x  =   e.layerX;
    mousePos.y  =   e.layerY;
    
    if ( !isInsideArc(this.gauge.circleX, this.gauge.circleY, mousePos.x, mousePos.y, this.gauge.radius) ) return;
    
    this.pre = toPercent(pointDegree(this.gauge.circleX, this.gauge.circleY, mousePos.x, mousePos.y));
    
    this.ctx.clearRect(0, 0, this.x, this.y);
    this.gauge.color    =   colors[parseInt(this.pre/10)];
    this.gauge.percent  =   this.pre.toFixed(1);
    this.gauge.draw(this.ctx);
    
    this.cur = this.pre;
    this.curTime = timestamp();
}

const moveEvent = function (e) {
    if (!down) return;
    
    // downEvent 와 중복 - 수정 => 피드백 요청
    mousePos.x  =   e.layerX;
    mousePos.y  =   e.layerY;
    
    if ( !isInsideArc(this.gauge.circleX, this.gauge.circleY, mousePos.x, mousePos.y, this.gauge.radius) ) return;
    
    this.pre = toPercent( pointDegree( this.gauge.circleX, this.gauge.circleY, mousePos.x, mousePos.y ) );

    this.ctx.clearRect(0, 0, this.x, this.y);
    this.gauge.color    =   colors[parseInt(this.pre/10)];
    this.gauge.percent  =   this.pre.toFixed(1);
    this.gauge.draw(this.ctx);

    this.cur = this.pre;
    this.curTime = timestamp();
}

const upEvent = function (e) {
    down = false;
}

export { toggleEvent, downEvent, moveEvent, upEvent };