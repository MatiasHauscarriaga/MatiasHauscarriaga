function randomRango(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generarNumerosUnicos(cantidad,max) {
  const numeros = new Set();

  while (numeros.size < cantidad) {
    numeros.add(randomRango(0, max));
  }

  return [...numeros];
}

const botonStart=document.getElementById('start');

botonStart.addEventListener('click', async function comenzarJuego(){
    botonStart.disabled=true;
    let main=document.getElementById('main');
    main.style.display='none';
    const categoria=document.getElementById('categoria').value;
   
    const response = await fetch('data/trivia_realista_240.json');
    const data = await response.json();
    let preguntas = data;

    let cuestionario=document.getElementById('cuestionario');
    cuestionario.classList.remove('oculto');
    cuestionario.classList.add('contenedor');
    let numeroPregunta=document.getElementById('numeroPregunta');
    let pregunta=document.getElementById('pregunta');
    const timer = document.getElementById("timer");
    

    let preguntasCuestionario=preguntas.categorias;
    let preguntasSeleccionadas=[];

    preguntasCuestionario.forEach(categorias=>{
        if (categorias.nombre==categoria){
            preguntasCuestionario=categorias.preguntas;
        }
    })

    let indicePregunta = generarNumerosUnicos(5, preguntasCuestionario.length - 1);
    
    indicePregunta.forEach(i => {
        preguntasSeleccionadas.push(preguntasCuestionario[i]);
    });

    let timeout;
    let actual = 0;
    let puntaje = 0;
    let tiempoRestante = 5;
    let intervalo;

    function mostrarPregunta() {
        const p = preguntasSeleccionadas[actual];

        numeroPregunta.textContent = `Pregunta ${actual + 1}`;
        pregunta.textContent = p.pregunta;

       
        const puntajeHTML = document.getElementById("progreso");
        const contenedor = document.getElementById('respuestas');
        contenedor.innerHTML = "";

        const opciones = [...p.incorrectas, p.correcta];
        opciones.sort(() => Math.random() - 0.5);

        opciones.forEach(op => {
            const btn = document.createElement("button");
            btn.textContent = op;

            btn.addEventListener("click", () => {
                clearTimeout(timeout);
                clearInterval(intervalo); 

                document.querySelectorAll("#respuestas button").forEach(b => b.disabled = true);

                if (op === p.correcta) {
                    console.log("Correcto 😎");
                    puntaje++;
                    puntajeHTML.textContent = `Puntaje: ${puntaje}/5`;
                } else {
                    console.log("Incorrecto 💀");
                }

                siguiente();
            });
           
            contenedor.appendChild(btn);
        });

       
        tiempoRestante = 5;
        timer.textContent = `Tiempo: ${tiempoRestante}s`;

        clearInterval(intervalo);
        intervalo = setInterval(() => {
            tiempoRestante--;
            timer.textContent = `Tiempo: ${tiempoRestante}s`;

            if (tiempoRestante <= 0) {
                clearInterval(intervalo);
            }
        }, 1000);

        timeout = setTimeout(() => {
            console.log("Se acabó el tiempo ⏰💀");
            clearInterval(intervalo);
            document.querySelectorAll("#respuestas button").forEach(b => b.disabled = true);
            
            setTimeout(() => {
             siguiente();
            }, 1500);

        }, 5000);
    }

    function siguiente() {
        actual++;

        if (actual < preguntasSeleccionadas.length) {
            mostrarPregunta();
        } else {
            console.log("Juego terminado 🎉");
            const puntajeHTML = document.getElementById("progreso");
            puntajeHTML.textContent = `Puntaje Final: ${puntaje}/5`;
            document.getElementById('botonRecargar').style.display='block'; 
        }
    }

    mostrarPregunta();
});