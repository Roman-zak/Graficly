import { LightningElement, track } from 'lwc';

export default class Colors extends LightningElement {
    @track isShowInfo = false;
    @track index = 0;
    @track prevBrightnessValue = 0;

    handleShowInformation(){
        this.isShowInfo = !this.isShowInfo;
    }

    handleUploadImg(){
        this.template.querySelector('[data-id="image-input"]').click();
    }

    handleChangeBrightness(event){
        let offset = event.target.value - this.prevBrightnessValue;
        
        console.log(offset);

        let canvas = this.template.querySelector('[data-id="display-canvas"]');
        let context = canvas.getContext('2d');
        let w = canvas.width;
        let h = canvas.height
        let originalPixels = context.getImageData(0, 0, w, h);
        let currentPixels = context.getImageData(0, 0, w, h);

        for(let I = 0, L = originalPixels.data.length; I < L; I += 4)
        {
            if(originalPixels.data[I] + offset <= 255 && originalPixels.data[I] + offset >= 0 &&
                originalPixels.data[I + 1] + offset <= 255 && originalPixels.data[I + 1] + offset >= 0 &&
                originalPixels.data[I + 2] + offset <= 255 && originalPixels.data[I + 2] + offset >= 0)
            {
                currentPixels.data[I] = originalPixels.data[I] + offset;
                currentPixels.data[I + 1] = originalPixels.data[I + 1] + offset;
                currentPixels.data[I + 2] = originalPixels.data[I + 2] + offset;
                //currentPixels.data[I + 3] = event.target.value;
            }
        }

        console.log(originalPixels.data[0]);

        context.putImageData(currentPixels, 0, 0);
    }

    handleLoadImg(event){
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[this.index++]);

        reader.onload = () => {
            this.template.querySelector('[data-id="display-image"]').src = reader.result;
            let canvas = this.template.querySelector('[data-id="display-canvas"]');
            let context = canvas.getContext('2d');
            let w = canvas.width;
            let h = canvas.height

            context.drawImage(this.template.querySelector('[data-id="display-image"]'), 0, 0, w, h);
        };
    }
}