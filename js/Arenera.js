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
var mouse = {}; // stores center stage coordinates
var playing = false; // boolean stores whether in main loop gameplay or not

var spriteList = []; // stores all sprites
var txtList = []; // stores all txts
var world = []; // stores all elements in world
var step = 5; // size of step DEV set to 5
var worldColor = [221,221,221]; // stores world color in rgb

var glitching = false;
var glitchLoop;


//***GENERAL METHODS***\\


function mouseMoveHandler(evt) {
    var rect = stage.getBoundingClientRect();
	mouse.x = evt.clientX - rect.left;
    mouse.y = evt.clientY - rect.top;
}


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
    drawTxts();
    if (pickGender) {
        showOrthodoxOppressiveGenders();
    }
    paintWorld(worldColor[0],worldColor[1],worldColor[2]);
    if (pickColor) {
        showColors();
    }

    checkIfDone();

    if (playing) {
        gLoop = setTimeout(mainLoop, 1000/frameRate); // loop the main loop
    }
}



function wrapText(text, x, y, maxWidth, lineHeight) { // http://www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/
	var paragraphs = text.split('/n');
	for (var p = 0; p < paragraphs.length; p++) {
		var words = paragraphs[p].split(' ');
		var line = '';
		for(var n = 0; n < words.length; n++) {
			var testLine = line + words[n] + ' ';
			var metrics = ctx.measureText(testLine);
			var testWidth = metrics.width;
			if(testWidth > maxWidth && line.length > 0) {
				ctx.fillText(line, x, y);
				line = words[n] + ' ';
				y += lineHeight;
			}
			else {
				line = testLine;
			}
		}
		ctx.fillText(line, x, y);
		y += lineHeight;
	}
}


function getDistance(x1, y1, x2, y2) { // find distance between two points
	var dist = Math.round(Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)));
	return dist;
}

function randInt(upperBound) {
    return Math.floor(upperBound*Math.random());
}


function shuffle(array) { // Fisher-Yates (Knuth) algorithm. http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    var currentIndex = array.length, temporaryValue, randomIndex ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


function glitchEngine() {
    if (glitching) {
        worldColor = [randInt(255),randInt(255),randInt(255)];

        avatar.jGlitch = randInt(2);
        if (avatar.jGlitch == 0) {
            avatar.jGlitch = -1;
        }

        shuffle(walkHandlers);

        noise.play();

        glitchLoop = setTimeout(glitchEngine, 1000*randInt(60));
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
    this.count = 0; // used for cycling through frames
    this.skinFR = 8; // Defines framerate of skin cycling
    this.x = pX;
    this.y = pY;
    this.jumpCount = 0;
    this.prevY = pY;
    this.jLoop;
    this.jGlitch = 1;
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
        if (this.actions[actionNumber] != this.currentAction) {
            this.currentAction = this.actions[actionNumber];
            this.count = 0;
            this.currentSkinIndex = 0;
        }
    }
    this.nextSkin = function() { // Displays next skin in current action sequence at a framerate specified in constructor. If at end of sequence, start over
        this.count ++;
        if (this.count > frameRate/this.skinFR) {
            this.count = 0;
            this.currentSkinIndex ++;
            if (this.currentSkinIndex == this.currentAction.length) {
                this.currentSkinIndex = 0;
            }
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

    this.jump = function() {
        if (this.jumpCount == 0) {
            this.prevY = this.y;
            this.jumpLoop();
        }
    }

    this.jumpLoop = function() {
        if (this.jumpCount < frameRate/1.5) {
            this.jumpCount ++;
            this.y = this.prevY - this.jGlitch*(Math.pow(frameRate/3,2) - Math.pow(this.jumpCount-frameRate/3,2));
            this.jLoop = setTimeout(function(thisObj) { thisObj.jumpLoop(); }, 1000/frameRate, this); // weird syntax makes settimeout work
        }
        else {
            this.y = this.prevY;
            this.jumpCount = 0;
        }
    }

}


/**
 * Text object class constructor.
 * Takes a string as content, an array of actions
 * (arrays of skins to be iterated; first array
 * is default action; if only 1 array with only 1 skin,
 * this sprite is "static"), x and y coordinates, default width.
 */
function TextObj(txts, pX, pY, maxWidth) {
    this.txtNum = 0;
    this.txts = txts;
    this.x = pX;
    this.y = pY;
    this.offX = 0;
    this.offY = 0;
    this.maxWidth = maxWidth;
    this.shown = true;
    this.size = 20;

    txtList.push(this);
    world.push(this);

    this.nextTxt = function() {
        this.txtNum ++;
        if (this.txtNum == this.txts.length) {
            this.txtNum = 0;
        }
    }
    this.draw = function() {
        var prevSize = ctx.font;
        ctx.font = this.size + "px courneuf";
        wrapText(this.txts[this.txtNum], this.x+this.offX, this.y+this.offY, this.maxWidth, this.size+5);
        ctx.font = prevSize;
    }

    this.show = function() { // adds this sprite to display list
        this.shown = true;
    }
    this.hide = function() { // removes this sprite from display list
        this.shown = false;
    }

}


//***WORLD METHODS***\\
function moveWorld(x,y) {
    for (var i = 0; i < world.length; i++) {
        world[i].x += x;
        world[i].y += y;
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
 function drawSprites() {
     for (i=spriteList.length; i>0; i--) {
         sprite = spriteList[i-1];
         if (sprite.shown) {
             draw(sprite.currentAction[sprite.currentSkinIndex], sprite.x, sprite.y, sprite.width);
             sprite.nextSkin();
         }
     }
 }


 function drawTxts() {
     for (i=0; i<txtList.length; i++) {
         txt = txtList[i];
         if (txt.shown) {
             txt.draw();
         }
     }
 }


function paintWorld(r,g,b) {
    document.getElementsByTagName("body")[0].style.color = rgbToHex(r,g,b);

    var imgData = ctx.getImageData(0,0,stage.width,stage.height);
    for (var i = 0; i < imgData.data.length; i+=4) {
        if (imgData.data[i] != 0) {
            imgData.data[i] = r;
            imgData.data[i+1] = g;
            imgData.data[i+2] = b;
        }
    }
    ctx.putImageData(imgData,0,0);
}


function componentToHex(c) { // http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
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

function newAudio(path) {
    audio = new Audio();
    audio.filePath = path;
    assets.push(audio);
    return audio;
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
        if (!playing) {
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
    }

    for (var i = 0; i < total; i++) {
        if (Image.prototype.isPrototypeOf(assets[i])) {
            assets[i].onload = onload;
            assets[i].src = assets[i].filePath;
        }
        else if (Audio.prototype.isPrototypeOf(assets[i])) {
            assets[i].oncanplaythrough = onload;
            assets[i].src = assets[i].filePath;
            assets[i].load();
        }
    }
}
