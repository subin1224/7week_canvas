const drawSomething = function (context) {
    this.x  =   this.canvas.width;
    this.y  =   this.canvas.height;
    
    context.clearRect(0, 0, this.x, this.y);
    
    switch (this.active) {
        case DEFAULT :
            break;
        
        case ON :
            if (this.time < 300) {  //5초
                this.time ++;
            } else {
                this.cur = data();
                this.time = 0;
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
    this.gauge.draw(context);
    
    this.rafId  =   requestAnimationFrame(render);

    if (this.active === OFF || this.active === DEFAULT ){
        cancelAnimationFrame(this.rafId);
    }
}

self.onmessage = function(e) {
    const offscreen =   e.data.canvas;
    const context   =   offscreen.getContext('2d');

    function render (time) {
        drawSomething(context);
        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}
    

