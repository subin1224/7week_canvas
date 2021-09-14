import { data, radion, _ON, _OFF } from './util.js';
import { Gauge } from './gauge.js';

const toggleEvent = function () {
    const $btn = document.querySelector('.btn');

    if ($btn.value === _OFF ) {
        $btn.textContent = "STOP";
        this.active = _ON;

        //ctx.clearRect(0, 0, document.body.clientWidth, document.body.clientHeight);
        // this.gauge.animate(this.ctx);
        // dataInterval = setInterval(function(){   //나중에 data로 바꿀것
        //     console.log(data());
        // }, 1000);   //나중에 5000으로 바꿀것
    }else {
        $btn.textContent = "START";
        $btn.active = _OFF;
        // clearInterval(dataInterval);
    }

}

export { toggleEvent } ;