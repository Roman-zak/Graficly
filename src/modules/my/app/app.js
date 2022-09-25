import { LightningElement, track } from 'lwc';

export default class App extends LightningElement {
    @track isOpenRightBar = false
    @track isShowInfo = false
    @track isActiveRotations = false
    @track isActiveColors = false
    @track isActiveFractals = false
    @track isActiveHome = true
    @track information = ''

    index = 0;
    listOfInformation = [
        'Some information about fractals example 1', 
        'Some information about fractals example 2', 
        'Some information about fractals example 3', 
    ];
    
    get mainGrid(){ return this.isOpenRightBar ? 'openwrapper modulebar' : 'closewrapper modulebar'}
    get homeStyle(){ return this.isActiveHome ? 'activemodulebutton' : 'modulebutton'}
    get colorsStyle(){ return this.isActiveColors ? 'activemodulebutton' : 'modulebutton'}
    get fractalsStyle(){ return this.isActiveFractals ? 'activemodulebutton' : 'modulebutton'}
    get rotationsStyle(){ return this.isActiveRotations ? 'activemodulebutton' : 'modulebutton'}

    handleActiveModule(event){
        this.isActiveRotations = false;
        this.isActiveColors = false;
        this.isActiveFractals = false;
        this.isActiveHome = false;

        if(event.target.name == 'home') this.isActiveHome = true;
        if(event.target.name == 'colors') this.isActiveColors = true;
        if(event.target.name == 'fractals') this.isActiveFractals = true;
        if(event.target.name == 'rotations') this.isActiveRotations = true;
    }

    handleOpenRightBar(){
        this.isOpenRightBar = true;
    }

    handleCloseRightBar(){
        this.isOpenRightBar = false;
    }

    handleShowInformation(){
        this.isShowInfo = !this.isShowInfo;
        if(this.index == this.listOfInformation.length) this.index = 0;
        this.information = this.listOfInformation[this.index];
        this.index++;
    }
}
