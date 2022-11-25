import { LightningElement, track } from 'lwc';
import {fromRGBtoHSL, fromHSLtoRGB, xyzToRgb, rgbToXyz} from './../functions/functions.js';

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
        if(!this.isFileLoaded){
            let modal = this.template.querySelector("my-modal");
            modal.setVariant('error');
            modal.setText('You can`t change brightness without image');
            modal.handleOpenModal();
            return;
        }

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
        var fileTypes = ['jpg', 'jpeg', 'png', 'jfif', 'pjpeg', 'pjp'];  //acceptable file types
        let reader = new FileReader();
        var extension = event.target.files[0].name.split('.').pop().toLowerCase(),  //file extension from input file
        isSuccess = fileTypes.indexOf(extension) > -1;  //is extension in acceptable types
        if(!isSuccess){
            let modal = this.template.querySelector("my-modal");
            modal.setVariant('error');
            modal.setText("This file is not an image (Choose theese extensions: .jpg, .jpeg, .png, .jfif, .pjpeg, .pjp )");
           
            modal.handleOpenModal();
            return;
            // alert('file isn`t an image'); \n\n(Choose theese extensions: .jpg, .jpeg, .png, .jfif, .pjpeg, .pjp )
            // return;
        }
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
            this.template.querySelector('[data-id="display-image"]').src = reader.result;
            this.template.querySelector('[data-id="display-image2"]').src = reader.result;
            console.log(this.template.querySelector('[data-id="display-image"]'));
            this.firstChange = true;
            this.isFileLoaded = true;
            this.initialBrightness = [];

            let i =0;
            this.template.querySelector('[data-id="display-image"]').onload = () => {
                if(i===0){
                    let w = this.template.querySelector('[data-id="display-image"]').width;
                    let h = this.template.querySelector('[data-id="display-image"]').height;
                    let canvas = document.createElement('canvas');
                    let context = canvas.getContext('2d');
                    canvas.height = h;
                    canvas.width = w;
                    context.drawImage(this.template.querySelector('[data-id="display-image"]'), 0, 0);
                    let originalPixels = context.getImageData(0, 0, w, h);
                    let currentPixels = context.getImageData(0, 0, w, h);
                    let tempPixel;
                    for(let I = 0, L = originalPixels.data.length; I < L; I += 4)
                    {
                    //    if((I%(w*4))<(w*2)){
                        tempPixel =  rgbToXyz([originalPixels.data[I],originalPixels.data[I+1],originalPixels.data[I+2]]);
                        currentPixels.data[I] = tempPixel[0];
                        currentPixels.data[I + 1] = tempPixel[1];
                        currentPixels.data[I + 2] = tempPixel[2];
                    //}
                    }
                    for(let I = 0, L = currentPixels.data.length; I < L; I += 4)
                    {
                     //   if((I%(w*4))<(w*2)){
                        tempPixel =  xyzToRgb([currentPixels.data[I],currentPixels.data[I+1],currentPixels.data[I+2]]);
                        currentPixels.data[I] = tempPixel[0];
                        currentPixels.data[I + 1] = tempPixel[1];
                        currentPixels.data[I + 2] = tempPixel[2];
                    //    }
                    }

                    context.putImageData(currentPixels, 0, 0);
                    // img.src = canvas.toDataURL();
                    this.template.querySelector('[data-id="display-image"]').src = canvas.toDataURL();
                    context.putImageData(originalPixels, 0, 0);
                    // img.src = canvas.toDataURL();
                    this.template.querySelector('[data-id="display-image2"]').src = canvas.toDataURL();
                }
                i++;
            }
        };
    }

    handleDownloadImg(event){
        if(!this.isFileLoaded){
            let modal = this.template.querySelector("my-modal");
            modal.setVariant('error');
            modal.setText('You need upload file for downloading');
            modal.handleOpenModal()
            return;
        }
        
        let link = document.createElement('a');
        link.download = 'colorModified.png';
        link.href = this.template.querySelector('[data-id="display-image"]').src;
        link.click();
    }

    handleMouseHover(event){
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
        let pixel = context.getImageData(x,y,1,1).data;
        let inputR = this.template.querySelector('[data-id="inputR"]');
        inputR.value=pixel[0];
        let inputG = this.template.querySelector('[data-id="inputG"]');
        inputG.value=pixel[1];
        let inputB = this.template.querySelector('[data-id="inputB"]');
        inputB.value=pixel[2];
        let xyzPixel = rgbToXyz(pixel);
        let inputX = this.template.querySelector('[data-id="inputX"]');
        inputX.value=xyzPixel[0].toFixed(3);
        let inputY = this.template.querySelector('[data-id="inputY"]');
        inputY.value=xyzPixel[1].toFixed(3);
        let inputZ = this.template.querySelector('[data-id="inputZ"]');
        inputZ.value=xyzPixel[2].toFixed(3);
    }
    
    getCursorPosition(canvas, event) {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        console.log("x: " + x + " y: " + y)
    }
}