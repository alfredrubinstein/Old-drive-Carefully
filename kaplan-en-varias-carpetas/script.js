//version13
//arreglo de fotos y id
const ides = ['fuegos', 'piedras', 'fuegos', 'piedras', 'fuegos', 'piedras', 'personas', 'puntos'];
const imagenes = ["./images/fuego.gif", "./images/piedra.gif", "./images/fuego.gif", "./images/piedra.gif", "./images/fuego.gif", "./images/piedra.gif", "./images/pron.gif", "./images/puntos.gif"];
let imagenActualIndex = 0;

const milui = document.getElementById('milui');
const perdiste = document.getElementById('perdiste');
const ambuli = document.getElementById('ambulanceImage');
const ambul = document.getElementById('ambulance');
const scoreContainer = document.getElementById('score-container');
const volver = document.getElementById("volvi");
const displayGameOver = document.getElementById("game-over");
const arrowButton = document.getElementById("move-up");
const downButton = document.getElementById("move-down");
const displayWel = document.getElementById("welcome");
const starti = document.getElementById("emp");
const levelContainer = document.getElementById('level');
const displayWin = document.getElementById('win');
const botonInfo = document.getElementById('open-rules');
const displayInfo = document.getElementById('rules');
const cerrarInfo = document.getElementById('close-rules');

const clasePerson = document.querySelectorAll(".person");


// Variables iniciales
let tiempoNivel = 1500;
// let intervalo;
let level = 1;
let score = 1000;
let score2 = 0;//revisar
let maximo = 72;
let minimo = 48;
let medio = 61;
let currentTop = medio;
let jugando = false;
let infoAbierto = false;

//variantes de animacion
let speed = 1;//cantidad de pixeles que se mueve por cada llamada
let leveli = 10;
let llamadas = 0;//cada...milisegundos se llama a hacer un movimiento "speed"



//funciones principales
principio();
setInterval(createPerson, 1000);



//botones
//boton para empezar juego
starti.addEventListener("click", () => {
  console.log("boton de principio");
  jugar();
});

//funcion teclado subir,bajar
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp') {
    console.log("boton teclado arriba");
    bajar();
  }
  if (event.key === 'ArrowDown') {
    console.log("boton teclado abajo");
    subir();
  }
});
//funciones de botones y teclado
//funcion boton pantalla
// boton pantalla subir
arrowButton.addEventListener("click", () => {
  console.log("boton pantalla arriba");
  bajar();
});
// boton pantalla bajar
downButton.addEventListener("click", () => {
  console.log("boton pantalla abajo");
  subir();
});
//boton salir de game over
volver.addEventListener("click", () => {
  console.log("boton salir de game over");
  location.reload();
  // jugar();
});

//boton salir de win
displayWin.addEventListener("click", () => {
  console.log("boton salir de ganador");
  location.reload();
  // jugar();
});

// boton open informacion
botonInfo.addEventListener("click", () => {
  console.log("boton informacion");
  if (!infoAbierto) {
    openInfo();
    infoAbierto = true;
  }
  else {
    jugar();
    infoAbierto = false;
  }
});


// boton cerrar informacion
cerrarInfo.addEventListener("click", () => {
  console.log("boton salir de informacion");
  // location.reload();
  jugar();
});






//pantallas///////////////////////////////////////////////
//primer pantalla antes de jugar
function principio() {
  displayWel.style.display = "block";
  limpieza();
  jugando = false;
}
function openInfo() {
  displayInfo.style.display = "block";
  // clearInterval(intervalo);
  limpieza();
  displayGameOver.style.display = "none";
  jugando = false;
}
//funcion game-over
function perdido() {
  // clearInterval(intervalo);
  displayGameOver.style.display = "block";
  limpieza();
  score = 0;
  updateScore(score);
  level = 1;
  updateLevel;
  jugando = false;
  animacionPerdiste();
}


//ganaste
function winer() {
  if (displayGameOver.style.display === "none" &
    displayWel.style.display === "none" &
    displayInfo.style.display === "none") {
    // clearInterval(intervalo);
    displayWin.style.display = 'block';
    limpieza();
    jugando = false;
  }
}

function jugar() {
  // intervalo =  
  setInterval(increaseLevel, 15000);
  // intervalo();
  jugando = true;
  console.log("salida de game over y volver a empezar");
  displayGameOver.style.display = "none";
  displayWel.style.display = "none";
  displayInfo.style.display = "none";
  displayWin.style.display = "none";
  ambul.style.display = "block";
  ambuli.style.display = "block";
  score = 1000;
  updateScore(score);
  level = 1;
  updateLevel;
}


//funciones////////////////////////////////////////////////
function bajar() {
  if (currentTop < minimo) {
    console.log("estas en funcion bajar1");
    currentTop += 1;
    ambul.style.top = `${currentTop}%`;
    score -= 100;
    updateScore(score);
  } else {
    console.log("estas en funcion bajar2");
    currentTop -= 1;
    ambul.style.top = `${currentTop}%`;
  }
}
function subir() {
  if (currentTop > maximo) {
    console.log("estas en funcion subir1");
    currentTop -= 1;
    ambul.style.top = `${currentTop}%`;
    score -= 100;
    updateScore(score);
  } else {
    console.log("estas en funcion subir2");
    currentTop += 1;
    ambul.style.top = `${currentTop}%`;
  }
}

//vorrar a todo lo de la clase person
function limpieza() {
  // debugger
  // Selecciona todos los elementos con la clase "person"
  clasePerson.forEach(function (elementon) {
    elementon.remove();
    // debugger
  });
  ambul.style.display = "none";
  ambuli.style.display = "none";
  // debugger
}

// Función para actualizar la puntuación en la interfaz
function updateScore(newScore) {
  score = newScore;
  scoreContainer.textContent = `SCORE: ${score}`;
  // game over
  if (newScore <= 0) {
    perdido();
  }
}
// Función para actualizar el nivel en la interfaz
function updateLevel(newLevel) {
  level = newLevel;
  levelContainer.textContent = `LEVEL: ${level}`;
}
// Función para aumentar el nivel
function increaseLevel() {
  if (level < 4 & jugando) {
    level++;
  } else {
    updateLevel(1);
    winer();
  }
  // Actualizar el nivel y la puntuación en la interfaz
  updateLevel(level);
  updateScore(score);
}








//script persona//////////////////////////////////////////////////////////////////////////////////
// Función para crear una persona, revisar aca opcion de arreglar boolean
function createPerson() {
  if (jugando) {
    console.log('el juego esta activado');
    const personi = document.createElement('img');//creacion
    personi.src = imagenes[imagenActualIndex];//direccion
    personi.idName = ides[imagenActualIndex];//id
    personi.className = 'person';//clase
    personi.style.left = '1500px'; // Inicialmente, a la derecha de la pantalla
    personi.style.height = '30px';
    personi.style.width = 'auto';
    //agregar aca ternario, si no hay colision con road remove y volver a crear
    personi.style.top = `${Math.random() * (26) + 49}%`;//altura de nacimiento
    road.appendChild(personi);//dependencia
    movePerson(personi);
    imagenActualIndex++;
    if (imagenActualIndex >= imagenes.length) {
      imagenActualIndex = 0;
    }
  }
}

// Función para mover una persona hacia la izquierda hasta desaparecer
function movePerson(personi) {
  if (jugando) {
    const moveInterval = setInterval(function () {
      const currentLeft = parseInt(personi.style.left);
      if (currentLeft < -1) {
        clearInterval(moveInterval);
        personi.remove();
        score += 25;
        updateScore(score);
      } else {
        personi.style.left = `${currentLeft - speed}px`;
      }
      if (score > score2 + 1000) {
        speed += 2;
        score2 += 500;
      }










      //funcion efecto general usando this , para choque salida, fuego ,montana
      // function efecto() {
      //   setTimeout(this.style.display = "block", 1000);
      //   this.style.display = "none"
      // }





      // Verificar si la ambulancia choca con una persona
      if (isCollision(ambulance, personi)) {
        subir();

        if ("fuegos" === personi.idName) {
          // efecto.bind(quema); 
          personi.remove();
          score -= 100;
          updateScore(score);
          console.log('chocaste con fuego');
        }
        if ("piedras" === personi.idName) {
          personi.remove();
          score -= 50;
          updateScore(score);
          console.log('chocaste con piedra');
        }
        if ("personas" === personi.idName) {
          personi.remove();
          perdido();
          console.log('chocaste con persona');
        }
        if ("puntos" === personi.idName) {
          personi.remove();
          score += 200; //ganaste 10 puntos
          updateScore(score);
          console.log('chocaste con ganador de puntos');
        }
      }
    }, llamadas);
  }
}

// Función para verificar si dos elementos colisionan
function isCollision(element1, element2) {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}





function animacionPerdiste() {
  elemento.classList.add("perdiste");
  // detener la animación
  setTimeout(function () {
    elemento.classList.remove("perdiste");
  }, 100);


  elemento.classList.add("milui");
  // detener la animación
  setTimeout(function () {
    elemento.classList.remove("milui");
  }, 100);
}