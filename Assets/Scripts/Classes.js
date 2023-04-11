class Shape{
    constructor(x,y,width,height,colour,originX,originY){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.colour = colour;
        this.originX = originX;
        this.originY = originY;
    }

    draw(){
        ctx.beginPath();
        ctx.fillStyle = this.colour;
        ctx.rect(this.x + this.originX, this.y + this.originY, this.width, this.height);
        ctx.fill();
    }
}

class Sprite{
    constructor(img, sx, sy, swidth, sheight, x, y, width, height, originX, originY){
        this.img = img;
        this.sx = sx;
        this.sy = sy;
        this.swidth = swidth;
        this.sheight = sheight;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.originX = originX;
        this.originY = originY;
    }

    draw(){
        ctx.drawImage(this.img,this.sx,this.sy,this.swidth,this.sheight,this.x + this.originX,this.y + this.originY,this.width,this.height)
    }
}


class Penguin extends Sprite{
    constructor(x,y,name){
        super(penguinSS,0,0,48,48,x,y,50,50,-20,-25);

        this.changeSprite(idleAnims[4],0);

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
    }

    changeSprite(animation,index){
        this.sx = animation[1][index] * 50;
        this.sy = animation[0][index] * 50;
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

        this.lookAtDest(angle);

        this.moving = true;
	}

    lookAtDest(angle){
        if(angle < -1.125 && angle > -1.875){ //North
            this.changeSprite(idleAnims[0],0);
            this.direction = 0;
        }
        else if(angle < -0.375 && angle > -1.125){ //North-East
            this.changeSprite(idleAnims[1],0);
            this.direction = 1;
        }
        else if(angle < 0.375 && angle > -0.375){ //East
            this.changeSprite(idleAnims[2],0);
            this.direction = 2;
        }
        else if(angle < 1.125 && angle > 0.375){ //South-East
            this.changeSprite(idleAnims[3],0);
            this.direction = 3;
        }
        else if(angle < 1.875 && angle > 1.125){ //South
            this.changeSprite(idleAnims[4],0);
            this.direction = 4;
        }
        else if(angle < 2.625 && angle > 1.875){ //South-West
            this.changeSprite(idleAnims[5],0);
            this.direction = 5;
        }
        else if(angle > 2.625 && angle > -1.875){ //West
            this.changeSprite(idleAnims[6],0);
            this.direction = 6;
        }
        else if(angle < -1.875 && angle > -2.625){ //North-West
            this.changeSprite(idleAnims[7],0);
            this.direction = 7;
        }
        
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
                this.changeSprite(idleAnims[this.direction],0);

                this.velX = 0;
                this.velY = 0;
                this.x = this.destination.x;
                this.y = this.destination.y;
                this.moving = false;
                this.frame = 0;
            }
        }

        this.x += this.velX * timeScale;
        this.y += this.velY * timeScale;
    }
}

class Room extends Sprite{
    constructor(img,objects,bgobjects,width,height,swidth,sheight,name,animation){
        super(img,0,0,swidth,sheight,0,0,width,height,0,0);

        this.objects = objects;
        this.bgobjects = bgobjects;

        this.name = name;

        this.animation = animation;
        this.animationInterval = null;
    }

    enter(){
        if(this.animation != null){
            this.animationInterval = setInterval(this.animation,100)
        }
    }

    exit(){
        clearInterval(this.animationInterval);
        this.animationInterval = null;
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
        ctx.font = "10px Arial";
        ctx.fillText(this.room.name, 620, this.y + 10);
    }
}