let preguntas_aleatorias = true;
let mostrar_fin_juego = true;
let reiniciar_puntos_y_juego = true;


window.onload = function () {
  base_preguntas = readText("base-preguntas.json");       //Variable que almacena las distintas preguntas
  interprete_bp = JSON.parse(base_preguntas);
  escogerPreguntaAleatoria();

};

let pregunta;
let posibles_respuestas;
btn_correspondiente = [
  select_id("btn1"),
  select_id("btn2"),
  select_id("btn3"),
  select_id("btn4")
];
let npreguntas = [];
let ronda;
let preguntas_hechas = 0;
let acumulado = 0;

function escogerPreguntaAleatoria() {
  let n;
  let ronda = preguntas_hechas + 1;
  if (ronda==6){
    guardarPuntajes(); 
  } 
  
  if (preguntas_aleatorias) {
    // n = Math.floor((Math.random() * 5));
     n = Math.floor((Math.random() * 5)) + (5 * (ronda - 1));
  } else {
    n = 0;
  }

  while (npreguntas.includes(n)) {
    n++;
    if (n >= 5) {
      n = 0;
    }
   if (npreguntas.length == 5) {
      //Aquí es donde el juego se reinicia
      if (mostrar_fin_juego) {
        swal.fire({
          title: "¡Felicitaciones, ganaste $" + acumulado + "!",
          text: "FIN DEL JUEGO",
          icon: "success"
        });
      }
      if (reiniciar_puntos_y_juego) {
        acumulado = 0
        preguntas_hechas = 0
        ronda = 0
      }
      npreguntas = [];

    }
  }
  npreguntas.push(n);
  preguntas_hechas++;

  escogerPregunta(n);

}


function escogerPregunta(n) {

  pregunta = interprete_bp[n];
  select_id("categoria").innerHTML = pregunta.categoria;
  select_id("pregunta").innerHTML = pregunta.pregunta;
  select_id("premio").innerHTML = pregunta.premio;
  let acum = acumulado;
  if (preguntas_hechas > 1) {
    select_id("puntaje").innerHTML = "Tu Acumulado es de $" + acum;
  } else {
    select_id("puntaje").innerHTML = "";
  }

  style("imagen").objectFit = pregunta.objectFit;
  desordenarRespuestas(pregunta);
  if (pregunta.imagen) {                                    //Si la pregunta tiene imagen
    select_id("imagen").setAttribute("src", pregunta.imagen);
    style("imagen").height = "200px";
    style("imagen").width = "100%";
  } else {
    style("imagen").height = "0px";
    style("imagen").width = "0px";
    setTimeout(() => {
      select_id("imagen").setAttribute("src", "");
    }, 500);
  }
}

function desordenarRespuestas(pregunta) {
  posibles_respuestas = [
    pregunta.respuesta,
    pregunta.incorrecta1,
    pregunta.incorrecta2,
    pregunta.incorrecta3,
  ];
  posibles_respuestas.sort(() => Math.random() - 0.5);

  select_id("btn1").innerHTML = posibles_respuestas[0];
  select_id("btn2").innerHTML = posibles_respuestas[1];
  select_id("btn3").innerHTML = posibles_respuestas[2];
  select_id("btn4").innerHTML = posibles_respuestas[3];
}

let suspender_botones = false;

function oprimir_btn(i) {
  if (suspender_botones) {
    return;
  }
  suspender_botones = true;
  if (posibles_respuestas[i] == pregunta.respuesta) {
    acumulado += parseInt(pregunta.premio);
    btn_correspondiente[i].style.background = "lightgreen";
  } else {
    btn_correspondiente[i].style.background = "pink";
    swal.fire({
      title: " :( Perdiste el juego...",
      text:
        "¿Quieres intentarlo nuevamente?",
      icon: "error"
    });
    if (reiniciar_puntos_y_juego) {
      acumulado = 0
      preguntas_hechas = 0
    }
    npreguntas = [];
  }
  for (let j = 0; j < 4; j++) {
    if (posibles_respuestas[j] == pregunta.respuesta) {
      btn_correspondiente[j].style.background = "lightgreen";
      break;
    }
  }
  setTimeout(() => {
    reiniciar();
    suspender_botones = false;
  }, 3000);
}

function retirarse() {
  swal.fire({
    title: "Prudente decisión...¡Ganaste $" + acumulado + "!",
    text:
      "FIN DEL JUEGO",
    icon: "success"
  });
  if (reiniciar_puntos_y_juego) {
    acumulado = 0
    preguntas_hechas = 0
    ronda=0
  }
  npreguntas = [];
  setTimeout(() => {
    reiniciar();
    suspender_botones = false;
  }, 3000);
}

function guardarPuntajes() {
  var nombre = prompt("Introduce tu nombre:", "Zoilo Bravo");
  swal.fire({
    title: "¡Felicitaciones, " + nombre + ", ganaste $" + acumulado + "!",
    text: "FIN DEL JUEGO. Actualiza la página web.",
    icon: "success"
  });

  let jugador ={
    nombre: nombre,
    acumulado: acumulado
  } 

  localStorage.setItem( "rankingPuntajes", JSON.stringify(jugador));
 
  /*let rankingPuntajes = JSON.parse(localStorage.getItem("rankingPuntajes")) || [];

  console.log(jugador); */
  
  
  //altosPuntajes.push(jugador);

  //localStorage.setItem( "rankingPuntajes", []);
  // localStorage.setItem("usuarios", myJSON);

  if (reiniciar_puntos_y_juego) {
    acumulado = 0
    preguntas_hechas = 0
    ronda=0
  }
  npreguntas = [];
  setTimeout(() => {
    reiniciar();
    suspender_botones = false;
  }, 3000);
   
  
}




function reiniciar() {
  for (const btn of btn_correspondiente) {
    btn.style.background = "white";
  }
  escogerPreguntaAleatoria();
}

function select_id(id) {                   //Seleccionar, por medio del query con un id, un objeto
  return document.getElementById(id);
}

function style(id) {                       //Obtener estilo del objeto HTML señalado por medio de su id
  return select_id(id).style;
}

function readText(ruta_local) {             //Leer texto en un ruta local síncronamente
  var texto = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", ruta_local, false);
  xmlhttp.send();
  if (xmlhttp.status == 200) {
    texto = xmlhttp.responseText;
  }
  return texto;
}

