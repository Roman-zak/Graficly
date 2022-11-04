import { LightningElement, track } from 'lwc';
import {drawTrapeze, drawCoordinatePlane, isFigureTrapeze, rotate, updateOutputTrapeze} from './../functions/functions.js';

export default class Fractals extends LightningElement {
    @track temp = 0;
    @track isShowInfo = false;
    @track isBuilt = false;
    @track isValidTrapeze = true;
    @track isRunning = false;
    @track myInterval;
    @track trapeze = {
         a : {
            x: 0,
            y: 0
        },
         b : {
            x: 0,
            y: 0
        },
         c : {
            x: 0,
            y: 0
        },
         d : {
            x: 0,
            y: 0
        }
    }; 
    @track outputTrapeze = {
        a : {
           x: 0,
           y: 0
       },
        b : {
           x: 50,
           y: 50
       },
        c : {
           x: 150,
           y: 50
       },
        d : {
           x: 200,
           y: 0
       }
   }; 
    get getTrapeze(){
        return this.trapeze;
        // let canvas = this.template.querySelector('canvas');
        // let w = canvas.width;
        // let h = canvas.height
        // return realTrapezeToCoordinates(this.trapeze,h,w);
    }
    get getOutputTrapeze(){
        return this.outputTrapeze;
    }

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
        context.strokeStyle = 'rgb(0, 0, 0)';
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

        if(!isFigureTrapeze(a,b,c,d)){
            this.isValidTrapeze = false;
            return;
        }

        let canvas = this.template.querySelector('canvas');
        let w = canvas.width;
        let h = canvas.height

        let context = canvas.getContext('2d');
        context.fillStyle = `rgb(251, 218, 222)`;
        context.fillRect(0,0,w,h);
        context.strokeStyle = 'rgb(0, 0, 0)';
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
        context.strokeStyle = 'rgb(107, 45, 92)';
        drawTrapeze(context, a, b, c, d);
        this.trapeze.a=a;
        this.trapeze.b=b;
        this.trapeze.c=c;
        this.trapeze.d=d;

        this.isBuilt = true;
        this.isValidTrapeze = true;
    }

    handleShowInformation(){
        if(this.isBuilt) return;
        this.isShowInfo = !this.isShowInfo;
        if(this.isShowInfo === false) setTimeout(() => { this.callDrawPlane()}, 0);
    }

    handleDownloadImg(){
        let link = document.createElement('a');
        link.download = 'trapeze.png';
        link.href = this.template.querySelector('canvas').toDataURL()
        link.click();
    }

    handleRotate(){
        if(!this.isRunning){
            this.isRunning = true;
        } else {
            this.isRunning = false;
            clearInterval(this.myInterval);
        }
        if(this.isRunning){

        
            let canvas = this.template.querySelector('canvas');
            let w = canvas.width;
            let h = canvas.height
            let context = canvas.getContext('2d');
            let clockwise = this.template.querySelector('[data-id="clockwiseCheck"]').checked;
            let scale =  this.template.querySelector('[data-id="scale"]').value;
            let apexName = this.template.querySelector('[data-id="apex"]').value;
            let apex;
            switch (apexName) {
                case 'A':
                    apex = this.trapeze.a;
                    break;
                case 'B':
                    apex = this.trapeze.b;
                    break;
                case 'C':
                    apex = this.trapeze.c;
                    break;
                case 'D':
                    apex = this.trapeze.d;
                    break;
                default:
                    apex = this.trapeze.a;
                    break;
            }
            let rotateIterations =0;
            let currentScale = scale;
        //while( this.isRunning)
        this.myInterval = setInterval(()=>{
            console.log(Math.floor(rotateIterations/96)%2);
            console.log(currentScale);
            if(Math.floor(rotateIterations/96)%2===1){
                currentScale = 1/scale;
            } else{
                currentScale = scale;
            }
            rotate(this.trapeze,apex, clockwise, currentScale);
            updateOutputTrapeze(canvas, this.trapeze, this.outputTrapeze);
            context.fillStyle = `rgb(251, 218, 222)`;
            context.fillRect(0,0,w,h);
            context.strokeStyle = 'rgb(0, 0, 0)';
            drawCoordinatePlane(context, w, h);
            context.strokeStyle = 'rgb(107, 45, 92)';
            drawTrapeze(context, this.trapeze.a, this.trapeze.b, this.trapeze.c, this.trapeze.d);
            rotateIterations++;
        },50);
    }
    

    }

}