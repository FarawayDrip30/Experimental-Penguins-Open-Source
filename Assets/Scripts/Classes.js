class Penguin extends Sprite{
    constructor(x,y,name){
        super(penguinSS,0,0,48,48,x,y,50,50,-20,-25);

        this.changeFrame(idleAnims[4],0);

        this.name = name;
        this.speech = "";
        this.speechTimeout = null;

        this.speed = 3;

        this.velX = 0;
        this.velY = 0;

        this.destination = {x:x,y:y};
        this.above = false;
        this.leftTo = false;

        this.frame = 0;
        this.direction = 4;
        this.moving = false;

        this.circleOX = -27;
        this.circleOY = -15;

        this.animationInterval = null;
    }

    drawMore(){
        ctx.fillStyle = "black";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.fillText(this.name,this.x,this.y + 35)

        if(this.speech != ""){
            ctx.fillStyle = "blue";
            ctx.font = "14px Arial";
            ctx.fillText(this.speech,this.x,this.y - 35)
        }
    }

    speak(message){
        clearTimeout(this.speechTimeout);
        this.speech = message;
        this.speechTimeout = setTimeout(this.unspeak.bind(this),5000);
    }
    unspeak(){
        this.speech = "";
    }

    changeFrame(animation,frame){
        //Crop X and Y
        if(animation[frame].sx != null){
            this.sx = animation[frame].sx * 50;
        }
        if(animation[frame].sy != null){
            this.sy = animation[frame].sy * 50;
        }

        //Position X and Y
        if(animation[frame].x != null){
            this.originX = animation[frame].x;
        }
        if(animation[frame].y != null){
            this.originY = animation[frame].y;
        }
    }

    move(mousePos){
        this.destination = mousePos;

        this.above = this.y < mousePos.y;
        this.leftTo = this.x < mousePos.x;

		let dx = mousePos.x - this.x;
        let dy = mousePos.y - this.y;
        let angle = Math.atan2(dy, dx)

        this.velX = this.speed * Math.cos(angle);
        this.velY = this.speed * Math.sin(angle);
        if(this.velX == NaN || this.angle == NaN){
            console.log(this.speed);
            console.log(angle);
        }

        this.lookAtDest(angle);

        this.frame = 0;
        this.animationInterval = setInterval(() => {
            if(currentState.player.moving){
                currentState.player.changeFrame(walkAnims[currentState.player.direction],currentState.player.frame);

                currentState.player.frame += 1;
                if(currentState.player.frame >= walkAnims[currentState.player.direction].length){
                    currentState.player.frame = 0;
                }
            }
        },60)

        this.moving = true;
	}

    lookAtDest(angle){
        if(angle < -1.125 && angle > -1.875){ //North
            this.direction = 0;
        }
        else if(angle < -0.375 && angle > -1.125){ //North-East
            this.direction = 1;
        }
        else if(angle < 0.375 && angle > -0.375){ //East
            this.direction = 2;
        }
        else if(angle < 1.125 && angle > 0.375){ //South-East
            this.direction = 3;
        }
        else if(angle < 1.875 && angle > 1.125){ //South
            this.direction = 4;
        }
        else if(angle < 2.625 && angle > 1.875){ //South-West
            this.direction = 5;
        }
        else if(angle > 2.625 && angle > -1.875){ //West
            this.direction = 6;
        }
        else if(angle < -1.875 && angle > -2.625){ //North-West
            this.direction = 7;
        }
        
        this.changeFrame(idleAnims[this.direction],0);

        /*
        north = -1.875 / -1.125
        northeast = -1.125 / -0.375
        east = -0.375 / 0.375
        southeast = 0.375 / 1.125
        south = 1.125 / 1.875
        southwest = 1.875 / 2.625
        west = 2.625 / -2.625
        northwest = -2.625 / -1.875
        */
    }

    main(){
        if(this.moving){
            if(this.y + this.velY * timeScale < this.destination.y != this.above || 
            this.x + this.velX * timeScale < this.destination.x != this.leftTo){
                this.changeFrame(idleAnims[this.direction],0);

                this.velX = 0;
                this.velY = 0;
                this.x = this.destination.x;
                this.y = this.destination.y;
                this.moving = false;
                this.frame = 0;

                clearInterval(this.animationInterval)
                this.animationInterval = null

                currentState.currentRoom.checkTriggers(this);
            }
        }

        this.x += this.velX * timeScale;
        this.y += this.velY * timeScale;
        if(this.x == NaN){
            console.log(timeScale)
        }
    }
}

class Room extends Sprite{
    constructor(img,objects,bgobjects,width,height,swidth,sheight,name,enterFunctions,exitFunctions,triggers){
        super(img,0,0,swidth,sheight,0,0,width,height,0,0);

        this.objects = objects;
        this.bgobjects = bgobjects;

        this.name = name;

        this.enterFunctions = enterFunctions;
        this.exitFunctions = exitFunctions;

        this.triggers = triggers;
    }

    enter(){
        if(this.enterFunctions){
            this.enterFunctions.forEach(func => {
                func();
            });
        }
    }

    exit(){
        if(this.exitFunctions){
            this.exitFunctions.forEach(func => {
                func();
            });
        }
    }

    checkTriggers(obj){
        if(this.triggers){
            this.triggers.forEach(trigger => {
                trigger.isInTrigger(obj);
            })
        }
    }

    drawObjects(){
        for(let i = 0; i < this.objects.length; i++){
            this.objects[i].draw();
        }
    }

    drawBGObjects(){
        for(let i = 0; i < this.bgobjects.length; i++){
            this.bgobjects[i].draw();
        }
    }
}

class Trigger{
    constructor(x,y,width,height,func,param){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.func = func;
        this.param = param;
    }

    isInTrigger(obj){
        if(isInRect(obj.x,obj.y,this.x,this.y,this.width,this.height)){
            this.func(this.param);
        }
    }
}

class RoomButton extends Sprite{
    constructor(room,y){
        super(notSelectedImg,0,0,39,39,600,y,10,10,0,0);
        this.room = room;
    }

    isClicked(mousePos){
        if(isInRect(mousePos.x,mousePos.y,this.x,this.y,this.width,this.height)){
            return this.room;
        }
        return false;
    }

    drawText(){
        ctx.fillStyle = "black";
        ctx.font = "10px Arial";
        ctx.textAlign = "left";
        ctx.fillText(this.room.name, 620, this.y + 10);
    }
}

class MenuButton {
    constructor(x,y,width,height,text){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        ctx.textAlign = "center";

        this.normalColour = "#FEBB00";
        this.hoverColour = "#FFEF80";
        this.colour = this.normalColour;

        this.textX = this.x + this.width / 2;
        this.textY = this.y + this.height / 2 + 4;
    }

    draw(){
        ctx.beginPath();
        ctx.fillStyle = this.colour;
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = "#000000";
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();

        ctx.font = "bold 15px Arial";
        ctx.fillText(this.text,this.textX,this.textY);
    }

    isInside(mouseX,mouseY){
        if(isInRect(mouseX,mouseY,this.x,this.y,this.width,this.height)){
            return true;
        }
    }
    
    mouseMoved(mouseX,mouseY){
        if(this.isInside(mouseX,mouseY)){
            this.colour = this.hoverColour;
        }
        else{
            this.colour = this.normalColour;
        }
    }
}