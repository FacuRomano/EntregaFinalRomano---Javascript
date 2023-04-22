/* La funcion jugar esta en desarrollo para proximas entregas, en espera de adquirir nuevos conocimientos!

function jugar(){
    for (let i = 0; i>=0;){
    let rta = document.querySelector('input[name="opcion"]:checked');
        if (opcion !== null) {
        let r = opcion.id;
        document.getElementById("puntaje").innerHTML = r;
        }
        else {
        alert("Por favor, seleccione una operación.");
        }
    }
}
*/

//===================================================================================================
//FUNCIONES DE CREACION DE LISTA

//Esta funcion muestra en pantalla una cantidad de numeros indicada por el usuario
function mostrarNumeros() {
    let lista = document.getElementById("lista"); //en este caso se toma al objeto llamado id="lista" y lo transofmra en una variable
    let n = parseInt(document.getElementById("valor").value); //la variable n va a tomar el valor que le ingrese el usuario mediante un input denomindao id="valor" y lo va a transformar en un entero

    let i = 1;
    while (i <= n) {
        let li = document.createElement("li");
        li.textContent = i;
        lista.appendChild(li);
        i++;
    }
}
//Cree esta funcion para borrar la lista creada sin necesidad de indicar otro valor
function cancelar(){
    let lista = document.getElementById("lista");
    lista.innerHTML = "";
}

//===================================================================================================
//FUNCIONES DE CASA DE CABMIO

//Esta funcion sirve para hacer un cambio de moneda a pesos ingresando el valor en la moneda indicada 
function convertir(){
    let valore = parseInt(document.getElementById("valor").value);
    let resultado = 0;
    let dolar = 217.48;
    let euro = 238.37 ;

    if (document.getElementById("uno").checked){
        resultado = valore / dolar;
        alert("El cambio de pesos a dolares es: oficiales $" + resultado);
    }
    else if (document.getElementById("dos").checked){
        resultado = valore / euro;
        alert("El cambio de pesos a euros oficiales es: $" + resultado);
    }
    else{
        alert("Tienes que completar los requisitos")
    }

}

//===================================================================================================
//FUNCIONES DE CALCULADORA

//Esta funcino la cree para hacer una calculadora con un switch para elegir que operacion matematica desea hacer el ususario con los numero ingresados
function calcular(){
    event.preventDefault();
    let x = parseInt(document.getElementById("valor1").value);
    let y = parseInt(document.getElementById("valor2").value);
      
    let operacion = document.querySelector('input[name="operacion"]:checked');

    if (operacion !== null) {
    let o = operacion.id;

        switch (o){
            case "Suma":
                document.getElementById("el_resultado").innerHTML = x+y;
                break;
            case "Resta":
                document.getElementById("el_resultado").innerHTML = x-y;
                break;

            case "Multiplicacion":
                document.getElementById("el_resultado").innerHTML = x*y;
                break;

            case "Division":
                document.getElementById("el_resultado").innerHTML = x/y;
                break;
        }
 
    } 
    else {
    alert("Por favor, seleccione una operación.");
    }
    

}

//Esta funcion limpia los numeros escritos en la calculadora
function limpiar(){
    document.getElementById("miCalculadora").reset();
}


//===================================================================================================
//FUNCIONES DE PROMEDIOS

let equipo;

function pedirEquipo(){
    if(window.location.href.includes("promedio.html")){
        equipo = prompt("De qué equipo sos hincha?");
    document.getElementById("equipo").innerHTML = equipo;
    }
};

function promediar(){
    let p1 = document.getElementById("pts20").value;
    let p2 = document.getElementById("pts21").value;
    let p3 = document.getElementById("pts22").value;
    let texto = "Puntos"
    let rtdo = (parseFloat(p1)+parseFloat(p2)+parseFloat(p3))/3;
    document.getElementById("promedio").innerHTML = equipo + " promedio: " + rtdo + texto;
}


//===================================================================================================
//FUNCIONES DE INTERESES 

//Esta funcion es la que presento para esta primer entrega, todo lo demas esta en cosntruccion no es nada final y son cosas que quise ir adelantando para mi proyecto final que va a ser una pagina interactiva con datos e informacion sobre javascript. 

//La funcion pide 2 valores en consola: Valoor total y cuotas con las que pago y te calcula los intereses y el IVA y devuelve el resultado en la consola
function intereses(){
    if(window.location.href.includes("prestamos.html")){
        let interesAño = 1.24;
        let interesMes1 = 1;
        let interesMes3 = 1.12;
        let interesMes6 = 1.18;
        let iva = 1.21;
        let valorTota= prompt("Ingrese el valor total de su producto");
        let cantCuotas= prompt("En cuantas cuotas pago?: 1, 3, 6 o 12")

        if (cantCuotas == 12){
            valorTota = (valorTota * interesAño) * iva;
            console.log("El valor total de su producto mas IVA es de: " + valorTota)
            alert("El valor total de su producto + IVA es: " + valorTota) 
        } else if (cantCuotas == 6) {
            valorTota = (valorTota * interesMes6) * iva;
            console.log(valorTota)
            alert("El valor total de su producto + IVA es: " + valorTota) 
            
        } else if (cantCuotas == 3){
            valorTota = (valorTota * interesMes3) * iva;
            console.log(valorTota)
            alert("El valor total de su producto + IVA es: " + valorTota) 
        }else if (cantCuotas == 1){
            valorTota = (valorTota * interesMes1 * iva);
            console.log(valorTota)
            alert("El valor total de su producto + IVA es: " + valorTota) 
        }

    }
    
}

//Esta segunda funcion la estoy desarrollando para aplicarla en la seccion de intereses de mi html

/*
function intereses(){
    total = document.getElementById("vt").value;
    cuotas =  document.getElementById("ct").value;
    interesAño = 1.24;

    const interesMes = interesAño/12;
    const totalCuota = total / cuotas;
    let saldo = total;
    let interesTotal = 0;
    iva = 1.21;

    for (let i = 0; i < cuotas; i++){
        const intereses = saldo * interesMes;
        interesTotal +=intereses;
        saldo -= totalCuota;
        saldo += intereses;
    }

    const totalIVA= (total + interesTotal);
    document.getElementById("totalIVA").innerHTML = "$"+ totalIVA;

}
*/




//===================================================================================================
//Funciones de prueba...
//Funciones de prueba...

/*
 function getNombre(){
    let nombre = prompt("Ingresa tu Nombre: ");
    alert("Hola" + nombre);
}

function suma (a, b){
    resultado = a + b;
    console.log(`La suma de ${a} + ${b} es: ${resultado}`)
    
}
suma(3, 5)

function returnNombre(a){
    return a;
}
let nombre = prompt("Ingresa tu nombre: ");
console.log("Hola " + returnNombre(nombre))


//Prueba de calculadora con prompts y alerts:
function calculadora(a, b, operacion){
    switch (operacion) {
        case "suma":
            return a + b
            break;
            
        case "resta":
            return a - b
            break;
        case "multiplicacion":
            return a * b
            break;
        case "division":
            return a / b
            break;
        default:
            return "Syntax Error";
            break;
    }
}


let valor1 = Number(prompt("Ingresa el primer valor: "));
let valor2 = Number(prompt("Ingresa el segundo valor: "));
let operacion = prompt("Ingresa la operacion que desea: suma, resta, multiplicacion o division ");

let resultado = calculadora(valor1, valor2, operacion);
alert(resultado);

*/

