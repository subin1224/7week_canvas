import { Point } from './point.js';
import { radion, data, degree, colors } from './util.js';

export class Gauge {
    constructor (color, percent) {
        this.color  =   color;
        this.percent    =   percent;

        this.resize();
    }

    resize (stageWidth, stageHeight) {
        //나중에 다시 정리
        this.stageWidth     =   stageWidth;
        this.stageHeight    =   stageHeight;

        this.x = Math.floor(this.stageWidth);
        this.y = Math.floor(this.stageHeight/1.3);

        this.init();
    }

    init () {
        this.point  =   new Point(this.x, this.y);
    }

    draw (ctx) {
        ctx.beginPath();

        //const percent = data();

        // ctx.arc(this.x/2, this.y/2, this.y/4, radion(135), radion(405), false);
        ctx.arc(this.x/2, this.y/2, this.y/4, radion(135), radion(135)+radion(degree(this.percent)), false);
        ctx.lineWidth = this.y/8;

        //ctx.strokeStyle = colors[parseInt(percent/10)];
        ctx.strokeStyle = this.color;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.x/2, this.y/2, this.y/4, radion(135)+radion(degree(this.percent)), radion(405), false);
        ctx.lineWidth = this.y/8;
        ctx.strokeStyle = '#eee';
        ctx.stroke();

        ctx.beginPath();
        //font 위치 맞춰야 함.
        ctx.font = `bold ${this.y/8}px Arial`;
        ctx.fillText(this.percent, this.x/2 - 30, this.y/2 + 80);

        ctx.font = `bold ${this.y/12}px Arial`;
        ctx.fillText('percent', this.x/2 - 50, this.y/1.2);

        this.point.update();
    }

}   