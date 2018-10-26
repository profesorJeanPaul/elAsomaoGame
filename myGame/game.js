const canvas = document.getElementById( "canvas" );
const ctx = canvas.getContext("2d");

// Crea las constantes del juego
const WIDTH = 800, HEIGHT = 600;
const KEY_LEFT = 37, KEY_UP = 38, KEY_RIGHT = 39, KEY_DOWN = 40;
const Keys = [ ];

// Agrega escuchadores para el teclado
document.addEventListener( "keydown", function( key ) {
    Keys[ key.keyCode ] = true;
    // console.log( "la tecla " + key.key + " tiene codigo: " + key.keyCode );
} );

document.addEventListener( "keyup", function( key ) {
    Keys[ key.keyCode ] = false;
} );


// Crea las variables del juego
var Game = { };
var player = {
    x: 0,
    y: HEIGHT / 2,
    w: 70,
    h: 50,
    s: 3 // Speed
}

// Configura el canvas
canvas.width = WIDTH;
canvas.height = HEIGHT;
canvas.style.backgroundColor = "black";
ctx.fillStyle = "white";
ctx.strokeStyle = "white";

// Inicia el ciclo de juego
;( function ( ) {
    function gameLoop( tFrame ) {
        Game.stop = window.requestAnimationFrame( gameLoop );
        update();
        render();
    }
    gameLoop( );
} )( );

function update() {
    // Cambia la coordenada del player en base a las teclas presionadas
    if( Keys[ KEY_LEFT ] === true ) player.x -= player.s;
    if( Keys[ KEY_UP ] === true ) player.y -= player.s;
    if( Keys[ KEY_RIGHT ] === true ) player.x += player.s;
    if( Keys[ KEY_DOWN ] === true ) player.y += player.s;
    // Realiza los desplazamientos horizontales
    if( player.x > WIDTH ) {
        player.x = 0;
    }
    if( player.x + player.w < 0 ) {
        player.x = WIDTH - player.w;
    }
    // Realiza los desplazamientos verticales
    if( player.y >= HEIGHT ) {
        player.y = 0;
    }
    if( player.y + player.h < 0 ) {
        player.y = HEIGHT - player.h;
    }
}

function render() {
    // Limpia la pantalla
    ctx.clearRect( 0, 0, canvas.width, canvas.height );
    // Dibuja el cuadrado horizontal
    if( player.x + player.w > WIDTH ) {
        let w = player.x + player.w  - WIDTH;
        ctx.fillRect( 0, player.y, w, player.h );    
    }
    if( player.x < 0 ) {
        let w = player.x * - 1;
        ctx.fillRect( WIDTH - w, player.y, w, player.h );    
    }
    // Dibuja el cuadrado Vertical
    if( player.y + player.h > HEIGHT ) {
        let h = player.y + player.h  - HEIGHT;
        ctx.fillRect( player.x, 0, player.w, h );    
    }
    
    if( player.y < 0 ) {
        let h = player.y * - 1;
        ctx.fillRect( player.x, HEIGHT - h, player.w, h );   
    }
    ctx.fillRect( player.x, player.y, player.w, player.h );
}