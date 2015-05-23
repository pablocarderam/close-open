/**
* js/html5 game/essay on the role of art in age of Web 2.0/semantic
* Crafted by Pablo Cardenas Ramirez, pablocarderam@gmail.com
* MIT licence
* Bogota, 2015
*/


var introTxts = [
    "                       ¡Hola!                        ",

    "Soy tu avatar: tu representación en un mundo virtual.",

    "Me puedes controlar como quieras con tus botones de flechas. Si oprimes espacio, incluso saltaré por los aires cibernéticos de la manera más inverosímil cuando se te antoje.",

    "¿No es increíble? Es parte de los milagros que permite la Web 2.0: el Internet interactivo y dinámico de hoy en día. (O'Reilly, 2007)",

    "Otra cosa que permite la Web 2.0 es la personalización. ¿Cuál es tu color favorito?",

    "",

    "           ¿Tienes falda o pantalones?               ",

    "",

    "   ¡Tadáaaaaaa! Personalización. ¿Maravilloso, no?   ",

    "¿No te hace feliz? ¿No te llena de corazoncitos y lols por dentro?",

    "                  ...pues a mi no.                   ",

    "No estás aquí para ser un(a) niñ@ consentid@ con todos los planetas del ciberespacio orbitando a tu alrededor. Además, ¿Qué ocurre si no te gusta ninguno de los colores que te mostré, o si te gustan las faldas y los pantalones, o si no te gusta ninguno de las dos? De malas. Eso es lo que pasa.",

    "Como si fuera poco, el Internet de hoy en día es mucho más que interacción y personalización. ",

    "La personalización y la \"inteligencia\" del Internet moderno nos crea burbujas autocontenidas, nos repite lo que ya queremos oir y nos construye mundos menos diversos. Por eso, el rol del arte en el ciberespacio moderno debe ser movernos el piso: sacarnos de nuestras burbujas, representar lo conocido de maneras alternativas.",

    "Entonces, de malas tu y tus colores y tus faldas y pantalones. Vamos a dar un paseo por el Internet y el arte, y lo vamos a hacer \"despersonalizado\". Fuera de tu control. Porque esa es la gracia del arte.",

    "¿List@?",

    "Espero que no."

    ];

var web20Txt = "¿Qué es la Web 2.0? \nPrimero que todo... ¿qué es Web 1.0?  El Internet, como toda tecnología, fue un espacio exclusivo durante sus primeras décadas de existencia. Requerías de un computador con conexión telefónica para poder leer las páginas web –que no eran más que eso, páginas estáticas– sino que requerías de conocimiento de la tecnología y habilidades de programación para poder construir contenido. Cormode & Krishnamurthy (2008) escriben: \"Los cradores de contenido en la Web 1.0 eran pocos, con la gran mayoría de los usuarios siendo simplemente consumidores de contenido\". La Web 2.0, en cambio, da un salto enorme hacia el usuario: a lo largo de la primera década del siglo XXI, el Internet se convirtió en un espacio cada vez más mundano dentro de la vida de más de tres mil millones de personas (internetlivestats.com, 2015). Además, estas personas son mucho más que lectores y usuarios pasivos: están –estamos– generando información a escalas que la humanidad nunca ha visto en su historia (O'Reilly, 2007).";
var web20WhatTxt = "¿Qué pasa con la Web 2.0? \nHay dos caras de la moneda de la Web 2.0. La primera es uno de los mayores triumfos de la democracia humana: gracias a las herramientas de la Web 2.0, cualquier persona con un aparato con la más mínima conexión a Internet puede expresar sus opiniones al mundo en Twitter, contribuir con su conocimiento a Wikipedia o compartir sus fotografías en Flickr. No obstante, la Web 2.0 también permite que los usuarios escojan y regulen cada detalle de su experiencia online. Permiten que el usuario se pierda en la diversidad de Internet cuando este encuentra algo que no es de su gusto. Como todo está bajo mi control como usuario, ¿por qué debería preocuparme por las cosas que no me interesan? Es así como nos sumergimos en lo que Eli Pariser llama \"burbujas de filtro\" (2011). ";
var webSemTxt = "¿Qué es la Web semántica? \n El Internet de hoy en día no solo facilita que los usuarios construyamos \"burbujas de filtro\" basadas en nuestros intereses o nuestras posiciones políticas: las construye por nosotros. Tim Berners-Lee, padre de la World Wide Web, predijo una Web del futuro en la que \"la información tiene un significado bien definido, facilitando así la cooperación entre máquinas y humanos\" (Berners-Lee, Hendler & Lassila, 2001). Esto es lo que los autores llaman la \"Web semántica\": una Web legible para máquinas... pero en la que las máquinas terminan pensando por nosotros.";
var webSemWhatTxt = "Internet es capaz de aprender sobre nosotros, saber qué cosas nos gustan y cuáles no, qué tipo de personas nos parecerían buenos amigos en Facebook, a quién seguir en Twitter y qué tipo de publicidad nos interesa más. Podría mencionar un google de ejemplos más. (Sí, un \"google\" era un número, pero por supuesto que ahora es un ente abstracto que toma nota de todo lo que hacemos y reduce nuestro rango de resultados con cada \"aprendizaje\". Si Wittgenstein viviera, diría: \"Los límites de mi Google son los límites de mi mundo.\" Jimmy Wales, fundador de Wikipedia, es más directo: \"Si no está en Google, es porque no existe\" (Schiff, 2006).";

var artTxt = "¿Qué es el arte?";
var artWhatTxt = "artWhatTxt";
var mediaTxt = "mediaTxt";
var mediaWhatTxt = "mediaWhat";

var outroTxts = [
    "¿Hemos terminado ya? Muy bien.",
    "¿Sientes que te divertiste? ¿Hiciste algo que te gusta? ¿Aprendiste? Me alegra.",
    "¿Sientes que fue una pérdida de tiempo? ¿Algo que normalmente no hubieras hecho? Mejor aún. Si llegaste hasta aquí pensando eso y no desististe a mitad de camino para revisar tu Facebook o buscar algo en Pinterest o Stumbleupon, creo que he logrado mi objetivo como artista. Tu relación con Internet ha cambiado.",
    "Un poco.",
    "Tal vez.",
    "Y si no...",
    "Voy a redireccionarte a una página de Wikipedia al azar. Y te la vas a leer.",
    "Com ple ti ca.",
    "*"
    ];
