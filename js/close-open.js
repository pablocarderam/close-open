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

var artIsSkin = newSkin("assets/art.png");

// Audio
var noise = newAudio("assets/whiteNoise.mp3");
var music = newAudio("assets/TimeFcuk.mp3");

// Declare sprites
var avatar;
var walkHandlers = ["left","right","up","down"];

// Texts
var txtNum = 0;
//var introTxts = ["¡Hola!", "Elige color", "", "Elige género opresivo", "", "¡A jugar!"];
//var outroTxts = ["¡Hola otra vez!", "¿Qué más?", "¡Se acabó!"];

var exitTxt;
var showExitCount = 0;
var exitCount = 0;
var pickColor = false;
var pickGender = false;

var windowClose;
var web20;
var web20What;
var webSem;
var webSemWhat;

var windowOpen;
var art;
var artIs;
var artWhat;
var media;
var mediaWhat;

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
            if (part == 1) {
                if (avatar.gender == 2) {
                    avatar.action(6);
                }
                else {
                    avatar.action(5);
                }
            }
            else {
                avatar.action(0);
            }
   }
}


/**
 * Starts gameplay.
 */
function gameplay(argument) {
    //window.addEventListener("keydown", keyDownHandler, false);
    //window.addEventListener("keyup", keyUpHandler, false);

    part = 2;

    exitTxt = new TextObj(["window.new();"],center.x-100, center.y-40, 100);
    exitTxt.shown = false;
    exitTxt.size = 30;

    windowClose = new TextObj(["window.close();"],center.x-250, center.y, 100);
    windowClose.size = 25;
    windowOpen = new TextObj(["window.open();"],center.x+80, center.y, 100);
    windowOpen.size = 25;

    web20 = new TextObj([web20Txt],center.x-605, center.y+50, 500);
    web20What = new TextObj([web20WhatTxt],center.x-805, center.y+600, 500);
    webSem = new TextObj([webSemTxt],center.x-605, center.y+1050, 500);
    webSem = new TextObj([webSemWhatTxt],center.x-225, center.y+1400, 500);

    art = new TextObj([artTxt],center.x+245, center.y+1100, 500);
    artIs = new Sprite("artIs", [ [artIsSkin] ], center.x + 405, center.y+1350, 500);
    world.push(artIs);
    artWhat = new TextObj([artWhatTxt],center.x+455, center.y-1000, 500);
    media = new TextObj([mediaTxt],center.x+405, center.y+600, 400);
    mediaWhat = new TextObj([mediaWhatTxt],center.x+225, center.y+50, 400);

    glitching = true;
    glitchEngine();
    playing = true;
    //mainLoop(); // Call main loop
}


function checkIfDone() {
    if (part == 2) {
        if (showExitCount > -1) {
            showExitCount ++;
            if (showExitCount > frameRate*60) { //After dev, set to 60
                showExitCount = -1;
                exitTxt.shown = true;
            }
        }

        else if (showExitCount < 0) {
            if (getDistance(exitTxt.x+60,exitTxt.y+5,avatar.x,avatar.y) < 100) {
                exitCount ++;
                exitTxt.size ++;
                exitTxt.offX -=3;
                if (exitCount > frameRate*3) {
                    playing = false;
                    outro();
                }
            }
            else if (part == 2) {
                exitCount = 0;
                exitTxt.size = 30;
                exitTxt.offX = 0;
            }
        }
    }
}

/**
 * Starts game.
 */
function init() {
    txtNum = 0;
    showExitCount = 0;
    exitCount = 0;
    pickColor = false;
    pickGender = false;
    part = 1;
    worldColor = [221,221,221];
    paintWorld(worldColor[0],worldColor[1],worldColor[2]);
    glitching = false;
    clear();

    music.play();
    music.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);

    ctx.font = "30px courneuf"; // Will need to load this font from css sheet
    ctx.fillStyle = "#dddddd";
    ctx.fillText("window.open() || window.close()", 40, 235); // show title
    ctx.font = "15px courneuf"; // Will need to load this font from css sheet
    ctx.fillStyle = "#dddddd";
    ctx.fillText("Un ensayo sobre el rol del arte en el mundo de la Web", 70, 260); // show subtitle

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
    avatar.gender = 2;
    // draw(avatar.actions[0][0],center.x,stage.height,stage.width);
    // Create intro text
    var introTxtObj = new TextObj(introTxts, center.x-225, 35, 450);
    introTxtObj.draw();

    function nextTxt(e) {
        introTxtObj.nextTxt();
        if (introTxtObj.txtNum == 5) {
            pickColor = true;
        }
        if (introTxtObj.txtNum == 6) {
            var pixel = ctx.getImageData(mouse.x, mouse.y, 1,1).data;
            if (pixel[0] != 0 || pixel[1] != 0 || pixel[2] != 0) {
                pickColor = false;
                worldColor = [pixel[0],pixel[1],pixel[2]];
            }
            else {
                introTxtObj.txtNum -= 1;
            }
        }
        if (introTxtObj.txtNum == 7) {
            pickGender = true;
        }
        if (introTxtObj.txtNum == 8) {
            pickGender = false;
            if (mouse.x < center.x) {
                avatar.gender = 1;
                avatar.action(5);
            }
            if (mouse.x > center.x) {
                avatar.action(6);
                avatar.gender = 2;
            }
        }

        if (introTxtObj.txtNum == 0) { // if done with all txts,
            introTxtObj.hide();
            avatar.action(0);
            avatar.gender = "agsyfdkuagfykfira";
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
    part = 3;
    ctx.font = "20px courneuf"; // Will need to load this font from css sheet
    glitching = false;
    clear();
    draw(avatar.actions[0][0],center.x,stage.height,stage.width);
    // Create outro text
    var outroTxtObj = new TextObj(outroTxts, center.x-225, 35, 450);
    outroTxtObj.draw();

    function nextTxt(e) {
        outroTxtObj.nextTxt();
        if (outroTxtObj.txtNum == 0) { // if done with all txts,
            outroTxtObj.hide();
            stage.removeEventListener("mousedown", nextTxt, false);
            out();
            init();
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
