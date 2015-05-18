//**  arenera game engine   ***\\

/**
* js/html5 game engine
* Crafted by Pablo Cardenas Ramirez, pablocarderam@gmail.com
* MIT licence
* Bogota, 2015
*/

// start global vars
var page = document.getElementById("page"), // get div element covering whole page, for mouse and touch events
stage = document.getElementById("stage"), // get canvas element
ctx = stage.getContext("2d"); // and context


/**
 * Clears stage.
 */
function clear() {
    stage.width = stage.width;
}


/*******PRELOADER*******/

/**
* returns image object to be preloaded
*/
function newImg(path) {
    var img = new Image();
    img.filePath = path;
    assets.push(img);
    return img;
}

/**
 * Preloads assets, prints fraction to canvas
 */
function preload(pAssets) {
    var numLoaded = 0;
    var total = pAssets.length;
    var tracker = numLoaded + " / " + total;


    ctx.font = "20px courneuf";
    ctx.fillText("...modernizando el arte..." + tracker, 0, 100); //show preloader

    function onload() {
        numLoaded ++;
        clear();
        tracker = numLoaded + " / " + total;
        ctx.fillText("...modernizando el arte..." + tracker, 0, 100);
        if (numLoaded == total) {
            //clear();
            init();
        }
    }

    for (var i = 0; i < total; i++) {
        pAssets[i].onload = onload;
        pAssets[i].src = pAssets[i].filePath;
    }
}

// Stores all assets
var assets = [];

// Declare images here
var standSkin = newImg("assets/Sprite/stand.png");


//** MAIN **\\
preload(assets);
