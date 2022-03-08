var canvas = document.getElementById("EpicoCanvas");
var ctx = canvas.getContext("2d");

canvas.addEventListener("click", onClick);
canvas.addEventListener("mousemove", onMouseMove);

var currentState = new MenuState();

var penguinSS = new Image();
penguinSS.src = "Assets/Sprites/Penguin/spritesheet.png";

var circleImg = new Image();
circleImg.src = "Assets/Sprites/circle.png";

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