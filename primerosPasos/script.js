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
let quiere = confirm("¿queres un caramelo?");
contador = 0;
while (quiere) {
    contador++;
    alert("¡Aca tienes un caramelo!");
    alert("caramelos actuales: " + contador);
    quiere = confirm("¿Querés otro caramelo?");
} 
    alert("oki chau");

