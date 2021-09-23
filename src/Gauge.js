import { radion, degree, crispPixel } from './calc.js';

export class Gauge {
    constructor () {
        this.color  =   '#eee';
        this.percent    =   parseFloat(0.0).toFixed(1);
        this.speed  =   1.1;

        this.circleDegree = 270;

        this.resize();
    }

    resize (stageWidth, stageHeight) {
        this.gaugeWidth = Math.floor(stageWidth);
        this.gaugeHeight = Math.floor(stageHeight/1.4);

        this.circleX = Math.round(this.gaugeWidth/2);
        this.circleY = Math.round(this.gaugeHeight/2);
        this.radius = Math.round(this.gaugeHeight/3);
    }

    draw (ctx) {
        ctx.beginPath();
        ctx.arc(this.circleX, this.circleY, this.radius, radion(this.circleDegree/2), radion(this.circleDegree/2) + radion(this.circleDegree), false);
        ctx.lineWidth = Math.round(this.circleY/4);
        ctx.strokeStyle = '#eee';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.circleX, this.circleY, this.radius, radion(this.circleDegree/2), radion(this.circleDegree/2) + radion(degree(this.circleDegree, this.percent)), false);
        ctx.lineWidth = Math.round(this.circleY/4);
        ctx.strokeStyle = this.color;
        ctx.stroke();

        ctx.closePath();

        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        
        ctx.font = `bold ${Math.round(this.gaugeHeight/8)}px Arial`;
        ctx.fillText(this.percent, this.gaugeWidth/2, this.gaugeHeight/2);

        ctx.font = `bold ${this.gaugeHeight/12}px Arial`;
        ctx.fillText('percent', this.gaugeWidth/2, this.gaugeHeight/1.5);
    }

}   