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
    renderMore(){

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
    onSend(message){

    }
    end(){

    }
}

class MenuState extends State{
    constructor(){
        super();
        this.playButton = new MenuButton(canvas.width/2-40,310,80,25,"Next");
        this.logo = new Sprite(createImage("logo/logo.png"),0,0,1935,1000,canvas.width/2-180,30,360,210,0,0);
        this.enterNameText = [new TextObject(canvas.width/2, 260, "bold 14px Arial","black","Please enter a name"),
                                new TextObject(canvas.width/2, 272, " bold 14px Arial","black","for your penguin?")];
    }

    render(){
        clearScreen();
        this.playButton.draw();
        this.logo.draw();
        this.enterNameText.forEach((txt) => {txt.draw();})
    }

    onClick(evt){
        let mousePos = getMousePos(canvas,evt);
        if(this.playButton.isInside(mousePos.x,mousePos.y)){
            exHUD.hidden = false;
            titleScreenHUD.hidden = true;
            changeState(new PlayState());
        }
    }
    onMouseMove(evt){
        let mousePos = getMousePos(canvas,evt);
        this.playButton.mouseMoved(mousePos.x,mousePos.y);
    }
}

class PlayState extends State{
    constructor(){
        super();

        this.rooms = [snowRoom,northPole,crashSite,iglooRoom,iglooInterior,iglooGarden];
        this.roomButtons = [];
        for(let i = 0; i < this.rooms.length; i++){
            this.roomButtons.push(new RoomButton(this.rooms[i],20+i*15))
        }
        this.roomButtons[0].img = selectedImg;

        this.currentRoom = snowRoom;
        
        this.playerSelected = false;
        let playerX = Math.random() * 620 + 50;
        let playerY = Math.random() * 190 + 150;
        this.player = new Penguin(playerX,playerY,nameEntry.value);
    }
    changeRoom(roomID){
        if(this.currentRoom != this.rooms[roomID]){
            currentState.roomButtons.forEach(button => {
                button.img = notSelectedImg;
            })
            this.roomButtons[roomID].img = selectedImg;

            this.currentRoom.exit();
            this.currentRoom = this.rooms[roomID];
            this.currentRoom.enter();
            this.player.x = this.player.destination.x;
            this.player.y = this.player.destination.y;
            return true;
        }
        return false;
    }
    main(){
        this.player.main();
    }
    render(){
        clearScreen();
        
        this.currentRoom.draw();

        this.currentRoom.drawBGObjects();
        if(this.playerSelected){
            ctx.drawImage(circleImg,0,0,49,34,this.player.x + this.player.circleOX,this.player.y + this.player.circleOY,54,37);
        }
        this.player.draw();

        this.currentRoom.drawObjects();

        this.roomButtons.forEach(button => {
            button.draw();
            button.drawText();
        });
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
            else{
                for(let i = 0; i < this.rooms.length; i++){
                    let isClicked = this.roomButtons[i].isClicked(mousePos);
                    if(isClicked){
                        if(currentState.changeRoom(i)){
                            return;
                        }
                    }
                }
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
            let angle = Math.atan2(dy, dx);
            this.player.lookAtDest(angle);
        }

        this.roomButtons.forEach(button => {
            if(button.isClicked(mousePos) != false){
                document.getElementById("EpicoCanvas").style.cursor = "pointer";
            }
        });
    
    }

    onSend(message){
        this.player.speak(message);
        addToChatlog(this.player.name + " says: " + message);
    }
}

class WorldEditState extends PlayState{
    constructor(){
        super();

        this.debugSquare = new Shape(0,0,0,0,"red",0,0)
    }

    renderMore(){
        this.debugSquare.draw()
    }

    onMouseDown(evt){
        let mousePos = getMousePos(canvas,evt);
        this.debugSquare.x = mousePos.x;
        this.debugSquare.y = mousePos.y;

        console.log("x: " + this.debugSquare.x + ", y: " + this.debugSquare.y + ", width: " + this.debugSquare.width + ", height: " + this.debugSquare.height)
    }

    onMouseMove(evt){
        let mousePos = getMousePos(canvas,evt);
        this.debugSquare.width = mousePos.x;
        this.debugSquare.height = mousePos.y;
    }
}