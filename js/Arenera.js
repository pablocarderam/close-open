//**  arenera game engine   ***\\

/**
* js/html5 game engine
* Crafted by Pablo Cardenas Ramirez, pablocarderam@gmail.com
* MIT licence
* Bogota, 2015
*/



//*** START GLOBAL VARS***\\

var page = document.getElementById("page"); // get div element covering whole page, for mouse and touch events
var stage = document.getElementById("stage"); // get canvas element
var ctx = stage.getContext("2d"); // and canvas element

var gLoop; // for game loop
var frameRate = 25; // Game loop frame rate
var center = {}; // stores center stage coordinates
var playing = true; // boolean stores whether in main loop gameplay or not

var spriteList = []; // stores all sprites


//***GENERAL METHODS***\\

/**
 * Sets stage dimensions
 */
function dim(w,h) {
    stage.width = w;
    stage.height = h;
    center.x = stage.width/2;
	center.y = stage.height/2;
}

function mainLoop() {
    clear();
    drawSprites();
    if (playing) {
        gLoop = setTimeout(mainLoop, 1000/frameRate); // loop the main loop
    }
}

//***CONSTRUCTORS***\\

/**
 * Sprite class constructor.
 * Takes a string as a name, an array of actions
 * (arrays of skins to be iterated; first array
 * is default action; if only 1 array with only 1 skin,
 * this sprite is "static"), x and y coordinates, default width.
 */
function Sprite(pName, pActions, pX, pY, pWidth) {
    this.name = pName;
    this.actions = pActions;
    this.currentAction = pActions[0];
    this.currentSkinIndex = 0;
    this.x = pX;
    this.y = pY;
    this.width = pWidth;
    this.alpha = 1; // opacity
    this.shown = true; // shown by default
    this.static = false;
    if (pActions.length == 1 && pActions[0].length == 1) { // if only 1 skin,
        this.static = true; // this sprite is static (can't change skins. can change opacity, size).
    }

    spriteList.push(this); // adds this sprite to sprite list

    // Functions:
    this.action = function(actionNumber) { // This starts sequence of skins corresponding to the given number
        this.currentAction = pActions[actionNumber];
    }
    this.nextSkin = function() { // Displays next skin in current action sequence. If at end of sequence, start over
        this.currentSkinIndex ++;
        if (this.currentSkinIndex == this.currentAction.length) {
            this.currentSkinIndex = 0;
        }
    }

    this.goTo = function(newX, newY) { // Sets this sprite's coordinates to the ones given
        this.x = newX;
        this.y = newY;
    }

    this.show = function() { // adds this sprite to display list
        this.shown = true;
    }
    this.hide = function() { // removes this sprite from display list
        this.shown = false;
    }

}


//***RENDERING***\\

/**
 * Clears stage.
 */
function clear() {
    ctx.clearRect(0, 0, stage.width, stage.height);
}


/**
 * draws image with center at coordinates given, morphing image to fit width given.
 */
function draw(img, x, y, width) {
    height = img.height*width/img.width;
    ctx.drawImage(img, 0,0,img.width,img.height, x-width/2,y-height/2,width,height);
}


/**
 * Draws all sprites on display list
 */
 function drawSprites(argument) {
     for (i=0; i<spriteList.length; i++) {
         sprite = spriteList[i];
         if (sprite.shown) {
             draw(sprite.currentAction[sprite.currentSkinIndex], sprite.x, sprite.y, sprite.width);
             sprite.nextSkin();
         }
     }
 }


/*******PRELOADER*******/

// Stores all assets
var assets = [];

/**
 * Constructs image object to be preloaded
 * usage: var skin = new Asset("pathToFile");
 */
function newSkin(path) {
    skin = new Image();
    skin.filePath = path;
    assets.push(skin);
    return skin;
}

/**
 * Preloads assets, prints fraction to canvas.
 * This is the ENTRY POINT to start the engine.
 */
function preload(msg) {
    var numLoaded = 0;
    var total = assets.length;
    var tracker = numLoaded + " / " + total;

    ctx.font = "20px courneuf"; // Will need to load this font from css sheet
    ctx.fillStyle = "#dddddd";
    ctx.fillText(msg, 130, 235); // show preloader
    ctx.fillText(tracker, 230, 265);

    function onload() { // this is the function called every time an asset is loaded
        numLoaded ++;
        tracker = numLoaded + " / " + total;
        clear();
        ctx.fillText(msg, 130, 235); // show preloader
        ctx.fillText(tracker, 230, 265);
        if (numLoaded == total) {
            clear();
            init();
        }
    }

    for (var i = 0; i < total; i++) {
        assets[i].onload = onload;
        assets[i].src = assets[i].filePath;
    }
}
