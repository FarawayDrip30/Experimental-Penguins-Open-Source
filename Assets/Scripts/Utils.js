function clearScreen(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function createImage(src){
	let tempImage = new Image();
	tempImage.src = "Assets/Sprites/"+src;
	return tempImage;
}

async function customGetJSON(json){
	return await new Promise((resolve) => {
		$.getJSON(json, (data) =>{
			resolve(data);
		});
	})
}

function isInRect(x,y,rectX,rectY,rectWidth,rectHeight){
    if(x < rectX + rectWidth && x > rectX && y < rectY + rectHeight && y > rectY){
        return true;
    }
}

function getMousePos(cv, evt) {
	var rect = cv.getBoundingClientRect();
		return {
			x: evt.clientX - rect.left,
			y: evt.clientY - rect.top
}};


var lastCalledTime;
var delta;
var timeScale = 1;

function getFPS() {
	if (lastCalledTime) {
		delta = (Date.now() - lastCalledTime)/1000;
		let fps = 1/delta;
		if(fps > 10 && fps != null && fps != NaN && fps/90 != NaN){
			timeScale = fps/90;
		}
		else{
			timeScale = 1
			console.log("FPS Got Messed Up.")
		}
	}
	lastCalledTime = Date.now();
}