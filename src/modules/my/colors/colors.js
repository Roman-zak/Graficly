import { LightningElement, track } from 'lwc';
import {fromRGBtoHSL, fromHSLtoRGB} from './../functions/functions.js';

export default class Colors extends LightningElement {
    @track isShowInfo = false;
    @track initialBrightness = [];
    @track currentBrightness = 100;
    @track firstChange = true;
    @track isLoading = false;
    @track isFileLoaded = false;

    get getCurrentBrightness(){
        return  this.currentBrightness;
    }

    setLoading(){
        return new Promise((res, rej) => {
            this.isLoading = true;
            setTimeout(() => {res(true);}, 300);
        });
    }

    handleShowInformation(){
        if(this.isFileLoaded) return;
        this.isShowInfo = !this.isShowInfo;
    }

    handleUploadImg(){
        this.template.querySelector('[data-id="image-input"]').click();
    }

    async handleChangeBrightness(event){
        let index = -1;
        let newPercent = event.target.value
        let img = this.template.querySelector('[data-id="display-image"]');
        let w = img.naturalWidth;
        let h = img.naturalHeight;
        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');

        this.currentBrightness = newPercent;
        await this.setLoading();

        canvas.height = h;
        canvas.width = w;
        context.drawImage(img, 0, 0);

        let originalPixels = context.getImageData(0, 0, w, h);
        let currentPixels = context.getImageData(0, 0, w, h);

        for(let I = 0, L = originalPixels.data.length; I < L; I += 4)
        {
            index++;

            let rgb = {
                r:  originalPixels.data[I],
                g: originalPixels.data[I + 1],
                b: originalPixels.data[I + 2]
            };

            let hsl = fromRGBtoHSL(rgb);

            if(this.firstChange) this.initialBrightness.push(hsl.l);

            hsl.l = this.initialBrightness.at(index) * (newPercent / 100);

            if(hsl.l > 1) hsl.l = 0.99;
            if(hsl.l < 0) hsl.l = 0.01;

            rgb = fromHSLtoRGB(hsl);

            currentPixels.data[I] = rgb.r;
            currentPixels.data[I + 1] = rgb.g;
            currentPixels.data[I + 2] = rgb.b;
        }

        this.isLoading = false;
        this.firstChange = false;

        context.putImageData(currentPixels, 0, 0);
        img.src = canvas.toDataURL();
    }

    handleLoadImg(event){
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);

        reader.onload = () => {
            this.template.querySelector('[data-id="display-image"]').src = reader.result;
            this.template.querySelector('[data-id="display-image2"]').src = reader.result;
            this.firstChange = true;
            this.isFileLoaded = true;
            this.initialBrightness = [];

            let i =0;
            this.template.querySelector('[data-id="display-image"]').onload = () => {
                if(i===0){
                    console.log("nw = "+this.template.querySelector('[data-id="display-image"]').naturalWidth);
                    let img = new Image(this.template.querySelector('[data-id="display-image"]').naturalWidth,this.template.querySelector('[data-id="display-image"]').naturalHeight);
                    img.src=reader.result;
                    console.log(" img.src = "+ img.src);
                    console.log("img" + img);
                    let w = img.width;
                    console.log("w" + w);
                    let h = img.height;
                    console.log("h" + h);
                    let canvas = document.createElement('canvas');
                    let context = canvas.getContext('2d');
                    canvas.height = h;
                    canvas.width = w;
                    context.drawImage(img, 0, 0);

                    let originalPixels = context.getImageData(0, 0, w, h);
                    let currentPixels = context.getImageData(0, 0, w, h);
                    let tempPixel;
                    for(let I = 0, L = originalPixels.data.length; I < L; I += 4)
                    {
                        tempPixel =  this.rgbToXyz([originalPixels.data[I],originalPixels.data[I+1],originalPixels.data[I+2]]);
                        currentPixels.data[I] = tempPixel[0];
                        currentPixels.data[I + 1] = tempPixel[1];
                        currentPixels.data[I + 2] = tempPixel[2];
                    }
                    for(let I = 0, L = currentPixels.data.length; I < L; I += 4)
                    {
                        tempPixel =  this.xyzToRgb([currentPixels.data[I],currentPixels.data[I+1],currentPixels.data[I+2]]);
                        currentPixels.data[I] = tempPixel[0];
                        currentPixels.data[I + 1] = tempPixel[1];
                        currentPixels.data[I + 2] = tempPixel[2];
                    }

                    context.putImageData(currentPixels, 0, 0);
                    img.src = canvas.toDataURL();
                    this.template.querySelector('[data-id="display-image"]').src =  img.src;
                }
                i++;
            }
        };
    }
    handleMouseHover(event){
    //    console.log(event.target.value);
        let img =  event.target;//this.template.querySelector('[data-id="display-image"]');
        let w = img.naturalWidth;
        let h = img.naturalHeight;
        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');

        canvas.height = h;
        canvas.width = w;
        context.drawImage(img, 0, 0);
        const rect = img.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        console.log("x: " + x + " y: " + y);
        let pixel = context.getImageData(x,y,1,1).data;
        console.log("r: " + pixel[0] + " g: " + pixel[1]+ " b: " + pixel[2]);
        let inputR = this.template.querySelector('[data-id="inputR"]');
        inputR.value=pixel[0];
        let inputG = this.template.querySelector('[data-id="inputG"]');
        inputG.value=pixel[1];
        let inputB = this.template.querySelector('[data-id="inputB"]');
        inputB.value=pixel[2];
        let xyzPixel = this.rgbToXyz(pixel);
        let inputX = this.template.querySelector('[data-id="inputX"]');
        inputX.value=xyzPixel[0];
        let inputY = this.template.querySelector('[data-id="inputY"]');
        inputY.value=xyzPixel[1];
        let inputZ = this.template.querySelector('[data-id="inputZ"]');
        inputZ.value=xyzPixel[2];
        console.log("x: " + xyzPixel[0] + " y: " + xyzPixel[1]+ " z: " + xyzPixel[2]);
        let rgbPixel = this.xyzToRgb(xyzPixel);
        console.log("r: " + rgbPixel[0] + " j: " + rgbPixel[1]+ " b: " + rgbPixel[2]);
    }
    getCursorPosition(canvas, event) {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        console.log("x: " + x + " y: " + y)
    }
    rgbToXyz(pixel){
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
    xyzToRgb(pixel){
        var var_X = pixel[0] / 100.0
        var var_Y = pixel[1] / 100.0
        var var_Z = pixel[2] / 100.0

        var var_R = var_X *  3.2406 + var_Y * -1.5372 + var_Z * -0.4986
        var var_G = var_X * -0.9689 + var_Y *  1.8758 + var_Z *  0.0415
        var var_B = var_X *  0.0557 + var_Y * -0.2040 + var_Z *  1.0570

        if ( var_R > 0.0031308 ) var_R = 1.055 * ( Math.pow(var_R, ( 1 / 2.4 ) )) - 0.055
        else                     var_R = 12.92 * var_R
        if ( var_G > 0.0031308 ) var_G = 1.055 * ( Math.pow(var_G, ( 1 / 2.4 ) )) - 0.055
        else                     var_G = 12.92 * var_G
        if ( var_B > 0.0031308 ) var_B = 1.055 * ( Math.pow(var_B, ( 1 / 2.4 ) )) - 0.055
        else                     var_B = 12.92 * var_B

        let sR = parseInt(var_R * 255,10);
        let sG = parseInt(var_G * 255,10);
        let sB = parseInt(var_B * 255,10);
        return [sR, sG, sB];
    }
    
    // const canvas = document.querySelector('canvas')
    // canvas.addEventListener('mousedown', function(e) {
    //     getCursorPosition(canvas, e)
    // })
}