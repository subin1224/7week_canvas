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
    
    const x = mousePos.x - this.gauge.circleX;
    const y = mousePos.y - this.gauge.circleY;

    if ( !isInsideArc(x, y, this.gauge.radius) ) return;
    
    this.preData = toPercent(this.gauge.circleDegree, pointDegree(x, y, this.gauge.circleDegree));

    this.ctx.clearRect(0, 0, this.x, this.y);
    this.gauge.color    =   colors[parseInt(this.preData/10)];
    this.gauge.percent  =   this.preData.toFixed(1);
    this.gauge.draw(this.ctx);
    
    this.curData = this.preData;
    this.curTime = timestamp();
}

const moveEvent = function (e) {
    if (!down) return;
    
    // downEvent 와 중복 - 수정 => 피드백 요청
    mousePos.x  =   e.layerX;
    mousePos.y  =   e.layerY;

    const x = mousePos.x - this.gauge.circleX;
    const y = mousePos.y - this.gauge.circleY;

    if ( !isInsideArc(x, y, this.gauge.radius) ) return;
    
    this.preData = toPercent(this.gauge.circleDegree, pointDegree(x, y, this.gauge.circleDegree));

    this.ctx.clearRect(0, 0, this.x, this.y);
    this.gauge.color    =   colors[parseInt(this.preData/10)];
    this.gauge.percent  =   this.preData.toFixed(1);
    this.gauge.draw(this.ctx);

    this.curData = this.preData;
    this.curTime = timestamp();
}

const upEvent = function (e) {
    down = false;
}

const changeDegreeEvent = function (e) {
    if ( e.target.className !== "degreeBtn" ) return;

    for(const btn of document.querySelectorAll('.inputDiv button')){
        btn.classList.remove('onDegree');
    }
    
    e.target.classList.add('onDegree');

    const degree = e.target.textContent;
    this.gauge.circleDegree = degree;
    this.render();
}

const blurEvent = function (e) {
    if (this.active !== ON ) return;
    document.querySelector('.btn').textContent = "START";
    this.active = OFF; 
    this.render();    
}

export { toggleEvent, downEvent, moveEvent, upEvent, changeDegreeEvent, blurEvent };