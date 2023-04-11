var canvas = document.getElementById("EpicoCanvas");
var ctx = canvas.getContext("2d");

canvas.addEventListener("click", onClick);
canvas.addEventListener("mousemove", onMouseMove);

const screenCentre = {x: canvas.width/2, y: canvas.height/2}

var currentState = new MenuState();

var penguinSS = new Image();
penguinSS.src = "Assets/Sprites/Penguin/spritesheet.png";

var circleImg = new Image();
circleImg.src = "Assets/Sprites/circle.png";

var selectedImg = createImage("Assets/Sprites/Selected.png");
var notSelectedImg = createImage("Assets/Sprites/SelectedNot.png");

var idleAnims = [
//var animations_north_idle = 
[[0],[0]],
//var animations_northEast_idle = 
[[0],[1]],
//var animations_east_idle = 
[[0],[2]],
//var animations_southEast_idle = 
[[0],[3]],
//var animations_south_idle = 
[[0],[4]],
//var animations_southWest_idle = 
[[4],[10]],
//var animations_west_idle = 
[[4],[11]],
//var animations_northWest_idle = 
[[4],[12]]
];

var walkAnims = [
//var animations_north_walk = 
[[0,0,0,0,0,0,0,0],[5,6,7,8,9,10,11,12]],
//var animations_northEast_walk = 
[[1,1,1,1,1,1,1,1],[0,1,2,3,4,5,6,7]],
//var animations_east_walk = 
[[1,1,1,1,1,2,2,2],[9,10,11,12,13,0,1,2]],
//var animations_southEast_walk = 
[[2,2,2,2,2,2,2,2],[4,5,6,7,8,9,10,11]],
//var animations_south_walk = 
[[2,3,3,3,3,3,3,3,3],[13,0,1,2,3,4,5]],
//var animations_southWest_walk = 
[[6,6,6,6,6,6,6,6],[9,8,7,6,5,4,3,2]],
//var animations_west_walk = 
[[5,5,5,5,5,6,6,6],[4,3,2,1,0,13,12,11]],
//var animations_northWest_walk = 
[[5,5,5,5,5,5,5,5],[13,12,11,10,9,8,7,6]]
];

var snowRoom = new Room(createImage("Assets/Sprites/snowRoom.png"),[],[],720,420,1,1,"Snow Room");

let northPoleSprite = new Sprite(createImage("Assets/Sprites/north pole.png"),0,0,61,149,420,150,20,50,0,0);
var northPole = new Room(createImage("Assets/Sprites/snowRoom.png"),[],[northPoleSprite],720,420,1,1,"North Pole");

var crashSiteWave = 0
function animateCrashSite(){
    currentState.currentRoom.bgobjects[0].y = 300+(Math.sin(crashSiteWave)*5)
    crashSiteWave += 0.1
    if(crashSiteWave == 1){crashSiteWave = 0}
}

var crashSiteOverlay = new Sprite(createImage("Assets/Sprites/crashSiteOverlay.png"),0,0,1799,1201,-2,-5,629,422,0,0);
var crashSiteWater = new Sprite(createImage("Assets/Sprites/crashSiteWater.png"),0,0,529,354,0,296,185,124,0,0);
var crashSite = new Room(createImage("Assets/Sprites/crashSite.png"),[crashSiteOverlay],[crashSiteWater],629,422,1799,1201,"Crash Site",animateCrashSite);

function main(){
    getFPS();
    currentState.main();
    requestAnimationFrame(main);
}
function render(){
    currentState.render();
    requestAnimationFrame(render);
}
function onClick(evt){
    currentState.onClick(evt);
}
function onMouseMove(evt){
    currentState.onMouseMove(evt);
}

main()
render()