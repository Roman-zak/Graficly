import { LightningElement, track } from 'lwc';

export default class Colors extends LightningElement {
    @track isShowInfo = false;
    @track prevBrightnessValue = 0;

    handleShowInformation(){
        this.isShowInfo = !this.isShowInfo;
    }

    handleUploadImg(){
        this.template.querySelector('[data-id="image-input"]').click();
    }

    handleChangeBrightness(event){
        console.log(event.target.value);

        let img = this.template.querySelector('[data-id="display-image"]');
        let w = img.naturalWidth;
        let h = img.naturalHeight;
        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');

        canvas.height = h;
        canvas.width = w;
        context.drawImage(img, 0, 0);

        let originalPixels = context.getImageData(0, 0, w, h);
        let currentPixels = context.getImageData(0, 0, w, h);

        for(let I = 0, L = originalPixels.data.length; I < L; I += 4)
        {
            currentPixels.data[I] = originalPixels.data[I] + 5;
            currentPixels.data[I + 1] = originalPixels.data[I + 1] + 5;
            currentPixels.data[I + 2] = originalPixels.data[I + 2] + 5
        }

        context.putImageData(currentPixels, 0, 0);
        img.src = canvas.toDataURL();
    }

    handleLoadImg(event){
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);

        reader.onload = () => {
            this.template.querySelector('[data-id="display-image"]').src = reader.result;
            this.template.querySelector('[data-id="display-image2"]').src = reader.result;
        };
    }
}