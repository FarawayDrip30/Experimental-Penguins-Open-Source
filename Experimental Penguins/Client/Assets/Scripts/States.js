function changeState(state){
    currentState.end();
    currentState = state;
}

class State{
    constructor(){

    }

    main(){

    }
    render(){

    }
    onClick(evt){

    }
    onMouseMove(evt){
        
    }
    onMouseDown(evt){
        
    }
    onMouseUp(evt){
        
    }
    onMouseWheel(evt){
        
    }
    end(){

    }
}

class MenuState extends State{
    constructor(){
        super();
        this.playButton = new Shape(canvas.width/2-150,canvas.height/2-50,300,100,"black",0,0);
    }

    render(){
        clearScreen();
        this.playButton.draw();
    }

    onClick(evt){
        let mousePos = getMousePos(canvas,evt);
        if(isInRect(mousePos.x,mousePos.y,this.playButton.x,this.playButton.y,this.playButton.width,this.playButton.height)){
            changeState(new PlayState());
        }
    }
}

class PlayState extends State{
    constructor(){
        super();
        
        this.playerSelected = false;
        this.player = new Penguin(100,100,"Player");

        this.animationInterval = setInterval(() => {
            if(currentState.player.moving){
                currentState.player.changeSprite(walkAnims[currentState.player.direction],currentState.player.frame);

                currentState.player.frame += 1;
                if(currentState.player.frame >= walkAnims[currentState.player.direction][1].length){
                    currentState.player.frame = 0;
                }
            }
        },50)
    }
    main(){
        this.player.main();
    }
    render(){
        clearScreen();
        if(this.playerSelected){
            ctx.drawImage(circleImg,0,0,49,34,this.player.x + this.player.circleOX,this.player.y + this.player.circleOY,54,37);
        }
        this.player.draw();
    }
    onClick(evt){
        let mousePos = getMousePos(canvas, evt);
        if(isInRect(mousePos.x,mousePos.y,this.player.x+this.player.originX,this.player.y+this.player.originY,this.player.width,this.player.height) && !this.player.moving){
            this.playerSelected = !this.playerSelected;
        }
        else{
            if(this.playerSelected){
                this.player.move(mousePos);
                this.playerSelected = false;
                document.getElementById("EpicoCanvas").style.cursor = "default";
            }
        }
    }

    onMouseMove(evt){
        let mousePos = getMousePos(canvas, evt);
        if(isInRect(mousePos.x,mousePos.y,this.player.x+this.player.originX,this.player.y+this.player.originY,this.player.width,this.player.height)){
            document.getElementById("EpicoCanvas").style.cursor = "pointer";
        }
        else if(!this.playerSelected){
            document.getElementById("EpicoCanvas").style.cursor = "default";
        }
        
        if(this.playerSelected){
            let dx = mousePos.x - this.player.x;
            let dy = mousePos.y - this.player.y;
            let angle = Math.atan2(dy, dx)
            this.player.lookAtDest(angle);
        }
    }
}