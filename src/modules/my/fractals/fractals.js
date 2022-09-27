import { LightningElement, track } from 'lwc';

export default class Fractals extends LightningElement {
    @track isKoch = false;
    @track isLevy = true;
    @track isIce = false;
    @track isMinkowski = false;
    @track isShowInfo = false;

    renderedCallback(){
        if(this.isIce || this.isKoch || this.isLevy || this.isMinkowski){
            let canvas = this.template.querySelector('canvas');
            let w = canvas.width;
            let h = canvas.height
            let ctx = canvas.getContext('2d'); 
    
            ctx.fillStyle = `rgb(251, 218, 222)`;
            ctx.fillRect(0,0,w,h);
            ctx.strokeStyle = 'rgb(107, 45, 92)';
            ctx.lineWidth = 1;
          
            if(this.isIce) this.drawIce(ctx, 4);
            if(this.isKoch) this.drawKoch(ctx);
            if(this.isLevy) this.drawLevy(13, ctx);
            if(this.isMinkowski) this.drawMinkowski(ctx, 5);
        }
    }

    handleSelect(event){
        this.isKoch = false;
        this.isLevy = false;
        this.isIce = false;
        this.isMinkowski = false;

        if(event.target.value == 'levy') this.isLevy = true;
        if(event.target.value == 'ice') this.isIce = true;
        if(event.target.value == 'koch') this.isKoch = true;
        if(event.target.value == 'minkowski') this.isMinkowski = true;
    }

    handleDownloadImg(){
        if(this.isIce || this.isKoch || this.isLevy || this.isMinkowski){
            let link = document.createElement('a');
            link.download = 'fractal.png';
            link.href = this.template.querySelector('canvas').toDataURL()
            link.click();
        }
    }

    handleShowInformation(){
        let value = this.template.querySelector('select').value;

        this.isShowInfo = !this.isShowInfo;

        if(this.isShowInfo == false){
            if(value == 'levy') this.isLevy = true;
            if(value == 'ice') this.isIce = true;
            if(value == 'koch') this.isKoch = true;
            if(value == 'minkowski') this.isMinkowski = true;
        }else{
            this.isKoch = false;
            this.isLevy = false;
            this.isIce = false;
            this.isMinkowski = false;
        }
    }

    drawMinkowski(ctx, iteration_count){
        const context = ctx;    
        const startingPoints = {
             p1 : {
                x:250,
                y:160
            }, p2 : {
                x:570,
                y:160
            }
        }
        const mincovski = (a, b, limit = 0) => {
            let p1 = {
                x: a.x,
                y: a.y
            }
            let p2 = {
                x: (b.x + 3*a.x) / 4,
                y: (b.y + 3*a.y) / 4
            }
            let p5 ={
                x: (a.x + b.x) / 2,
                y: (a.y + b.y) / 2
            }
            let p3 = {
                x: ((Math.cos(Math.PI*3/ 2) * (p5.x-p2.x)) + (Math.sin(Math.PI*3/ 2) * (p5.y-p2.y)) + p2.x),
                y: ((-1*Math.sin(Math.PI*3 /2) * (p5.x-p2.x)) + (Math.cos(Math.PI*3/ 2) *(p5.y-p2.y)) + p2.y)
            }
            let p4 = {
                x: ((Math.cos(Math.PI*3/ 2) * (p2.x-p3.x)) + (Math.sin(Math.PI*3/ 2) * (p2.y-p3.y)) + p3.x),
                y: ((-1*Math.sin(Math.PI*3 /2) * (p2.x-p3.x)) + (Math.cos(Math.PI*3/ 2) *(p2.y-p3.y)) + p3.y)
            }
            let p6 = {
                x: ((Math.cos(Math.PI) * (p4.x-p5.x)) + (Math.sin(Math.PI) * (p4.y-p5.y)) + p5.x),
                y: ((-1*Math.sin(Math.PI) * (p4.x-p5.x)) + (Math.cos(Math.PI) *(p4.y-p5.y)) + p5.y)
            }
            let p7 = {
                x: ((Math.cos(Math.PI/2) * (p5.x-p6.x)) + (Math.sin(Math.PI/2) * (p5.y-p6.y)) + p6.x),
                y: ((-1*Math.sin(Math.PI/2) * (p5.x-p6.x)) + (Math.cos(Math.PI/2) *(p5.y-p6.y)) + p6.y)
            }
            let p8 = {
                x: ((Math.cos(Math.PI/2) * (p6.x-p7.x)) + (Math.sin(Math.PI/2) * (p6.y-p7.y)) + p7.x),
                y: ((-1*Math.sin(Math.PI/2) * (p6.x-p7.x)) + (Math.cos(Math.PI/2) *(p6.y-p7.y)) + p7.y)
            }
            let p9 = {
                x: ((Math.cos(Math.PI*3/2) * (p7.x-p8.x)) + (Math.sin(Math.PI*3/2) * (p7.y-p8.y)) + p8.x),
                y: ((-1*Math.sin(Math.PI*3/2) * (p7.x-p8.x)) + (Math.cos(Math.PI*3/2) *(p7.y-p8.y)) + p8.y)
            }
    
            if (limit > 0) {
                mincovski(a, p1, limit - 1)
                mincovski(p1, p2, limit - 1)
                mincovski(p2, p3, limit - 1)
                mincovski(p3, p4, limit - 1)
                mincovski(p4, p5, limit - 1)
                mincovski(p5, p6, limit - 1)
                mincovski(p6, p7, limit - 1)
                mincovski(p7, p8, limit - 1)
                mincovski(p8, p9, limit - 1)
            } else {
                context.beginPath()
                context.moveTo(a.x, a.y)
                context.lineTo(p1.x, p1.y)
                context.lineTo(p2.x, p2.y)
                context.lineTo(p3.x, p3.y)
                context.lineTo(p4.x, p4.y)
                context.lineTo(p5.x, p5.y)
                context.lineTo(p6.x, p6.y)
                context.lineTo(p7.x, p7.y)
                context.lineTo(p8.x, p8.y)
                context.lineTo(p9.x, p9.y)
                context.stroke()
            }
        }
         mincovski(startingPoints.p1, startingPoints.p2, iteration_count)    
    }

    drawLevy(iteration1, ctx1 ){
        let x1               = 330; // Stating x value
        let y1               = 90; // Stating y value
        let len            = 170;       // Stating length value
        let alpha_angle     = 0; // Stating angle value
       
        c_curve(x1,y1,len,alpha_angle,iteration1, ctx1);
        
        
        function c_curve ( x, y, length, angle, iteration, ctx  ) {
        var default_angle = 45;
        var alpha  = angle;
        if( iteration > 0 ) {
            length = (length / Math.sqrt(2));
            c_curve(x, y, length, (alpha + default_angle), (iteration - 1), ctx ); // Recursive Call
            x = (x + (length * Math.cos(toRadians(alpha + default_angle))));
            y = (y + (length * Math.sin(toRadians(alpha + default_angle))));
            c_curve(x, y, length, (alpha - default_angle), (iteration - 1), ctx ); // Recursive Call
        } else {
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo( x, y );
            ctx.lineTo( x + (length * Math.cos(toRadians(alpha))), y + (length * Math.sin(toRadians(alpha))) );
            ctx.stroke();
        }
        function toRadians  ( d ) {
            return Math.PI*(d/180.0);
            }
        }
    }

    drawKoch(ctx){
        const context = ctx;    
        const startingPoints = {
             p1 : {
                x:400,
                y:50
            }, p2 : {
                x:550,
                y:300
            }, p3 : {
                x:250,
                y:300
            }
        }
    
        const koch = (a, b, limit = 5) => {
            let [dx, dy] = [b.x - a.x, b.y - a.y] // відстані між координатами
    
            let p1 = {
                x: a.x + dx / 3,
                y: a.y + dy / 3
            }
            let p3 = {
                x: b.x - dx / 3,
                y: b.y - dy / 3
            }
            let p2 = {
                x: (Math.cos(Math.PI*5 / 3) * (p3.x-p1.x)) + (Math.sin(Math.PI *5/ 3) * (p3.y-p1.y)) + p1.x,
                y: (-1*Math.sin(Math.PI*5 / 3) * (p3.x-p1.x)) + (Math.cos(Math.PI *5/ 3) *(p3.y-p1.y)) + p1.y
            }
    
            if (limit > 0) {
                // Decrease limit each time it's called
                koch(a, p1, limit - 1)
                koch(p1, p2, limit - 1)
                koch(p2, p3, limit - 1)
                koch(p3, b, limit - 1)
            } else {
                context.beginPath()
                context.moveTo(a.x, a.y)
                context.lineTo(p1.x, p1.y)
                context.lineTo(p2.x, p2.y)
                context.lineTo(p3.x, p3.y)
                context.lineTo(b.x, b.y)
                context.stroke()
            }
        }
    
        koch(startingPoints.p1, startingPoints.p2)
        koch(startingPoints.p2, startingPoints.p3)
        koch(startingPoints.p3, startingPoints.p1)
        
    }

    drawIce(ctx, iteration_count){
    const context = ctx;    
    const startingPoints = {
        p1 : {
            x:325,
            y:100
        }, p2 : {
            x:475,
            y:100
        }, p3 : {
            x:475,
            y:250
        }, p4 : {
            x:325,
            y:250
        }
    }
    const ice = (a, b, limit = 0) => {
        let [dx, dy] = [b.x - a.x, b.y - a.y] // відстані між координатами
        let len = (b.x-a.x)/3;
        let p1 = {
            x: (a.x + b.x)/2,
            y: (a.y + b.y)/2
        }
        let p2 = {
            x: ((Math.cos(Math.PI/ 2) * (b.x-a.x)/3) + (Math.sin(Math.PI/ 2) * (b.y-a.y)/3) + p1.x),
            y: ((-1*Math.sin(Math.PI /2) * (b.x-a.x)/3) + (Math.cos(Math.PI/ 2) *(b.y-a.y)/3) + p1.y)
        }
        if (limit > 0) {
            ice(a, p1, limit - 1)
            ice(p1, p2, limit - 1)
            ice(p2, p1, limit - 1)
            ice(p1, b, limit - 1)
        } else {
            context.beginPath()
            context.moveTo(a.x, a.y)
            context.lineTo(p1.x, p1.y)
            context.lineTo(p2.x, p2.y)
            context.lineTo(p1.x, p1.y)
            context.lineTo(b.x, b.y)
            context.stroke()
        }
    }

    ice(startingPoints.p1, startingPoints.p2, iteration_count)
    ice(startingPoints.p2, startingPoints.p3, iteration_count)
    ice(startingPoints.p3, startingPoints.p4, iteration_count)
    ice(startingPoints.p4, startingPoints.p1, iteration_count)
    }
}