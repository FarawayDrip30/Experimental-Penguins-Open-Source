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
        this.drawMore()
    }

    drawMore(){

    }
}

class TextObject{
    constructor(x,y,font,colour,text){
        ctx.textAlign = "center";
        this.x = x;
        this.y = y;
        this.font = font;
        this.colour = colour;
        this.text = text;
    }

    draw(){
        ctx.fillStyle = this.colour;
        ctx.font = this.font;
        ctx.fillText(this.text,this.x,this.y)
    }
}