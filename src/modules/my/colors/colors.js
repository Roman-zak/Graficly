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
        };
    }
}