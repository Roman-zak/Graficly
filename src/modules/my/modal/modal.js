import { LightningElement, api, track } from 'lwc';

export default class Fractals extends LightningElement {
    @track variant;
    @track text = '';

    @api
    handleCloseModal(){
        let modal = this.template.querySelector("[data-id='modal']");
        modal.style.display = 'none';
    }

    @api
    handleOpenModal(){
        let modal = this.template.querySelector("[data-id='modal']");
        console.log('open');
        modal.style.display = 'block';
    }

    @api
    setVariant(variant){
        this.variant = variant;
    }

    @api
    setText(text){
        this.text = text;
    }

    get classModalContent(){
        let modalClass = 'modal-content ';

        if(this.variant === 'error') return modalClass + 'error-modal';
        if(this.variant === 'success') return modalClass +'success-modal';
        return modalClass +'question-modal';
    }
}