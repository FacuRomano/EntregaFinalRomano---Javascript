const tituloElemento = document.getElementById("titulo");
const botonEdicion = document.getElementById("botonEdicion");
const formularioEdicion = document.getElementById("formularioEdicion");
const inputTitulo = document.getElementById("inputTitulo");

// Obtener de Local Storage (si existe)
const tituloGuardado = localStorage.getItem("titulo");

if (tituloGuardado) {
    tituloElemento.innerText = tituloGuardado;
}

botonEdicion.addEventListener("click", function() {
    tituloElemento.style.display = "none";
    formularioEdicion.style.display = "block";
    inputTitulo.focus();
});

formularioEdicion.addEventListener("submit", function(event) {
    event.preventDefault();
    const nuevoTitulo = inputTitulo.value.trim();
    tituloElemento.innerText = nuevoTitulo;
    tituloElemento.style.display = "flex";
    formularioEdicion.style.display = "none";

    // Almacenar el nuevo título en el Local Storage
    localStorage.setItem("titulo", nuevoTitulo);
});

//===================================================================================================
//===================================================================================================
// Agregar y Clasificar los equipos ingresados

let equipos = [];
let isRunning = true;

class Club {
  constructor(id, name, puntos) {
    this.id = id;
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

const tablaEquipos = document.querySelector(".tablaEquipos tbody");

//===================================================================================================
//===================================================================================================
// Almacenar en local Storage y JSON

const equiposGuardados = JSON.parse(localStorage.getItem("equipos"));

// Verificar los equipos y el array
if (equiposGuardados && Array.isArray(equiposGuardados)) {
  equipos = equiposGuardados;
  actualizarTablaPosiciones();
  // Actualizar el contador
  contadorE = equipos.length + 1;
}

//===================================================================================================
//===================================================================================================
// Actualizar Tabla

function actualizarTablaPosiciones() {
  while (tablaEquipos.firstChild) {
    tablaEquipos.removeChild(tablaEquipos.firstChild);
  }

  // Ordenar los equipos por puntos de mayor a menor
  const equiposOrdenados = equipos.slice().sort((a, b) => b.puntos - a.puntos);

  equiposOrdenados.forEach((equipo, index) => {
    agregarEquipoATabla(equipo, index + 1);
  });
}

function agregarEquipoATabla(equipo, index) {
  const nuevaFila = document.createElement("tr");

  nuevaFila.dataset.equipoId = equipo.id;
  nuevaFila.classList.add(`equipo-${equipo.id}`, "equipoDes");
  nuevaFila.innerHTML = `
    <td>${index}</td>
    <td>${equipo.name}</td>
    <td>${equipo.puntos}</td>
    <td><button class="botonE eliminarEquipo botonEliminarEquipos">x</button></td>
  `;
  tablaEquipos.appendChild(nuevaFila);

  const eliminarEquipo = nuevaFila.querySelector(".eliminarEquipo");
  eliminarEquipo.addEventListener("click", () => eliminarEquipoTabla(equipo.id));
}

function guardarEquiposEnLocalStorage() {
  if (typeof Storage !== "undefined") {
    const equiposJSON = JSON.stringify(equipos);
    localStorage.setItem("equipos", equiposJSON);
  } else {
    alert("El almacenamiento local no es compatible en este navegador");
  }
}

//===================================================================================================
//===================================================================================================
// Generar cruces en formato LIGA por fechas

function generarCrucesPorFase(equiposDisponibles, crucesAnteriores) {
  const crucesFase = [];
  const equipos = equiposDisponibles.slice();

  while (equipos.length > 1) {
    const equipo1 = equipos.shift();

    const equipo2 = encontrarEquipoCruce(equipo1, equipos, crucesAnteriores);
    if (equipo2) {
      const cruce = {
        equipo1,
        equipo2
      };
      crucesFase.push(cruce);
      equipos.splice(equipos.indexOf(equipo2), 1);
    }
  }

  return crucesFase;
}

function encontrarEquipoCruce(equipo, equipos, crucesAnteriores) {
  const equiposDisponibles = equipos.filter(e => !seEnfrentaronAnteriormente({ equipo1: equipo, equipo2: e }, crucesAnteriores));

  if (equiposDisponibles.length === 0) {
    return null;
  }

  const indiceAleatorio = Math.floor(Math.random() * equiposDisponibles.length);
  return equiposDisponibles[indiceAleatorio];
}


function seEnfrentaronAnteriormente(cruce, crucesAnteriores) {
  for (const cruceAnterior of crucesAnteriores) {
    if (
      (cruceAnterior.equipo1 === cruce.equipo1 && cruceAnterior.equipo2 === cruce.equipo2) ||
      (cruceAnterior.equipo1 === cruce.equipo2 && cruceAnterior.equipo2 === cruce.equipo1)
    ) {
      return true;
    }
  }

  return false;
}

function generarFases(equipos) {
  const fases = [];
  const totalEquipos = equipos.length;
  const crucesAnteriores = [];

  while (crucesAnteriores.length < totalEquipos * (totalEquipos - 1) / 2) {
    const faseActual = generarCrucesPorFase(equipos.slice(), crucesAnteriores);
    fases.push(faseActual);
    crucesAnteriores.push(...faseActual);
  }

  return fases;
}
  
function agregarCrucesDelTorneo() {
  const equipos = JSON.parse(localStorage.getItem("equipos"));
  
  // Verificar que haya al menos 2 equipos
  if (equipos.length < 2) {
    alert("Debe haber al menos 2 equipos para generar los cruces del torneo.");
    return;
  }
  
  const fases = generarFases(equipos);
  const cruces = fases.flat();
  
  // Mostrar los cruces en la consola
  console.log("Cruces del torneo:");
  cruces.forEach((cruce, index) => {
    console.log(`Cruce ${index + 1}:`);
    console.log(`${cruce.equipo1?.name} vs ${cruce.equipo2?.name}`);
  });
  
  // Obtener el contenedor de los cruces en el HTML
  const contenedorCruces = document.getElementById("casillaEquipos");
  
  // Limpiar el contenido anterior
  contenedorCruces.innerHTML = "";
  
  // Mostrar los cruces por fase en el contenedor
  fases.forEach((fase, index) => {
    const elementoFase = document.createElement("div");
    elementoFase.classList.add("faseTorneo");
    elementoFase.innerHTML = `<h4>Fase ${index + 1}:</h4>`;
  
    const listaCruces = document.createElement("ul");
    listaCruces.classList.add("crucesFase");
  
    fase.forEach((cruce) => {
      const equipo1Name = cruce.equipo1?.name || "Equipo 1";
      const equipo2Name = cruce.equipo2?.name || "Equipo 2";
      const cruceItem = document.createElement("li");
      cruceItem.textContent = `${equipo1Name} vs ${equipo2Name}`;
      listaCruces.appendChild(cruceItem);
    });
  
    elementoFase.appendChild(listaCruces);
    contenedorCruces.appendChild(elementoFase);
  });
  
  // Guardar los cruces en el Local Storage
  const crucesJSON = JSON.stringify(cruces);
  localStorage.setItem("cruces", crucesJSON);
}


 

//===================================================================================================
//===================================================================================================
// Agregar Equipos + Eventos

function pedirEquipos(e) {
  e.preventDefault();

  let name = document.querySelector("#equipo").value;
  let puntos = 0;

  if (name === "" || isNaN(puntos)) {
    alert("No ingresaste un dato válido");
  } else {
    let equipo = new Club(contadorE, name, puntos);
    equipos.push(equipo);

    agregarEquipoATabla(equipo, equipos.length);

    contadorE++;

    // Almacenar equipos en el Local Storage
    guardarEquiposEnLocalStorage();
  }

  formEquipos.reset();
}

function eliminarEquipoTabla(idEquipo) {
  const equipoIndex = equipos.findIndex((equipo) => equipo.id === idEquipo);

  if (equipoIndex !== -1) {
    equipos.splice(equipoIndex, 1);
    actualizarTablaPosiciones();
    guardarEquiposEnLocalStorage();
  } else {
    alert("No se encontró un equipo para eliminar");
  }
}


//===================================================================================================
//===================================================================================================
// Editar la Tabla creada
const eEditarTabla = document.querySelector("#editarTabla button");
ebotonEditarTabla.addEventListener("click", editarTabla);


function editarTabla() {
  const filasEquipos = document.querySelectorAll("#tablaPosiciones tbody tr");

  filasEquipos.forEach(fila => {
      const celdaEquipo = fila.querySelector("td:nth-child(2)");
      const nombreEquipo = celdaEquipo.textContent;

      const inputEquipo = document.createElement("input");
      inputEquipo.classList.add("inputEquipo")
      inputEquipo.type = "text";
      inputEquipo.value = nombreEquipo;

      celdaEquipo.textContent = "";
      celdaEquipo.appendChild(inputEquipo);

      const celdaPuntos = fila.querySelector("td:nth-child(3)");
      const puntosEquipo = celdaPuntos.textContent;

      const inputPuntos = document.createElement("input");
      inputPuntos.type = "number";
      inputPuntos.value = puntosEquipo;
      inputPuntos.classList.add("inputPuntos");

      celdaPuntos.textContent = "";
      celdaPuntos.appendChild(inputPuntos);   
  });

  const celdaBoton = document.querySelector("#editarTabla");
  celdaBoton.innerHTML = ""; // Limpiar el contenido existente

  const botonGuardar = document.createElement("button");
  botonGuardar.textContent = "Guardar";
  botonGuardar.classList.add("boton");
  botonGuardar.addEventListener("click", guardarCambios);
  celdaBoton.appendChild(botonGuardar);
}

function guardarCambios() {
  const filasEquipos = document.querySelectorAll("#tablaPosiciones tbody tr");

  filasEquipos.forEach(fila => {
    const celdaEquipo = fila.querySelector("td:nth-child(2)");
    const inputEquipo = celdaEquipo.querySelector("input");

    const celdaPuntos = fila.querySelector("td:nth-child(3)");
    const inputPuntos = celdaPuntos.querySelector("input");

    const nuevoNombreEquipo = inputEquipo.value;
    const nuevoPuntosEquipo = parseInt(inputPuntos.value);

    const equipoId = fila.dataset.equipoId;
    const equipo = equipos.find(equipo => equipo.id === parseInt(equipoId));
      if (equipo) {
        equipo.name = nuevoNombreEquipo;
        equipo.puntos = nuevoPuntosEquipo;

        celdaEquipo.textContent = nuevoNombreEquipo;
        celdaPuntos.textContent = nuevoPuntosEquipo;
      }
  });

  guardarEquiposEnLocalStorage();

  // Restablecer la tabla a su estado original
  restablecerTabla();

  const celdaBoton = document.querySelector("#editarTabla");
  celdaBoton.innerHTML = ""; // Limpiar el contenido existente

  const botonEditar = document.createElement("button");
  botonEditar.textContent = "Editar";
  botonEditar.classList.add("boton");
  botonEditar.addEventListener("click", editarTabla);
  celdaBoton.appendChild(botonEditar);
}

function restablecerTabla() {
  const filasEquipos = document.querySelectorAll("#tablaPosiciones tbody tr");

  filasEquipos.forEach(fila => {
    const celdaEquipo = fila.querySelector("td:nth-child(2)");
    const nombreEquipo = celdaEquipo.textContent;

    celdaEquipo.innerHTML = nombreEquipo;
  });
  actualizarTablaPosiciones();
}

  
// Agregar el evento de clic al botón de editar inicialmente
const botonEditarTabla = document.querySelector("#editarTabla button");
botonEditarTabla.addEventListener("click", editarTabla);

// Actualizar los equipos en el Local Storage
if (typeof Storage !== "undefined") {
    const equiposJSON = JSON.stringify(equipos);
    localStorage.setItem("equipos", equiposJSON);
} else {
    alert("El almacenamiento local no es compatible en este navegador");
}
 
 








 
 

//
///===================================================================================================
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
//===================================================================================================
//FUNCIONES DE CALCULADORA

//Esta funcion la cree para hacer una calculadora con un switch para elegir que operacion matematica desea hacer el ususario con los numero ingresados
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
//===================================================================================================
//FUNCIONES DE PROMEDIOS


let equipoProm;

function pedirNameEquipo(){

    if(window.location.href.includes("promedio.html")){
        equipoProm = prompt("De qué equipo sos hincha?");
    document.getElementById("equipo").innerHTML = equipoProm;
    }
};


function promediar(){
    let equipoProm;
    let p1 = document.getElementById("pts20").value;
    let p2 = document.getElementById("pts21").value;
    let p3 = document.getElementById("pts22").value;
    let texto = "Puntos"
    let rtdo = (parseFloat(p1)+parseFloat(p2)+parseFloat(p3))/3;
    document.getElementById("promedio").innerHTML = equipoProm + " promedio: " + rtdo.toFixed(2) + texto;
}


//===================================================================================================
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