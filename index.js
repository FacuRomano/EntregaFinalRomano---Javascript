 //La funcion jugar esta en desarrollo para proximas entregas, en espera de adquirir nuevos conocimientos!
/*
 let puntos = 0;
 let vidas = 3;

 function restarVidas() {
    if (respuesta == "incorrecta"){
        vidas = vidas - 1;
    }
 }

 function send() {
    let error = vidas - 1;
    let correcto = puntos +  parseInt(document.getElementById("correcta").value);
    let respuesta = document.querySelector('input[name="opcion"]:checked').value;

    while ( vidas > 0){
        if (respuesta == 10 ){
            puntos += correcto;
            alert("feicidades, respondiste correctamente la primer pregunta. Conseguiste 10 puntos!");
        } else{
            vidas = error;
            alert("Lo siento, respondiste incorrectamente, perdiste una vida.");
        }

    }
 }



//
*///===================================================================================================
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

/*
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
    document.getElementById("promedio").innerHTML = equipo + " promedio: " + rtdo.toFixed(2) + texto;
}


//===================================================================================================
//FUNCIONES DE INTERESES 

//Esta funcion es la que presento para esta primer entrega, todo lo demas esta en cosntruccion no es nada final y son cosas que quise ir adelantando para mi proyecto final que va a ser una pagina interactiva con datos e informacion sobre javascript. 

//La funcion pide 2 valores en consola: Valoor total y cuotas con las que pago y te calcula los intereses y el IVA y devuelve el resultado en la consola
const inflacion = (a,b,c) => (a + b + c)/3;
function intereses(){
    if(window.location.href.includes("prestamos.html")){
        let interesAño = 1.24;
        let interesMes1 = 1;
        let interesMes3 = 1.12;
        let interesMes6 = 1.18;
        a = 1.948;
        b = 1.529;
        c = 1.4202;
        let iva = 1.21;

        alert ("Esta funcion va a determinar si te conviene sacar un producto en cuotas teniendo en cuenta que la inflacion anual es del 63% y la tasa de interes anuel es del 24%");
        let valorTota= prompt("Ingrese el valor total de su producto");
        let cantCuotas= prompt("En cuantas cuotas pago?: 1, 3, 6 o 12");

        let inflacionPromedio = inflacion(1.948, 1.529, 1.4202);
        let valorInflado12 = valorTota * (1 + inflacionPromedio)*iva;
        let valorInflado6 = valorTota * (1 + (inflacionPromedio / 2))*iva;
        let valorInflado3 = valorTota * (1 + (inflacionPromedio / 4))*iva;
        let valorInflado1 = valorTota * (1 + (inflacionPromedio / 12))*iva;

        switch (cantCuotas){
            case "1":
                valorTota = (valorTota * interesMes1) * iva;
                console.log(valorTota)
                if (valorTota <= valorInflado1){
                    alert("El valor total de su producto + IVA es: $" + valorTota.toFixed(2) + " y te conviene pagar en 1 cuota porque el valor dentro de un mes va a ser de $" + valorInflado1.toFixed(2))
                }else{
                    alert("El valor total de su producto + IVA es: $" + valorTota.toFixed(2) + " y no te conviene pagar en cuotas porque el valor dentro de un mes va a ser de $" + valorInflado1.toFixed(2))
                }
                break;

            case "3":
                valorTota = (valorTota * interesMes3 ) * iva;
                console.log(valorTota)
                if (valorTota <= valorInflado3){
                    alert("El valor total de su producto + IVA es: $" + valorTota.toFixed(2) + " y te conviene pagar en cuotas porque el valor dentro de 3 meses va a ser de $" + valorInflado3.toFixed(2))
                }else{
                    alert("El valor total de su producto + IVA es: $" + valorTota.toFixed(2) + " y no te conviene pagar en cuotas porque el valor dentro de 3 meses va a ser de $" + valorInflado3.toFixed(2))
                }
                break;

            case "6":
                valorTota = (valorTota * interesMes6) * iva;
                console.log(valorTota)
                if (valorTota <= valorInflado6){
                    alert("El valor total de su producto + IVA es: $" + valorTota.toFixed(2) + " y te conviene pagar en cuotas porque el valor dentro de 6 meses va a ser de $" + valorInflado6.toFixed(2))
                }else{
                    alert("El valor total de su producto + IVA es: $" + valorTota.toFixed(2) + " y no te conviene pagar en cuotas porque el valor dentro de 6 meses va a ser de $" + valorInflado6.toFixed(2))
                }
                break;

            case "12":
                valorTota = (valorTota * interesAño) * iva;
                console.log(valorTota)
                if (valorTota <= valorInflado12){
                    alert("El valor total de su producto + IVA es: $" + valorTota.toFixed(2) + " y te conviene pagar en cuotas porque el valor dentro de un año va a ser de $" + valorInflado12.toFixed(2))
                }else{
                    alert("El valor total de su producto + IVA es: $" + valorTota.toFixed(2) + " y no te conviene pagar en cuotas porque el valor dentro de un año 6 meseser de $" + valorInflado12.toFixed(2))
                }
                break;
            default:
                alert("Debe ingresar una opcion válida.");
                alert("Recargue para comenzar devuelta.");
                break;
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
//===================================================================================================
//Funcion para organizador de torneos

//Editar El nombre del torneo
const tituloElemento = document.getElementById("titulo");
const botonEdicion = document.getElementById("botonEdicion");
const formularioEdicion = document.getElementById("formularioEdicion");
const inputTitulo = document.getElementById("inputTitulo");

botonEdicion.addEventListener("click", function() {
  tituloElemento.style.display = "none";
  formularioEdicion.style.display = "block";
  inputTitulo.focus();
});

formularioEdicion.addEventListener("submit", function(event) {
  event.preventDefault();
  tituloElemento.innerText = inputTitulo.value.trim();
  tituloElemento.style.display = "flex";
  formularioEdicion.style.display = "none";
});

  //Agregar y Clasificar los equipos ingresados
  let equipos = [];

  let nameTorneo = "HACE TU PROPIO TORNEO";
  let isRunning = true;
  
  class Club {
    constructor(name, puntos) {
      this.name = name;
      this.puntos = puntos;
    }
  }
  
  const formEquipos = document.querySelector("#formEquipos");
  const listaEquipos = document.querySelector("#listaEquipos");
  const agregar = document.querySelector("#agregar");
  const equiposHidden = document.querySelector("#equiposHidden");
  const casillaEquipos = document.querySelector("#casillaEquipos");
  
  formEquipos.addEventListener("submit", pedirEquipos);
  let contadorE = 1;

  function pedirEquipos(e) {
    e.preventDefault();
  
    let name = document.querySelector("#equipo").value;
    let puntos = parseInt(document.querySelector("#puntos").value);
  
    if (name === "" || isNaN(puntos)) {
      alert("No ingresaste un dato válido");
    } else {
      let equipo = new Club(name, puntos);
      equipos.push(equipo);
  
      // Almacenar los equipos en el local Storage
      localStorage.setItem("equipos", JSON.stringify(equipos));
      const equiposGuardados = JSON.parse(localStorage.getItem("equipos"));
      console.log(equiposGuardados);
  
      // Agregar el equipo a la tabla
      const tablaEquipos = document.querySelector(".tablaEquipos tbody");
      const nuevaFila = document.createElement("tr");
  
      nuevaFila.classList.add(`equipo-${contadorE}`);
      nuevaFila.innerHTML = `
        <td>${equipos.length}</td>
        <td>${equipo.name}</td>
        <td><input type="number" class="inputPuntos" value="${equipo.puntos}" /></td>
        <td><button class="eliminarEquipo botonEliminarEquipos">x</button></td>
      `;
      tablaEquipos.appendChild(nuevaFila);
      contadorE++;
  
      // Asignar evento de eliminar al botón de este equipo
      const eliminarEquipo = nuevaFila.querySelector(".eliminarEquipo");
      eliminarEquipo.addEventListener("click", deleteEquipo);
    }
    formEquipos.reset();
  }
  
  function deleteEquipo() {
    // Obtener el índice del equipo a eliminar
    const equipoIndex = parseInt(this.parentNode.parentNode.classList[0].split("-")[1]);
  
    // Eliminar el equipo del arreglo
    let equipoEliminado = equipos.splice(equipoIndex - 1, 1)[0];
  
    // Actualizar la tabla de posiciones
    actualizarTablaPosiciones();
  }

    function actualizarTablaPosiciones(){
        const tablaEquipos = document.querySelector(".tablaEquipos tbody");

        while (tablaEquipos.firstChild){
        tablaEquipos.removeChild(tablaEquipos.firstChild);
        }

        equipos.forEach((equipo, index)=>{
            const nuevaFila = document.createElement("tr");

            nuevaFila.classList.add(`equipo-${index+1}`);
            nuevaFila.innerHTML = `
                <td>${index +1}</td>
                <td>${equipo.name}</td>
                <td><input type="number" class="inputPuntos" value="${equipo.puntos}" /></td>
                <td><button class="eliminarEquipo botonEliminarEquipos">x</button></td>
            `;
            tablaEquipos.appendChild(nuevaFila);


        const eliminarEquipo = nuevaFila.querySelector(".eliminarEquipo");
        eliminarEquipo.addEventListener('click', deleteEquipo);
    })}
  
 



  
//===================================================================================================
//===================================================================================================
  //Editar la Tabla creada
 // Editar la Tabla creada
const botonEditarTabla = document.querySelector('#editarTabla');
botonEditarTabla.addEventListener('click', editarTabla);

function editarTabla() {
    const filasEquipos = document.querySelectorAll('#tablaPosiciones tbody tr');
  
    filasEquipos.forEach(fila => {
      const celdaEquipo = fila.querySelector('td:nth-child(2)');
      const nombreEquipo = celdaEquipo.textContent;
  
      const inputEquipo = document.createElement('input');
      inputEquipo.type = 'text';
      inputEquipo.value = nombreEquipo;
  
      celdaEquipo.textContent = '';
      celdaEquipo.appendChild(inputEquipo);
    });
  
    const botonGuardar = document.createElement('button');
    botonGuardar.textContent = 'Guardar';
    botonGuardar.onclick = guardarCambios;
  
    const celdaBoton = document.querySelector('#editarTabla');
    celdaBoton.textContent = '';
    celdaBoton.appendChild(botonGuardar);
  }
  
  function guardarCambios() {
    const filasEquipos = document.querySelectorAll('#tablaPosiciones tbody tr');
  
    filasEquipos.forEach(fila => {
      const celdaEquipo = fila.querySelector('td:nth-child(2)');
      const inputEquipo = celdaEquipo.querySelector('input');
  
      const nuevoNombreEquipo = inputEquipo.value;
  
      celdaEquipo.textContent = nuevoNombreEquipo;
    });
  
    const botonEditar = document.createElement('button');
    botonEditar.textContent = 'Editar';
    botonEditar.onclick = editarTabla;
  
    const celdaBoton = document.querySelector('#editarTabla');
    celdaBoton.textContent = '';
    celdaBoton.appendChild(botonEditar);
  }
  



//===================================================================================================
//===================================================================================================
//Local Storage y Json

if (typeof (Storage) != `undefined`){
console.log(Storage);

localStorage.setItem("equipos", equipos);

} else{
    alert("storage no es compatible en este navegador");
}


/*
localStorage.setItem('equipos', JSON.stringify(equipos));
localStorage.setItem('tituloElemento', tituloElemento.innerText);

const equiposGuardados = JSON.parse(localStorage.getItem('equipos'));
const tituloElementoGuardado = localStorage.getItem('tituloElemento');

console.log(equiposGuardados);
console.log(tituloElementoGuardado);












function eliminarEquipo() {
    let division = prompt("Ingresa la división del equipo que deseas eliminar -Primera o Segunda- : ");

    let equipoArray = (division.toLowerCase() === "primera") ? primeraArr : segundaArr;

    if (equipoArray.length === 0) {
        alert("No hay equipos en la división especificada");
        return;
    }

    let opciones = "";
    for (let i = 0; i < equipoArray.length; i++) {
        opciones += `${i + 1}. ${equipoArray[i].name}\n`;
    }

    let equipoIndex = parseInt(prompt(`Elige el número del equipo que deseas eliminar:\n${opciones}`));
    if (isNaN(equipoIndex) || equipoIndex < 1 || equipoIndex > equipoArray.length) {
        alert("Opción inválida");
        return;
    }

    let equipoEliminado = equipos.splice(equipoIndex - 1, 1)[0];
    alert(`Se ha eliminado el equipo "${equipoEliminado.name}" de la división "${equipoEliminado.division}"`);
}


function verClubesOrdenados() {
    let todosClubes = [...equipos];
    todosClubes.sort((a) => a.name.localeCompare(b.name));

    let listaClubes = "Lista de Clubes Ordenados Alfabéticamente:\n\n";
    todosClubes.forEach((equipo, index) => {
        listaClubes += `${index + 1}. ${equipo.name}\n`;
    });

    alert(listaClubes);
}


function verTablaPosiciones() {
    let Posiciones = equipos.slice().sort((a, b) => b.puntos - a.puntos);
  
    let tablaPosiciones = "Tabla de Posiciones - Primera División:\n";
    tablaPosiciones += "===================================\n";
    Posiciones.forEach((equipo, index) => {
      tablaPosiciones += `${index + 1}. ${equipo.name} - Puntos: ${equipo.puntos}\n`;
    });
  
    alert(tablaPosiciones);
};
  


function actualizarPuntajes() {
    let todosClubes = [...primeraArr, ...segundaArr];
  
    todosClubes.forEach((equipo, index) => {
      let nuevoPuntaje = parseInt(prompt(`Ingresa el nuevo puntaje para ${equipo.name}:`));
      if (!isNaN(nuevoPuntaje)) {
        equipo.puntos = nuevoPuntaje;
      }
    });
  
    let listaClubes = "Puntajes Actualizados:\n\n";
    todosClubes.forEach((equipo, index) => {
      listaClubes += `${index + 1}. ${equipo.name} - Puntos: ${equipo.puntos}\n`;
    });
  
    alert(listaClubes);
  }
  

  function sortearPartidos() {
    if (primeraArr.length < 2 || segundaArr.length < 2) {
      alert("No hay suficientes equipos para sortear los partidos.");
      return;
    }
  
    let partidosPrimera = generarPartidos(primeraArr);
    let partidosSegunda = generarPartidos(segundaArr);
  
    let todosPartidos = [...partidosPrimera, ...partidosSegunda];
  
    alert(`Partidos de la fecha:\n\n${todosPartidos.join("\n")}`);
  }
  
  function generarPartidos(equipos) {
    let partidos = [];
    let equiposRestantes = equipos.slice();
  
    while (equiposRestantes.length > 1) {
      let equipoLocal = equiposRestantes.shift();
  
      equiposRestantes.forEach((equipoVisitante) => {
        let partido = `${equipoLocal.name} vs ${equipoVisitante.name}`;
        partidos.push(partido);
      });
    }
  
    return partidos;
  }
  
  
  

  


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

