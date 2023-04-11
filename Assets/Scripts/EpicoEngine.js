var canvas = document.getElementById("EpicoCanvas");
var ctx = canvas.getContext("2d");

canvas.addEventListener("click", onClick);
canvas.addEventListener("mousemove", onMouseMove);

var exHUD = document.getElementById("exHUD")
var chatbox = document.getElementById("chatbox")

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
[{sx: 0, sy: 0, x: -20, y: -25}],
//var animations_northEast_idle = 
[{sx: 1, sy: 0, x: -17, y: -25}],
//var animations_east_idle = 
[{sx: 2, sy: 0, x: -15, y: -25}],
//var animations_southEast_idle = 
[{sx: 3, sy: 0, x: -17, y: -25}],
//var animations_south_idle = 
[{sx: 4, sy: 0, x: -20, y: -25}],
//var animations_southWest_idle = 
[{sx: 10, sy: 4, x: -24, y: -25}],
//var animations_west_idle = 
[{sx: 11, sy: 4, x: -27, y: -25}],
//var animations_northWest_idle = 
[{sx: 12, sy: 4, x: -24, y: -25}]
];

var walkAnims = [
//var animations_north_walk = 
[{sx: 5, sy: 0},{sx: 6},{sx: 7},{sx: 8},{sx: 9},{sx: 10},{sx: 11},{sx: 12}],
//var animations_northEast_walk = 
[{sx: 0, sy: 1},{sx: 1},{sx: 2},{sx: 3},{sx: 4},{sx: 5},{sx: 6},{sx: 7}],
//var animations_east_walk = 
[{sx: 9, sy: 1},{sx: 10},{sx: 11},{sx: 12},{sx: 13},{sx: 0, sy: 2},{sx: 1},{sx: 2}],
//var animations_southEast_walk = 
[{sx: 4, sy: 2},{sx: 5},{sx: 6},{sx: 7},{sx: 8},{sx: 9},{sx: 10},{sx: 11}],
//var animations_south_walk = 
[{sx: 13, sy: 2},{sx: 0, sy: 3},{sx: 1},{sx: 2},{sx: 3},{sx: 4},{sx: 5}],
//var animations_southWest_walk = 
[{sx: 9, sy: 6},{sx: 8},{sx: 7},{sx: 6},{sx: 5},{sx: 4},{sx: 3},{sx: 2}],
//var animations_west_walk = 
[{sx: 4, sy: 5},{sx: 3},{sx: 2},{sx: 1},{sx: 0},{sx: 13, sy: 6},{sx: 12},{sx: 11}],
//var animations_northWest_walk = 
[{sx: 13, sy: 5},{sx: 12},{sx: 11},{sx: 10},{sx: 9},{sx: 8},{sx: 7},{sx: 6}],
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
function onSend(){
    currentState.onSend(chatbox.value);
    chatbox.value = ""
}

main()
render()