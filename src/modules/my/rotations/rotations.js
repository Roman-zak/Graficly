import { LightningElement, track } from 'lwc';
import {drawTrapeze, drawCoordinatePlane} from './../functions/functions.js';

export default class Fractals extends LightningElement {
    @track temp = 0;
    @track isShowInfo = false;
    @track isBuilt = false;

    connectedCallback(){
        setTimeout(() => { this.callDrawPlane()}, 0);
    }

    callDrawPlane(){
        let canvas = this.template.querySelector('canvas');
        let w = canvas.width;
        let h = canvas.height
        let context = canvas.getContext('2d');

        context.fillStyle = `rgb(251, 218, 222)`;
        context.fillRect(0,0,w,h);
        context.strokeStyle = 'rgb(107, 45, 92)';
        context.lineWidth = 1;

        drawCoordinatePlane(context, w, h);
    }

    handleBuildTrapeze(){
        let a = {
            x: parseInt(this.template.querySelector('[data-id="aX"]').value, 10),
            y: parseInt(this.template.querySelector('[data-id="aY"]').value, 10)
        }
        let b = {
            x: parseInt(this.template.querySelector('[data-id="bX"]').value, 10),
            y: parseInt(this.template.querySelector('[data-id="bY"]').value, 10)
        }
        let c = {
            x: parseInt(this.template.querySelector('[data-id="cX"]').value, 10),
            y: parseInt(this.template.querySelector('[data-id="cY"]').value, 10)
        }
        let d = {
            x: parseInt(this.template.querySelector('[data-id="dX"]').value, 10),
            y: parseInt(this.template.querySelector('[data-id="dY"]').value, 10)
        }

        let canvas = this.template.querySelector('canvas');
        let w = canvas.width;
        let h = canvas.height

        let context = canvas.getContext('2d');
        context.fillStyle = `rgb(251, 218, 222)`;
        context.fillRect(0,0,w,h);
        context.strokeStyle = 'rgb(107, 45, 92)';
        context.lineWidth = 1;

        a.x += w/2;
        a.y = h/2 - a.y;
        b.x += w/2;
        b.y = h/2 - b.y;
        c.x += w/2;
        c.y = h/2 - c.y;
        d.x += w/2;
        d.y = h/2 - d.y;

        drawCoordinatePlane(context, w, h);
        drawTrapeze(context, a, b, c, d);

        this.isBuilt = true;
    }

    handleShowInformation(){
        if(this.isBuilt) return;
        this.isShowInfo = !this.isShowInfo;
    }

    handleDownloadImg(){
        let link = document.createElement('a');
        link.download = 'trapeze.png';
        link.href = this.template.querySelector('canvas').toDataURL()
        link.click();
    }
}