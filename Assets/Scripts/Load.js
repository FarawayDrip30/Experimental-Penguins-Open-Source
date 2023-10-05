let antiCache = "?"+(new Date()).getTime();

var animations = null
$.getJSON('Assets/JSONs/animations.json', function(data) {
    animations = data;
},);

var scriptsToAdd = ["Utils","BaseClasses","Classes","States","EpicoEngine"];

let nextScriptToAddToDocIndex = 0
function addNextScriptToDoc(){
    let tempscript = document.createElement("script");
    tempscript.src = "Assets/Scripts/"+scriptsToAdd[nextScriptToAddToDocIndex] + ".js" + antiCache;
    
    let tempAddedScript = document.head.appendChild(tempscript);
    tempAddedScript.onload = function(){advanceNextScriptToAddToDocIndex()}
}

function advanceNextScriptToAddToDocIndex(){
    nextScriptToAddToDocIndex += 1;
    if(nextScriptToAddToDocIndex < scriptsToAdd.length){
        addNextScriptToDoc();
    }
}

addNextScriptToDoc();