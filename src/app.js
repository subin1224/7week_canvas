import { Gauge } from './gauge.js';
import { DEFAULT, ON, OFF, data, timestamp, colors } from './util.js';
import {
  toggleEvent,
  downEvent,
  moveEvent,
  upEvent,
  changeDegreeEvent,
  blurEvent,
} from './event.js';

export default class App {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);

    // const offCanvas  =   document.createElement('canvas');
    // const offscreen  =   offCanvas.transferControlToOffscreen();
    // const worker =   new Worker("./worker.js");
    // // => worker.js - not Found
    // worker.postMessage({ canvas: offscreen }, [ offscreen ]);

    const div = document.createElement('div');
    div.className = 'inputDiv';
    document.body.appendChild(div);

    //각도 버튼
    const degreeBtn180 = document.createElement('button');
    degreeBtn180.className = 'degreeBtn';
    degreeBtn180.textContent = 180;
    document.querySelector('.inputDiv').appendChild(degreeBtn180);

    const degreeBtn270 = document.createElement('button');
    degreeBtn270.className = 'degreeBtn';
    degreeBtn270.textContent = 270;
    document.querySelector('.inputDiv').appendChild(degreeBtn270);

    const degreeBtn360 = document.createElement('button');
    degreeBtn360.className = 'degreeBtn';
    degreeBtn360.textContent = 360;
    document.querySelector('.inputDiv').appendChild(degreeBtn360);

    //애니메이션 시작 버튼
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = 'START';
    document.body.appendChild(btn);

    this.dataInput = document.createElement('input');
    this.dataInput.className = 'dataInput';
    this.dataInput.value = '0.0';
    this.dataInput.readOnly = true;
    document.body.appendChild(this.dataInput);

    this.init();
    this.resize();
    this.addEvent();
  }

  init() {
    this.active = DEFAULT;

    this.preData = 0.0;
    this.curData = data();

    this.lastTime = timestamp();
    this.gauge = new Gauge(); //초기 값
  }

  resize() {
    this.stageWidth = document.body.clientWidth / 2;
    this.stageHeight = document.body.clientHeight / 2;

    const dpr = window.devicePixelRatio;

    this.canvas.width = this.stageWidth * dpr;
    this.canvas.height = (this.stageHeight / 1.5) * dpr;

    //게이지에도 리사이즈가 적용 되도록 설정
    this.gauge.resize(this.stageWidth, this.stageHeight);

    //resize 될때마다 render()의 requestAnimationFrame 중지
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }

    this.ctx.scale(dpr, dpr);

    this.render();
  }

  render() {
    this.x = this.canvas.width;
    this.y = this.canvas.height;
    this.ctx.clearRect(0, 0, this.x, this.y);

    switch (this.active) {
      case DEFAULT:
        break;

      case ON:
        this.curTime = timestamp();
        if (this.curTime - this.lastTime >= 5000) {
          this.curData = data();
          this.lastTime = timestamp();
        }
        this.dataInput.value = this.curData;
        //수정
        if (this.preData < this.curData) {
          this.preData += this.gauge.speed;
          if (this.preData >= this.curData) {
            this.preData = this.curData;
          }
        } else if (this.preData > this.curData) {
          this.preData -= this.gauge.speed;
          if (this.preData <= this.curData) {
            this.preData = this.curData;
          }
        }

        break;

      case OFF:
        this.curData = this.preData;
        break;
    }

    this.gauge.color = colors[parseInt(this.preData / 10)];
    this.gauge.percent = this.preData.toFixed(1);
    this.gauge.draw(this.ctx);

    this.rafId = requestAnimationFrame(this.render.bind(this));

    if (this.active === OFF || this.active === DEFAULT) {
      cancelAnimationFrame(this.rafId);
    }
  }

  addEvent() {
    window.addEventListener('resize', this.resize.bind(this));
    window.addEventListener('blur', blurEvent.bind(this));

    document
      .querySelector('.btn')
      .addEventListener('click', toggleEvent.bind(this));

    document
      .querySelector('canvas')
      .addEventListener('mousedown', downEvent.bind(this));
    document
      .querySelector('canvas')
      .addEventListener('mousemove', moveEvent.bind(this));
    document
      .querySelector('canvas')
      .addEventListener('mouseup', upEvent.bind(this));
    document
      .querySelector('canvas')
      .addEventListener('mouseleave', upEvent.bind(this));

    document
      .querySelector('.inputDiv')
      .addEventListener('click', changeDegreeEvent.bind(this));
  }
}
