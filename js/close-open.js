/**
* js/html5 game/essay on the role of art in age of Web 2.0/semantic
* Crafted by Pablo Cardenas Ramirez, pablocarderam@gmail.com
* MIT licence
* Bogota, 2015
*/

// Necessary for engine: set stage dimensions
dim(500,500);

// Declare images here
var standMSkin = newSkin("assets/Sprite/stand.png");
var standWSkin = newSkin("assets/Sprite/standW.png");
var standSkin = newSkin("assets/Sprite/standU.png");
var walk1Skin = newSkin("assets/Sprite/walk1.png");
var walk2Skin = newSkin("assets/Sprite/walk2.png");
var walkR1Skin = newSkin("assets/Sprite/walkR1.png");
var walkR2Skin = newSkin("assets/Sprite/walkR2.png");
var walkU1Skin = newSkin("assets/Sprite/walkU1.png");
var walkU2Skin = newSkin("assets/Sprite/walkU2.png");
var walkD1Skin = newSkin("assets/Sprite/walkD1.png");
var walkD2Skin = newSkin("assets/Sprite/walkD2.png");

// Audio
var noise = newAudio("assets/whiteNoise.mp3");

// Declare sprites
var avatar;
var walkHandlers = ["left","right","up","down"];

// Texts
var txtNum = 0;
var endTxts = [];
var introTxts = ["¡Hola!", "Elige color", "", "Elige género opresivo", "", "¡A jugar!"];
var outroTxts = ["¡Hola otra vez!", "¿Qué más?", "¡Se acabó!"];

var exitTxt;
var exitCount = 0;
var pickColor = false;
var pickGender = false;

var part = 1; // 1 for intro, 2 for game, 3 for outro

//***EVENT HANDLERS***\\
function keyDownHandler(evt) {
    switch (evt.keyCode) {
        case 37: // left
            evt.preventDefault();
            walk(walkHandlers[0]);
            break;
        case 38: // up key
            evt.preventDefault();
            walk(walkHandlers[2]);
            break;
        case 39: // right key
            evt.preventDefault();
            walk(walkHandlers[1]);
            break;
        case 40: // down key
            evt.preventDefault();
            walk(walkHandlers[3]);
            break;
        case 32: // space
            evt.preventDefault();
            avatar.jump();
            break;
        default:
   }
}


function walk(direction) {
    switch (direction) {
        case "left": // left
            avatar.action(1);
            moveWorld(step,0);
            break;
        case "up": // up key
            avatar.action(3);
            moveWorld(0,step);
            break;
        case "right": // right key
            avatar.action(2);
            moveWorld(-1*step,0);
            break;
        case "down": // down key
            avatar.action(4);
            moveWorld(0,-1*step);
            break;
        default:
   }
}


function keyUpHandler(evt) {
    switch (evt.keyCode) {
        default:
            avatar.action(0);
   }
}


/**
 * Starts gameplay.
 */
function gameplay(argument) {
    //window.addEventListener("keydown", keyDownHandler, false);
    //window.addEventListener("keyup", keyUpHandler, false);

    part = 2;
    exitTxt = new TextObj(["exit();"],center.x-25, center.y+200, 100);

    glitching = true;
    glitchEngine();
    playing = true;
    //mainLoop(); // Call main loop
}


function checkIfDone() {
    if (part == 2 && getDistance(exitTxt.x,exitTxt.y,avatar.x,avatar.y) < 50) {
        exitCount ++;
        exitTxt.size ++;
        exitTxt.offX -=1;
        if (exitCount > frameRate*3) {
            playing = false;
            outro();
        }
    }
    else if (part == 2) {
        exitCount = 0;
        exitTxt.size = 20;
        exitTxt.offX = 0;
    }
}


/**
 * Starts game.
 */
function init() {
    ctx.font = "30px courneuf"; // Will need to load this font from css sheet
    ctx.fillStyle = "#dddddd";
    ctx.fillText("window.open() || window.close()", 40, 235); // show preloader
    ctx.font = "15px courneuf"; // Will need to load this font from css sheet
    ctx.fillStyle = "#dddddd";
    ctx.fillText("Un ensayo sobre el rol del arte en el mundo de la Web", 70, 260); // show preloader

    stage.addEventListener("mousedown", intro, false);
    stage.addEventListener("mousemove", mouseMoveHandler, false);
}



function intro(e) {
    stage.removeEventListener("mousedown", intro, false);
    ctx.font = "20px courneuf"; // Will need to load this font from css sheet
    clear();
    // Create sprites: Sprite("name", [[action1Skin1, action1Skin2, ...], [action2Skin1, action2Skin2, ...], ... ], Xcoor, Ycoor, Width)
    avatar = new Sprite("avatar", [ [standSkin], [walk1Skin, walk2Skin], [walkR1Skin, walkR2Skin], [walkU1Skin, walkU2Skin], [walkD1Skin, walkD2Skin], [standWSkin], [standMSkin]  ], center.x, center.y, 100);
    avatar.action(6);
    // draw(avatar.actions[0][0],center.x,stage.height,stage.width);
    // Create intro text
    var introTxtObj = new TextObj(introTxts, center.x, 50, 450);
    introTxtObj.draw();

    function nextTxt(e) {
        introTxtObj.nextTxt();
        if (introTxtObj.txtNum == 2) {
            pickColor = true;
        }
        if (introTxtObj.txtNum == 3) {
            var pixel = ctx.getImageData(mouse.x, mouse.y, 1,1).data;
            if (pixel[0] != 0 || pixel[1] != 0 || pixel[2] != 0) {
                pickColor = false;
                worldColor = [pixel[0],pixel[1],pixel[2]];
            }
            else {
                introTxtObj.txtNum -= 1;
            }
        }
        if (introTxtObj.txtNum == 4) {
            pickGender = true;
        }
        if (introTxtObj.txtNum == 5) {
            pickGender = false;
            if (mouse.x < center.x) {
                avatar.action(5);
            }
            if (mouse.x > center.x) {
                avatar.action(6);
            }
        }

        if (introTxtObj.txtNum == 0) { // if done with all txts,
            introTxtObj.hide();
            avatar.action(0);
            stage.removeEventListener("mousedown", nextTxt, false);
            gameplay();
        }
    }





    window.addEventListener("keydown", keyDownHandler, false);
    window.addEventListener("keyup", keyUpHandler, false);

    playing = true;
    mainLoop(); // Call main loop

    stage.addEventListener("mousedown", nextTxt, false);
}


function showColors() {
    var prevFill = ctx.fillStyle;
    ctx.fillStyle = "#FF00FF";
    ctx.fillRect(50,80,50,50);
    ctx.fillStyle = "#81DDFF";
    ctx.fillRect(140,80,50,50);
    ctx.fillStyle = "#009900";
    ctx.fillRect(230,80,50,50);
    ctx.fillStyle = "#FF9900";
    ctx.fillRect(320,80,50,50);
    ctx.fillStyle = "#0000CC";
    ctx.fillRect(410,80,50,50);
    ctx.fillStyle = prevFill;
}

function showOrthodoxOppressiveGenders() {
    draw(standWSkin, 150,125,100);
    draw(standMSkin, 350,125,100);
}


function outro(e) {
    ctx.font = "20px courneuf"; // Will need to load this font from css sheet
    glitching = false;
    clear();
    draw(avatar.actions[0][0],center.x,stage.height,stage.width);
    // Create intro text
    var outroTxtObj = new TextObj(outroTxts, center.x, 50, 450);
    outroTxtObj.draw();

    function nextTxt(e) {
        outroTxtObj.nextTxt();
        if (outroTxtObj.txtNum == 0) { // if done with all txts,
            outroTxtObj.hide();
            stage.removeEventListener("mousedown", nextTxt, false);
            out();
        }
        else {
            clear();
            draw(avatar.actions[0][0],center.x,stage.height,stage.width);
            outroTxtObj.draw();
        }
    }

    stage.addEventListener("mousedown", nextTxt, false);
}

function out() {
    window.open("http://en.wikipedia.org/wiki/Special:Random");
}


preload("...modernizando el arte..."); // MAIN
