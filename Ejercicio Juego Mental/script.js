//console.log("hola mundo");
function random(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let rango = random(2,5);
//console.log(rango);

let numeros=[];
let suma=0;
do{
    suma=0
    for (let i=0; i<rango; i++){
        numeros[i]=random(-5,15);
        suma=suma+numeros[i];
    }
    if (suma<0){
        suma-1;
    }
} while(suma<0);

console.log(numeros);
console.log(suma);


function iniciarJuego(){

    let parrafo=document.getElementById("numbers");
    let botonIngreso=document.getElementById("botonIngreso");
    let input = document.getElementById("valor");
    let parrafo2=document.getElementById("correctoIncorrecto");
    let resultado=document.getElementById("resultado");
    let reintentar=document.getElementById("recargar");


    let i=0;

    let intervalo = setInterval(()=> {

        parrafo.textContent=numeros[i];
        i++

        let tiempoFuera=setTimeout(()=>{
            parrafo.textContent="";
            if (i===numeros.length){
             parrafo.textContent="Que Numero es?";
            }
        },1000);
        if (i===numeros.length){
            clearInterval(intervalo);
            input.disabled = false;
            botonIngreso.disabled = false;
        }
        

    }, 2000);
    
    botonIngreso.addEventListener("click",()=> {
        console.log(input.value);
        botonIngreso.disabled = true;
        if(input.value==suma){
            parrafo2.textContent="Correcto!!";
            reintentar.style.display="block";        
        }
        else{
            parrafo2.textContent="Incorrecto!!";
            resultado.innerText="El resultado era " + suma + ". Intentelo de Nuevo";
            reintentar.style.display="block"; 
        }
    })    
}

iniciarJuego();


