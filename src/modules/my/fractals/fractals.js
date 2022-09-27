import { LightningElement, track } from 'lwc';
import {drawMinkowski, drawKoch, drawLevy, drawIce} from './../functions/functions.js';

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
          
            if(this.isIce) drawIce(ctx, 5);
            if(this.isKoch) drawKoch(ctx, 5);
            if(this.isLevy) drawLevy(13, ctx);
            if(this.isMinkowski) drawMinkowski(ctx, 5);
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
}