export function drawMinkowski(ctx, iteration_count){
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

export function drawLevy(iteration1, ctx1){

    const levy = ( x, y, length, alpha, iteration, ctx) => {
        const toRadians = value  =>  Math.PI*(value / 180.0);
        
        if( iteration > 0 ) {
            length = (length / Math.sqrt(2));

            levy(x, y, length, (alpha + 45), (iteration - 1), ctx);

            x = (x + (length * Math.cos(toRadians(alpha + 45))));
            y = (y + (length * Math.sin(toRadians(alpha + 45))));

            levy(x, y, length, (alpha - 45), (iteration - 1), ctx);
        } else {
            ctx.beginPath();
            ctx.moveTo( x, y );
            ctx.lineTo( x + (length * Math.cos(toRadians(alpha))), y + (length * Math.sin(toRadians(alpha))) );
            ctx.stroke();
        }
    }

    levy(330, 90, 170, 0, iteration1, ctx1);
}

export function drawKoch(ctx, iteration_count){
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

    const koch = (a, b, limit = iteration_count) => {
        let [dx, dy] = [b.x - a.x, b.y - a.y]

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

export function drawIce(ctx, iteration_count){
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

export function fromRGBtoHSL({r, g, b}){
    let aR = r/255, aG = g/255, aB = b/255

    let max = r < g ? (b < g ? g : b) : (b < r ? r : b);
    let min = r < g ? (b < r ? b : r) : (b < g ? b : g);
    let delta = max - min;

    let h = 0;

    if(max === r && g >= b) h = 60 * ((g - b) / delta) + 0;
    if(max === r && g < b) h = 60 * ((g - b) / delta) + 360;
    if(max === g) h = 60 * ((b - r) / delta) + 120;
    if(max === b) h = 60 * ((r - g) / delta) + 240;

    max = aR < aG ? (aB < aG ? aG : aB) : (aB < aR ? aR : aB);
    min = aR < aG ? (aB < aR ? aB : aR) : (aB < aG ? aB : aG);
    delta = max - min;

    let l = (max + min)/2;
    let s = 0;

    if(delta !== 0) s = delta / ( 1 - Math.abs(2*l - 1))

    return {
        h : Math.round(h),
        s : parseFloat(s.toFixed(3)),
        l : parseFloat(l.toFixed(3))
    };
}

export function fromHSLtoRGB({h, s, l}){
    let c = (1 - Math.abs(2*l - 1)) * s;
    let x = c * (1 - Math.abs((h / 60) % 2 - 1));
    let m = l - c / 2;

    let aR, aG, aB;

    if(h >= 0 && h < 60){
        aR = c;
        aG = x;
        aB = 0;
    }
    if(h >= 60 && h < 120){
        aR = x;
        aG = c;
        aB = 0;
    }
    if(h >= 120 && h < 180){
        aR = 0;
        aG = c;
        aB = x;
    }
    if(h >= 180 && h < 240){
        aR = 0;
        aG = x;
        aB = c;
    }
    if(h >= 240 && h < 300){
        aR = x;
        aG = 0;
        aB = c;
    }
    if(h >= 300 && h < 360){
        aR = c;
        aG = 0;
        aB = x;
    }

    let r = (aR + m)*255, g = (aG + m)*255, b = (aB + m)*255;
    
    return {
        r: Math.round(r),
        g: Math.round(g),
        b: Math.round(b)
    };
}