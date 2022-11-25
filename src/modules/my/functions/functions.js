export function drawMinkowski(context, iteration_count){
    //задаємо точки базового відрізка
    const startingPoints = {
         p1 : {
            x:250,
            y:160
        }, p2 : {
            x:570,
            y:160
        }
    }
    //функція ітерації побудови франкалу
    //a,b - точки відрізка
    //limit - кількість ітерацій що повинні відбутись
    const mincovski = (a, b, limit = 0) => {
        //точка початку відрізка
        let p1 = {
            x: a.x,
            y: a.y
        }
        //точка на базовому відрізку на віддалі 1/4 його довжини від точки p1
        let p2 = {
            x: (b.x + 3*a.x) / 4,
            y: (b.y + 3*a.y) / 4
        }
        //точка на базовому відрізку на віддалі 1/2 його довжини від точки p1
        let p5 ={
            x: (a.x + b.x) / 2,
            y: (a.y + b.y) / 2
        }
        //точка, результат повороту точки p5 на 270 градусів за годинниковою стрілкою навколо точки p2
        let p3 = {
            x: ((Math.cos(Math.PI*3/ 2) * (p5.x-p2.x)) + (Math.sin(Math.PI*3/ 2) * (p5.y-p2.y)) + p2.x),
            y: ((-1*Math.sin(Math.PI*3 /2) * (p5.x-p2.x)) + (Math.cos(Math.PI*3/ 2) *(p5.y-p2.y)) + p2.y)
        }
        //точка, результат повороту точки p2 на 270 градусів за годинниковою стрілкою навколо точки p3
        let p4 = {
            x: ((Math.cos(Math.PI*3/ 2) * (p2.x-p3.x)) + (Math.sin(Math.PI*3/ 2) * (p2.y-p3.y)) + p3.x),
            y: ((-1*Math.sin(Math.PI*3 /2) * (p2.x-p3.x)) + (Math.cos(Math.PI*3/ 2) *(p2.y-p3.y)) + p3.y)
        }
        //точка, результат повороту точки p4 на 180 градусів за годинниковою стрілкою навколо точки p5
        let p6 = {
            x: ((Math.cos(Math.PI) * (p4.x-p5.x)) + (Math.sin(Math.PI) * (p4.y-p5.y)) + p5.x),
            y: ((-1*Math.sin(Math.PI) * (p4.x-p5.x)) + (Math.cos(Math.PI) *(p4.y-p5.y)) + p5.y)
        }
        //точка, результат повороту точки p5 на 90 градусів за годинниковою стрілкою навколо точки p6
        let p7 = {
            x: ((Math.cos(Math.PI/2) * (p5.x-p6.x)) + (Math.sin(Math.PI/2) * (p5.y-p6.y)) + p6.x),
            y: ((-1*Math.sin(Math.PI/2) * (p5.x-p6.x)) + (Math.cos(Math.PI/2) *(p5.y-p6.y)) + p6.y)
        }
        //точка, результат повороту точки p6 на 90 градусів за годинниковою стрілкою навколо точки p7
        let p8 = {
            x: ((Math.cos(Math.PI/2) * (p6.x-p7.x)) + (Math.sin(Math.PI/2) * (p6.y-p7.y)) + p7.x),
            y: ((-1*Math.sin(Math.PI/2) * (p6.x-p7.x)) + (Math.cos(Math.PI/2) *(p6.y-p7.y)) + p7.y)
        }
         //точка, результат повороту точки p7 на 270 градусів за годинниковою стрілкою навколо точки p8
        let p9 = {
            x: ((Math.cos(Math.PI*3/2) * (p7.x-p8.x)) + (Math.sin(Math.PI*3/2) * (p7.y-p8.y)) + p8.x),
            y: ((-1*Math.sin(Math.PI*3/2) * (p7.x-p8.x)) + (Math.cos(Math.PI*3/2) *(p7.y-p8.y)) + p8.y)
        }

        if (limit > 0) {
             //якщо це не кінцева ітерація - почерговий рекурсивний виклик функції для кожного відрізка новоутвореної фігури
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
            //почергова промальовка кожного з відрізків утвореної фігури
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
    //виклик функції для базового відрізка
    mincovski(startingPoints.p1, startingPoints.p2, iteration_count)    
}

export function drawLevy(iteration1, ctx1){
    //x,y - початкові точки побудови відрізка
    //length - довжина нового відрізка
    //alpha - кут нахилу нового відрізка відносно базового
    //iteration - кількість ітерацій побудови фракталу
    //ctx - контекст тегу canvas
    const levy = ( x, y, length, alpha, iteration, ctx) => {
        //функція конвертації градусів у радіани
        const toRadians = value  =>  Math.PI*(value / 180.0);
        
        if( iteration > 0 ) {
            //розрахунок нової довжини відрізка для наступної ітерації
            length = (length / Math.sqrt(2));

            //рекурсивний виклик функції побудови відрізка з поворотом на 45 градусів проти годинникової стрілки відносно базового 
            levy(x, y, length, (alpha + 45), (iteration - 1), ctx);
            //розрахунок нових координат початку відрізка, що збігається з кінцем побудови за минулий виклик функції 
            x = (x + (length * Math.cos(toRadians(alpha + 45)))); 
            y = (y + (length * Math.sin(toRadians(alpha + 45))));
            //рекурсивний виклик функції побудови відрізка з поворотом на 45 градусів за годинниковою стрілкою відносно базового 
            levy(x, y, length, (alpha - 45), (iteration - 1), ctx);//рекурсивний виклик функції
        } else { 
            //креслення відрізка
            ctx.beginPath();
            ctx.moveTo( x, y ); 
            ctx.lineTo( x + (length * Math.cos(toRadians(alpha))), y + (length * Math.sin(toRadians(alpha))) );
            ctx.stroke();
        }
    }

    levy(330, 90, 170, 0, iteration1, ctx1); 
}

export function drawKoch(context, iteration_count){
  //задаємо точки базового трикутника
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
    //функція ітерації побудови франкалу
    //a,b - точки відрізка
    //limit - кількість ітерацій що повинні відбутись
    const koch = (a, b, limit = iteration_count) => {
        
        let [dx, dy] = [b.x - a.x, b.y - a.y]
        //точка на відрізку ab на віддалі 1/3 довжини ab від точки a
        let p1 = {
            x: a.x + dx / 3,
            y: a.y + dy / 3
        }
        //точка на відрізку ab на віддалі 1/3 довжини ab від точки b
        let p3 = {
            x: b.x - dx / 3,
            y: b.y - dy / 3
        }
        //точка, що разом з точками p1 та p3 формує рівносторонній трикутник шляхом повороту точки p3 на 300 градусів навколо точки p1
        let p2 = {
            x: (Math.cos(Math.PI*5 / 3) * (p3.x-p1.x)) + (Math.sin(Math.PI *5/ 3) * (p3.y-p1.y)) + p1.x,
            y: (-1*Math.sin(Math.PI*5 / 3) * (p3.x-p1.x)) + (Math.cos(Math.PI *5/ 3) *(p3.y-p1.y)) + p1.y
        }
        //якщо це не кінцева ітерація - почерговий рекурсивний виклик функції для кожного новоутвореного відрізка
        if (limit > 0) {
            koch(a, p1, limit - 1)
            koch(p1, p2, limit - 1)
            koch(p2, p3, limit - 1)
            koch(p3, b, limit - 1)
        } else {
             //почергова промальовка кожного з відрізків утвореної фігури
            context.beginPath()
            context.moveTo(a.x, a.y)
            context.lineTo(p1.x, p1.y)
            context.lineTo(p2.x, p2.y)
            context.lineTo(p3.x, p3.y)
            context.lineTo(b.x, b.y)
            context.stroke()
        }
    }
    //виклик функції для кожної зі сторін трикутника
    koch(startingPoints.p1, startingPoints.p2)
    koch(startingPoints.p2, startingPoints.p3)
    koch(startingPoints.p3, startingPoints.p1)
}

export function drawIce(context, iteration_count){
    //задаємо точки базового квадрата
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
    //функція ітерації побудови франкалу
    //a,b - точки відрізка
    //limit - кількість ітерацій що повинні відбутись
    const ice = (a, b, limit = 0) => {
        //початкова точка побудови відрізка, що розміщується посередині базового відрізка
        let p1 = {
            x: (a.x + b.x)/2,
            y: (a.y + b.y)/2
        }
        //кінцева точка побудови відрізка, що перпендикулярний до базового і довжиною 1/3 базового
        let p2 = {
            x: ((Math.cos(Math.PI/ 2) * (b.x-a.x)/3) + (Math.sin(Math.PI/ 2) * (b.y-a.y)/3) + p1.x),
            y: ((-1*Math.sin(Math.PI /2) * (b.x-a.x)/3) + (Math.cos(Math.PI/ 2) *(b.y-a.y)/3) + p1.y)
        }
        //якщо це не кінцева ітерація - почерговий рекурсивний виклик функції для кожного новоутвореного відрізка
        if (limit > 0) {
            ice(a, p1, limit - 1)
            ice(p1, p2, limit - 1)
            ice(p2, p1, limit - 1)
            ice(p1, b, limit - 1)
        } else {
            //почергова промальовка кожного з відрізків утвореної фігури
            context.beginPath()
            context.moveTo(a.x, a.y)
            context.lineTo(p1.x, p1.y)
            context.lineTo(p2.x, p2.y)
            context.lineTo(p1.x, p1.y)
            context.lineTo(b.x, b.y)
            context.stroke()
        }
    }
    //виклик функції для кожної зі сторін квадрата
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

export function rgbToXyz(pixel){
        let Rs = ( pixel[0] / 255.0 )
        let Gs = ( pixel[1] / 255.0 )
        let Bs = ( pixel[2] / 255.0 )

        if ( Rs > 0.04045 ) Rs =  Math.pow(( ( Rs + 0.055 ) / 1.055 ), 2.4)
        else                   Rs = Rs / 12.92
        if ( Gs > 0.04045 ) Gs = Math.pow(( ( Gs + 0.055 ) / 1.055 ), 2.4)
        else                   Gs = Gs / 12.92
        if ( Bs > 0.04045 ) Bs = Math.pow(( ( Bs + 0.055 ) / 1.055 ), 2.4)
        else                   Bs = Bs / 12.92

        Rs = Rs * 100
        Gs = Gs * 100
        Bs = Bs * 100

        let X = Rs * 0.4124 + Gs * 0.3576 + Bs * 0.1805
        let Y = Rs * 0.2126 + Gs * 0.7152 + Bs * 0.0722
        let Z = Rs * 0.0193 + Gs * 0.1192 + Bs * 0.9505
        return [X, Y, Z];
}

export function xyzToRgb(pixel){
        var X = pixel[0] / 100.0
        var Y = pixel[1] / 100.0
        var Z = pixel[2] / 100.0

        var R = X *  3.2406 + Y * -1.5372 + Z * -0.4986
        var G = X * -0.9689 + Y *  1.8758 + Z *  0.0415
        var B = X *  0.0557 + Y * -0.2040 + Z *  1.0570

        if ( R > 0.0031308 ) R = 1.055 * ( Math.pow(R, ( 1 / 2.4 ) )) - 0.055
        else                     R = 12.92 * R
        if ( G > 0.0031308 ) G = 1.055 * ( Math.pow(G, ( 1 / 2.4 ) )) - 0.055
        else                     G = 12.92 * G
        if ( B > 0.0031308 ) B = 1.055 * ( Math.pow(B, ( 1 / 2.4 ) )) - 0.055
        else                     B = 12.92 * B

        let sR = parseInt(R * 255,10);
        let sG = parseInt(G * 255,10);
        let sB = parseInt(B * 255,10);
        return [sR, sG, sB];
}

export function rotate(trapeze, point, clockwise, totlScale){
    let clockwiseKoef = 1;
    if(!clockwise){
        clockwiseKoef = -1;
    }
    let m=point.x;
    let n=point.y;
    let angl = Math.PI/48;
    let operationsN = Math.PI*2/angl;
    let scale = Math.pow(totlScale, 1.0/operationsN);
    let trapezeMtrx = [
        [trapeze.a.x, trapeze.a.y, 1],
        [trapeze.b.x, trapeze.b.y, 1],
        [trapeze.c.x, trapeze.c.y, 1],
        [trapeze.d.x, trapeze.d.y, 1]
    ];
    let transformMtrx = 
    [
        [scale*Math.cos(angl),                                       scale*clockwiseKoef*Math.sin(angl),                           0],
        [-1*clockwiseKoef*scale*Math.sin(angl),                      scale*Math.cos(angl),                                         0],
        [scale*(n*clockwiseKoef*Math.sin(angl)-m*Math.cos(angl))+m,  scale*(-1*m*clockwiseKoef*Math.sin(angl)-n*Math.cos(angl))+n, 1]
    ]
    let newTrapeze = multiplyMatrices(trapezeMtrx,transformMtrx);
    //покрокове множення матриць
    //-----------------------------------------------------------
    // let moveToZeroMtrx = 
    // [
    //     [1,     0,   0],
    //     [0,     1,   0],
    //     [-1*m, -1*n, 1]
    // ]
    // let moveBackMtrx = 
    // [
    //     [1, 0, 0],
    //     [0, 1, 0],
    //     [m, n, 1]
    // ]
    // let rotationMtrx = 
    // [
    //     [Math.cos(angl),                  clockwiseKoef*Math.sin(angl), 0],
    //     [-1*clockwiseKoef*Math.sin(angl), Math.cos(angl),               0],
    //     [0,                               0,                            1]
    // ];
   
    // let scaleMtrx = 
    // [
    //     [scale, 0,     0],
    //     [0,     scale, 0],
    //     [0,     0,     1]
    // ]
    // let newTrapeze = multiplyMatrices(trapezeMtrx,moveToZeroMtrx);
    // newTrapeze = multiplyMatrices(newTrapeze,rotationMtrx);
    // newTrapeze = multiplyMatrices(newTrapeze,scaleMtrx);
    // newTrapeze = multiplyMatrices(newTrapeze,moveBackMtrx);
    //-----------------------------------------------------------

    trapeze.a.x = newTrapeze[0][0];
    trapeze.a.y = newTrapeze[0][1];
    trapeze.b.x = newTrapeze[1][0];
    trapeze.b.y = newTrapeze[1][1];
    trapeze.c.x = newTrapeze[2][0];
    trapeze.c.y = newTrapeze[2][1];
    trapeze.d.x = newTrapeze[3][0];
    trapeze.d.y = newTrapeze[3][1];
}
function multiplyMatrices (a, b){
    if (!Array.isArray(a) || !Array.isArray(b) || !a.length || !b.length) {
       throw new Error('arguments should be in 2-dimensional array format');
    }
    let x = a.length,
    z = a[0].length,
    y = b[0].length;
    if (b.length !== z) {
       // XxZ & ZxY => XxY
       throw new Error('number of columns in the first matrix should be the same as the number of rows in the second');
    }
    let productRow = Array.apply(null, new Array(y)).map(Number.prototype.valueOf, 0);
    let product = new Array(x);
    for (let p = 0; p < x; p++) {
       product[p] = productRow.slice();
    }
    for (let i = 0; i < x; i++) {
       for (let j = 0; j < y; j++) {
          for (let k = 0; k < z; k++) {
             product[i][j] += a[i][k] * b[k][j];
          }
       }
    }
    return product;
 }
 export function updateOutputTrapeze(canvas, trapeze, outputTrapeze, unitSegmentCoefficient){
    let w = canvas.width;
    let h = canvas.height
    unitSegmentCoefficient = parseInt(unitSegmentCoefficient, 10);

    outputTrapeze.a.x = Math.round((trapeze.a.x - w/2)/unitSegmentCoefficient);
    outputTrapeze.a.y =  Math.round((h/2 - trapeze.a.y)/unitSegmentCoefficient);

    outputTrapeze.b.x =  Math.round((trapeze.b.x - w/2)/unitSegmentCoefficient);
    outputTrapeze.b.y =  Math.round((h/2 - trapeze.b.y)/unitSegmentCoefficient);

    outputTrapeze.c.x =  Math.round((trapeze.c.x - w/2)/unitSegmentCoefficient);
    outputTrapeze.c.y =  Math.round((h/2 - trapeze.c.y)/unitSegmentCoefficient);

    outputTrapeze.d.x =  Math.round((trapeze.d.x - w/2)/unitSegmentCoefficient);
    outputTrapeze.d.y =  Math.round((h/2 - trapeze.d.y)/unitSegmentCoefficient);
}

export function setUnitSegment(a, b, c, d, unitSegmentCoefficient){
    let trapezeMtrx = [
        [a.x, a.y, 1],
        [b.x, b.y, 1],
        [c.x, c.y, 1],
        [d.x, d.y, 1]
    ];
    let scaleMtrx = [
        [unitSegmentCoefficient, 0, 0],
        [0, unitSegmentCoefficient, 0],
        [0, 0, 1]
    ]
    trapezeMtrx=multiplyMatrices(trapezeMtrx, scaleMtrx);
    a.x=trapezeMtrx[0][0];
    a.y=trapezeMtrx[0][1];
    b.x=trapezeMtrx[1][0];
    b.y=trapezeMtrx[1][1];
    c.x=trapezeMtrx[2][0];
    c.y=trapezeMtrx[2][1];
    d.x=trapezeMtrx[3][0];
    d.y=trapezeMtrx[3][1];
}

export function isFigureTrapeze(a, b, c, d){
    let coefAB, coefCD, coefBC, coefDA;
    let nodes = [a, b, c, d];
    let sign = false;
    let n = nodes.length;

    for(let i = 0; i < n; i++)
    {
        let dx1 = nodes.at((i + 2) % n).x - nodes.at((i + 1) % n).x;
        let dy1 = nodes.at((i + 2) % n).y - nodes.at((i + 1) % n).y;
        let dx2 = nodes.at(i).x - nodes.at((i + 1) % n).x;
        let dy2 = nodes.at(i).y - nodes.at((i + 1) % n).y;
        let productOfVectors = dx1 * dy2 - dy1 * dx2;

        if (i === 0){
            sign = productOfVectors > 0;
        }
        else if (sign !== (productOfVectors > 0)){
            return false;
        }
    }

    coefAB = (b.y - a.y) / (b.x - a.x);
    coefCD = (d.y - c.y) / (d.x - c.x);
    coefBC = (c.y - b.y) / (c.x - b.x);
    coefDA = (a.y - d.y) / (a.x - d.x);

    if((coefAB < coefCD + 0.07 && coefAB > coefCD - 0.07) && (coefBC !== coefDA)) return true;
    if((coefBC < coefDA + 0.07 && coefBC > coefDA - 0.07) && (coefAB !== coefCD)) return true;

    return false;
}

export function drawTrapeze(context, a, b, c, d){
    context.beginPath()
    context.moveTo(a.x, a.y)
    context.lineTo(b.x, b.y)
    context.lineTo(c.x, c.y)
    context.lineTo(d.x, d.y)
    context.lineTo(a.x, a.y)
    context.stroke()
}

export function drawCoordinatePlane(context, w, h, unitSegmentCoefficient){
    context.beginPath()
    context.moveTo(0, h/2)
    context.lineTo(w, h/2)
    context.lineTo(w - 8, h/2 + 3)
    context.moveTo(w, h/2)
    context.lineTo(w - 8, h/2 - 3)
    context.moveTo(w/2, 0)
    context.lineTo(w/2 - 3, 8)
    context.moveTo(w/2, 0)
    context.lineTo(w/2 + 3, 8)
    context.moveTo(w/2, 0)
    context.lineTo(w/2, h)

    context.moveTo(w/2 + 10, 10)
    context.lineTo(w/2 + 12, 15)
    context.moveTo(w/2 + 14, 10)
    context.lineTo(w/2 + 12, 15)
    context.lineTo(w/2 + 12, 20)

    context.moveTo(w - 10, h/2 - 10);
    context.lineTo(w - 15, h/2 - 20)
    context.moveTo(w - 15, h/2 - 10);
    context.lineTo(w - 10, h/2 - 20)

    context.moveTo(w/2 + 5, h/2 - 5);
    context.lineTo(w/2 + 10, h/2 - 5);
    context.lineTo(w/2 + 10, h/2 - 15);
    context.lineTo(w/2 + 5, h/2 - 15);
    context.lineTo(w/2 + 5, h/2 - 5);

    let currentWidth = w/2;
    while(currentWidth > 0){
        context.moveTo(currentWidth, h/2 + 4)
        context.lineTo(currentWidth, h/2 - 4);

        currentWidth -= (10 * unitSegmentCoefficient);
    }
    currentWidth = w/2;
    while(currentWidth < w){
        context.moveTo(currentWidth, h/2 + 4)
        context.lineTo(currentWidth, h/2 - 4);

        currentWidth += (10 * unitSegmentCoefficient);
    }

    let currentHeight = h/2;
    while(currentHeight > 0){
        context.moveTo(w/2 - 4, currentHeight)
        context.lineTo(w/2 + 4, currentHeight);

        currentHeight -= (10 * unitSegmentCoefficient);
    }
    currentHeight = h/2;
    while(currentHeight < h){
        context.moveTo(w/2 - 4, currentHeight)
        context.lineTo(w/2 + 4, currentHeight);

        currentHeight += (10 * unitSegmentCoefficient);
    }

    context.stroke()
}