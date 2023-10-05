var canvas = document.getElementById("EpicoCanvas");
var ctx = canvas.getContext("2d");

canvas.addEventListener("click", onClick);
canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mousedown", onMouseDown);

var musicPlayer = document.getElementById("musicPlayer");

var exHUD = document.getElementById("exHUD");
var chatentry = document.getElementById("chatentry");
chatentry.addEventListener('keyup', function onEvent(e) {
    if (e.keyCode === 13) {
        onSend();
    }
});

var chatlog = document.getElementById("chatlog");

var titleScreenHUD = document.getElementById("titleScreenHUD");
var nameEntry = document.getElementById("nameEntry");

function addToChatlog(text){
    if(chatlog.lastElementChild){chatlog.lastElementChild.classList.add("oldChatText");}
    
    chatlog.innerHTML += "<p>" + text + "</p>";
    chatlog.scrollTo({top: chatlog.scrollHeight, behavior: 'smooth'});;
}
addToChatlog("Welcome to Experimental Penguins Open Source");
addToChatlog("Select your character with your mouse to move.");

const screenCentre = {x: canvas.width/2, y: canvas.height/2}

var currentState = new MenuState();

var penguinSS = createImage("Characters/Penguin/spritesheet.png");

var circleImg = createImage("circle.png");

var selectedImg = createImage("Selected.png");
var notSelectedImg = createImage("SelectedNot.png");

var idleAnims = animations.penguin.idle;

var walkAnims = animations.penguin.walk;

var snowRoomImg = createImage("snowRoom.png")
var snowRoom = new Room(snowRoomImg,[],[],720,420,1,1,"Snow Room");

let northPoleSprite = new Sprite(createImage("north pole.png"),0,0,61,149,420,150,20,50,0,0);
var northPole = new Room(createImage("snowRoom.png"),[],[northPoleSprite],720,420,1,1,"North Pole");

var crashSiteWave = 0
function startWaveAnimation(){
    currentState.currentRoom.animationInterval = setInterval(animateCrashSite,100);
}
function endWaveAnimation(){
    clearInterval(currentState.currentRoom.animationInterval);
}
function animateCrashSite(){
    currentState.currentRoom.bgobjects[0].y = 300+(Math.sin(crashSiteWave)*5)
    crashSiteWave += 0.1
    if(crashSiteWave == 1){crashSiteWave = 0}
}

function startMusic(){
    musicPlayer.play()
}
function stopMusic(){
    musicPlayer.pause();
    musicPlayer.currentTime = 0;
}

function changeRoomAndPositionAndDirection(param){
    currentState.changeRoom(param.room);
    currentState.player.x = param.x;
    currentState.player.y = param.y;
    currentState.player.destination.x = param.x;
    currentState.player.destination.y = param.y;
    currentState.player.direction = param.dir;
    currentState.player.changeFrame(idleAnims[param.dir],0);
}
function changeRoom(room){
    currentState.changeRoom(room)
}

var crashSiteOverlay = new Sprite(createImage("crashSiteOverlay.png"),0,0,1799,1201,-2,-5,629,422,0,0);
var crashSiteWater = new Sprite(createImage("crashSiteWater.png"),0,0,529,354,0,296,185,124,0,0);
var crashSite = new Room(createImage("crashSite.png"),[crashSiteOverlay],[crashSiteWater],629,422,1799,1201,"Crash Site",[startWaveAnimation],[endWaveAnimation]);

//x: 96, y: 107, width: 96, height: 107
var outsideTrigger = new Trigger(96,107,96,107,changeRoomAndPositionAndDirection,{room:3,x:475,y:130,dir:5})
var iglooBackground = new Sprite(createImage("pchat2/iglooBackground.png"),0,0,4471,3671,0,0,720,420,0,0);
var iglooInterior = new Room(snowRoomImg,[],[iglooBackground],720,420,1,1,"Igloo Interior",[startMusic],[stopMusic],[outsideTrigger]);
// Entrance - x: 164, y: 218

var igloo = new Sprite(createImage("pchat2/igloo.png"),0,0,163,152,475,50,80,75,0,0);
var signpost = new Sprite(createImage("pchat2/signpost.png"),0,0,120,119,600,200,70,70,0,0);
var iglooTrigger = new Trigger(475,50,80,75,changeRoomAndPositionAndDirection,{room:4,x:164,y:218,dir:3})
var toGardenTrigger = new Trigger(700,0,20,420,changeRoomAndPositionAndDirection,{room:5,x:20,y:100,dir:2})
var iglooRoom = new Room(snowRoomImg,[],[igloo,signpost],720,420,1,1,"Igloo Room",[],[],[iglooTrigger,toGardenTrigger]);

var signpost2 = new Sprite(createImage("pchat2/signpost2.png"),0,0,120,119,20,300,70,70,0,0);
var iglooGarden = new Room(snowRoomImg,[],[signpost2],720,420,1,1,"Igloo Garden");

function main(){
    getFPS();
    currentState.main();
    requestAnimationFrame(main);
}
function render(){
    currentState.render();
    currentState.renderMore();
    requestAnimationFrame(render);
}
function onClick(evt){
    currentState.onClick(evt);
}
function onMouseMove(evt){
    currentState.onMouseMove(evt);
}
function onMouseDown(evt){
    currentState.onMouseDown(evt);
}
function onSend(){
    currentState.onSend(chatentry.value);
    chatentry.value = "";
}

main()
render()