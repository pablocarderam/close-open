/**
* js/html5 game/essay on the role of art in age of Web 2.0/semantic
* Crafted by Pablo Cardenas Ramirez, pablocarderam@gmail.com
* MIT licence
* Bogota, 2015
*/

// Necessary for engine: set stage dimensions
dim(500,500);

// Declare images here
var standSkin = newSkin("assets/Sprite/stand.png");
var walk1Skin = newSkin("assets/Sprite/walk1.png");
var walk2Skin = newSkin("assets/Sprite/walk2.png");
var walkR1Skin = newSkin("assets/Sprite/walkR1.png");
var walkR2Skin = newSkin("assets/Sprite/walkR2.png");
var walkU1Skin = newSkin("assets/Sprite/walkU1.png");
var walkU2Skin = newSkin("assets/Sprite/walkU2.png");
var walkD1Skin = newSkin("assets/Sprite/walkD1.png");
var walkD2Skin = newSkin("assets/Sprite/walkD2.png");

// Declare sprites
var avatar;

// Texts
var txtNum = 0;
var endTxts = [];
var introTxts = ["¡Hola!", "¿Qué más?", "¡A jugar!"];
var outroTxts = ["¡Hola otra vez!", "¿Qué más?", "¡Se acabó!"];

var exitTxt;
var exitCount = 0;

var part = 1; // 1 for intro, 2 for game, 3 for outro

//***EVENT HANDLERS***\\
function keyDownHandler(evt) {
    switch (evt.keyCode) {
        case 37: // left
            evt.preventDefault();
            avatar.action(1);
            moveWorld(step,0);
            break;
        case 38: // up key
            evt.preventDefault();
            avatar.action(3);
            moveWorld(0,step);
            break;
        case 39: // right key
            evt.preventDefault();
            avatar.action(2);
            moveWorld(-1*step,0);
            break;
        case 40: // down key
            evt.preventDefault();
            avatar.action(4);
            moveWorld(0,-1*step);
            break;
        case 32: // space
            evt.preventDefault();
            avatar.jump();
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


function mouseDownHandler(evt) {

}


/**
 * Starts gameplay. Create world, then call main loop.
 */
function gameplay(argument) {
    //window.addEventListener("keydown", keyDownHandler, false);
    //window.addEventListener("keyup", keyUpHandler, false);
    part = 2;
    exitTxt = new TextObj(["exit();"],center.x-25, center.y+200, 100);


    playing = true;
    //mainLoop(); // Call main loop
}


function checkIfDone() {
    if (part == 2 && getDistance(exitTxt.x,exitTxt.y,avatar.x,avatar.y) < 50) {
        exitCount ++;
        if (exitCount > frameRate*3) {
            playing = false;
            outro();
        }
    }
    else {
        exitCount = 0;
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
}



function intro(e) {
    stage.removeEventListener("mousedown", intro, false);
    ctx.font = "20px courneuf"; // Will need to load this font from css sheet
    clear();
    // Create sprites: Sprite("name", [[action1Skin1, action1Skin2, ...], [action2Skin1, action2Skin2, ...], ... ], Xcoor, Ycoor, Width)
    avatar = new Sprite("avatar", [ [standSkin], [walk1Skin, walk2Skin], [walkR1Skin, walkR2Skin], [walkU1Skin, walkU2Skin], [walkD1Skin, walkD2Skin]  ], center.x, center.y, 100);
    // draw(avatar.actions[0][0],center.x,stage.height,stage.width);
    // Create intro text
    var introTxtObj = new TextObj(introTxts, center.x, 50, 450);
    introTxtObj.draw();

    function nextTxt(e) {
        introTxtObj.nextTxt();
        if (introTxtObj.txtNum == 0) { // if done with all txts,
            introTxtObj.hide();
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


function outro(e) {
    ctx.font = "20px courneuf"; // Will need to load this font from css sheet
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
