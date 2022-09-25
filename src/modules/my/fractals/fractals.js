import { LightningElement, track } from 'lwc';

export default class Fractals extends LightningElement {
    @track isKoch = false;
    @track isLevy = true;
    @track isGlacial = false;
    @track isMinkowski = false;

    handleSelect(event){
        this.isKoch = false;
        this.isLevy = false;
        this.isGlacial = false;
        this.isMinkowski = false;

        if(event.target.value == 'levy') this.isLevy = true;
        if(event.target.value == 'glacial') this.isGlacial = true;
        if(event.target.value == 'koch') this.isKoch = true;
        if(event.target.value == 'minkowski') this.isMinkowski = true;

        console.log('handleSelect', event.target.value);
    }
}