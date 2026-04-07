console.log("conexion hecha");
const botonCalculo = document.getElementById("botonCalculo");

botonCalculo.addEventListener('click',async function consultaDolar(){
    try{

        const response = await fetch('https://dolarapi.com/v1/dolares/oficial');
        if (!response.ok){
            throw new Error('Algo salio mal');
        }
        const data = await response.json();
        console.log(data);

    }
    catch(error){
    console.error(error.message);
    }
});
//consultaDolar();


