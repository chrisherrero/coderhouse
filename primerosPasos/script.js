/*
console.log("el script funciona bien papu");

let titulo = document.getElementById("titulo");
titulo.textContent = "ahora se tiene que hacer algo mas";

const numero = 24;
string = "casita";
Boolean = true

if (Boolean) {
    console.log("es verdadero");
}
console.log("numero: ", numero);
console.log("string: ", string);

let calificacion = 30;

if (calificacion >= 90) {
    console.log("Excelente");
} else if (calificacion >= 70) {
    console.log("Bueno");
} else {
    console.log("Necesitas estudiar más");
}

let edad = 15;
let acceso = (edad >= 18) && (edad <= 30);
console.log(acceso); // true si la edad está entre 18 y 30

for (let i = 0; i <= 5; i++) {
    console.log('Número: ' + i);
}

//for suele hacerse todo junto, while se suele hacer en varias líneas

let i= 0;
while (i <= 5) {
    console.log('Número: ' + i);
    i++;
}

//do while asegura que el ciclo se cumpla al menos una vez

let j = 0;
do {
    console.log('Número: ' + j);
    j++;
}while (j <= 5);


let edad2 = 20 ;

if (edad2 >= 18) {
  console.log("Eres mayor de edad");
} else {
  console.log("Eres menor de edad");
}

let edad3 = null;
let nombre = "Carlos";

if (edad3 !== null && edad3 !== undefined) {
  console.log(`Tienes ${edad3} años`);
} else {
  if (nombre) {
    console.log(`Bienvenido, ${nombre}`);
  } else {
    console.log("Información incompleta");
  }
}

//en este caso no hay edad por lo que pasa a definir el nombre en el log

let valor1 = 0;
let resultadoOR = valor1 || "Valor predeterminado";

console.log(resultadoOR); // "Valor predeterminado"

//este valor regresa el valor1 solo si no es nulo o 0, sino hace el segundo

let valor2 = null;
let resultadoNullish = valor2 ?? "Valor predeterminado";

console.log(resultadoNullish); // 0

//este regresa el valor aun si es 0 , solo lleva al segundo si es nulo o undefined

let nomvre = prompt("¿Cuál es tu nombre?").toLowerCase(); 

switch (nomvre) {
    case "carlos":
        alert("Hola Carlos, bienvenido");
        break;
    case "maria":
        alert("Hola Maria, bienvenido");
        break;
    case "juan":
        alert("Hola Juan, bienvenido");
        break;
    default:
        alert("Nombre no reconocido");
} 

//ciclo witch con un mensaje, a traves del prompt. el alert lleva una ventana de aviso

*/
/*let quiere = confirm("¿queres un caramelo?");
contador = 0;
while (quiere) {
    contador++;
    alert("¡Aca tienes un caramelo!");
    alert("caramelos actuales: " + contador);
    quiere = confirm("¿Querés otro caramelo?");
} 
    alert("oki chau");
*/
/*
function saludar (){
    let nombre = prompt("¿Cuál es tu nombre?");
    if (nombre) {
        alert("Hola " + nombre + ", bienvenido");
    } else {
        alert("Hola, bienvenido anónimo");
    }
}

console.log(saludar());


function saludar(nombre) {
    console.log(`Hola, ${nombre}`);
}

saludar ("Carlos"); 
saludar ("Maria");
saludar ("Juan");

function calcularPrecioFinal(precio, descuento) {
    return precio - (precio * descuento / 100);
}

// Reutilizando la función en diferentes contextos
let precioCamisa = calcularPrecioFinal(50, 10);
let precioPantalon = calcularPrecioFinal(80, 15);

console.log(`Precio final de la camisa: ${precioCamisa}`);
console.log(`Precio final del pantalón: ${precioPantalon}`);

function calcularDescuento(precio, porcentajeDescuento) {
    return precio - (precio * porcentajeDescuento / 100);
}

// Función para calcular el precio final incluyendo impuestos
function calcularPrecioFinal(precio, descuento, impuesto) {
    let precioConDescuento = calcularDescuento(precio, descuento);
    return precioConDescuento + (precioConDescuento * impuesto / 100);
}

// Invocación
let total = calcularPrecioFinal(100, 10, 21);
console.log(total); // Muestra: 98.9

function devolverLibro(titulo, diasRetraso = 0) {
    const multa = diasRetraso * 0.50;
    const mensaje = diasRetraso > 0 
        ? `Devuelto con ${diasRetraso} días de retraso. Multa: $${multa}` //parece que esto muestra el mensaje si se cumple el retraso
        : "Devuelto a tiempo. No hay multa."; //y este si no hay retraso
    console.log(`Libro "${titulo}": ${mensaje}`);//mensaje de la consola
}

devolverLibro("El Principito");
// Muestra: Libro "El Principito": Devuelto a tiempo. No hay multa.

devolverLibro("El Principito", 3);
// Muestra: Libro "El Principito": Devuelto con 3 días de retraso. Multa: $1.5.

const suma = function(a, b) { // Función anónima asignada a una variable
    return a + b;
};
console.log(suma(5, 3)); // Salida: 8

const suma2 = (a, b) => a + b; // Función flecha
console.log(suma(5, 3)); // Salida: 8

const suma3 = a => a + 5; // Función flecha con un solo parámetro
console.log(suma3(5)); // Salida: 10

*/




alert("¿Qué edad tendrás en 2050?");

function edad(edadActual) {
    return parseInt(edadActual) + 25;
}

let edadActual = prompt("Ingrese su edad");

alert("En 2050 tendrás " + edad(edadActual) + " años");




