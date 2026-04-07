console.log("conexion hecha");
const botonCalculo = document.getElementById("botonCalculo");

botonCalculo.addEventListener('click',async function consultaDolar(){
    botonCalculo.disabled="true";
    let data=[];
    //Realizo el fetch
    try{

        const response = await fetch('https://dolarapi.com/v1/dolares');
        if (!response.ok){
            throw new Error('Algo salio mal');
        }
        data = await response.json();
        //console.log(data);

    }
    //capturo errores
    catch(error){
    console.error(error.message);
    }
    //Recupero los valores competentes
    let valores=[];
    data.forEach(dolar=>{
        if (dolar.casa==="oficial" || dolar.casa==="blue" || dolar.casa==="bolsa"){
            valores.push(dolar);
        }
    });
    console.log(valores);
    const montoPesos=Number(document.getElementById("monto").value);
    console.log(montoPesos);
    const resultados=document.getElementById("resultados");
    
   

    
});



