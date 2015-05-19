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


/**
 * Starts game. Create world, then call main loop.
 */
function init() {
    //Create sprites: Sprite("name", [[action1Skin1, action1Skin2, ...], [action2Skin1, action2Skin2, ...], ... ], Xcoor, Ycoor, Width)
    var avatar = new Sprite("avatar", [[standSkin]], center.x, center.y, 70);

    mainLoop(); // Call main loop
}

preload("...modernizando el arte..."); // MAIN
