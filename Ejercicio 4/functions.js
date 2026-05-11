let primeraCarta = null;
let segundaCarta = null;
let bloqueo = false;
let juegoIniciado = false;
let paresEncontrados = 0;
const mensajeFinal = document.getElementById("mensajeFinal");
const botonReinicio = document.getElementById("botonReinicio");
const divFinal = document.getElementById("final");

class Carta {
    constructor(emoji) {
    this.emoji = emoji;
    this.elemento = document.createElement("div");
    this.elemento.classList.add("carta");

    this.visible = false;

    this.render();
    this.eventos();
}

 render() {
    this.elemento.textContent = ""; 
 }

 mostrar() {

    if (!juegoIniciado) return;

    this.elemento.textContent = this.emoji;
    this.elemento.classList.add("activa");
    this.visible = true;
  }

 ocultar() {
    this.elemento.textContent = "";
    this.elemento.classList.remove("activa");
    this.visible = false;
 }

 eventos() {
    this.elemento.addEventListener("click", () => {
      if (!juegoIniciado || this.visible || bloqueo) return;

    this.mostrar();

    if (!primeraCarta) {
      primeraCarta = this;
    } else {
      segundaCarta = this;
      bloqueo = true;

      if (primeraCarta.emoji === segundaCarta.emoji) {
        paresEncontrados++;
        if (paresEncontrados === totalPares) {
            setTimeout(() => {
              divFinal.classList.remove("oculto");
              divFinal.classList.add("contenedor");
              mensajeFinal.classList.remove("oculto");
              mensajeFinal.classList.add("styleMensaje");
              mensajeFinal.innerText=("Ganaste!! 😎🔥");
              botonReinicio.classList.add("boton");

          }, 300);
        }
        resetSeleccion();
      } else {
        setTimeout(() => {
          primeraCarta.ocultar();
          segundaCarta.ocultar();
          resetSeleccion();
        }, 1000);
      }
    

    }});
 }
}

function resetSeleccion() {
  primeraCarta = null;
  segundaCarta = null;
  bloqueo = false;
}

const btn = document.getElementById("btnIniciar");

btn.addEventListener("click", () => {
  juegoIniciado = true;
  tablero.classList.remove('oculto');
  tablero.classList.add('grid-cartas');
  const inicio=document.getElementById("inicio");
  inicio.classList.remove('contenedor');
  inicio.classList.add('oculto');

});

const emojis = [
  "🎮","🕹️","👾","🎲","🃏","♟️","🎯","🏆","🥇","🔥",
  "⚡","💣","🧨","🔫","🗡️","⚔️","🛡️","🏹","🪓","⛏️",
  "👑","💎","🎱","📦","🎁","🚀","🛸","🌌","🌠","🪐",
  "🐉","🦖","🦕","🐺","🦊","🐯","🦁","🦂","🐍","🕷️",
  "👻","💀","☠️","👽","🤖","🎃","😈","🧟","🧙","🦸"
];

const pares = [...emojis, ...emojis];
const tablero = document.getElementById("tablero");
pares.sort(() => Math.random() - 0.5);
const totalPares = pares.length / 2;
for (let i = 0; i < pares.length; i++) {
    const carta = new Carta(pares[i]);
    tablero.appendChild(carta.elemento);
}

