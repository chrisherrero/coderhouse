// Clase para los libros
class Libro {
    constructor(titulo, autor, genero) {
        this.titulo = titulo;
        this.autor = autor;
        this.genero = genero;
        this.prestado = false;
    }
}

// Inicialización desde localStorage o carga inicial
let libros = JSON.parse(localStorage.getItem("libros")) || [
    new Libro("Nada", "Teller, Jane", "Ficcion"),
    new Libro("1984", "Orwell, George", "Ciencia Ficcion"),
    new Libro("El Principito", "Saint-Exupéry, Antoine de", "Literatura Infantil"),
    new Libro("Rebelion en la granja", "Orwell, George", "Ficcion")
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const listaLibros = document.getElementById("lista-libros");
const carritoDOM = document.getElementById("carrito");
const finalizar = document.getElementById("finalizar");
const mensajeDOM = document.getElementById("mensajeConfirmacion");
const nombreUsuarioInput = document.getElementById("nombreUsuario");

function guardarLibros() {
    localStorage.setItem("libros", JSON.stringify(libros));
}

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function renderLibros() {
    listaLibros.innerHTML = "";
    libros.forEach((libro, index) => {
        const item = document.createElement("li");

        if (libro.prestado) {
            item.innerHTML = `<strong>${libro.titulo}</strong> - ${libro.autor} (${libro.genero}) <span style="color: gray;">(libro ya leído)</span>`;
        } else {
            item.innerHTML = `<strong>${libro.titulo}</strong> - ${libro.autor} (${libro.genero}) 
                <button data-index="${index}" class="agregar">Agregar al carrito</button>`;
        }

        listaLibros.appendChild(item);
    });
    agregarListeners();
}

function agregarListeners() {
    const botones = document.querySelectorAll(".agregar");
    botones.forEach(boton => {
        boton.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            const libro = libros[index];
            if (!carrito.includes(libro)) {
                carrito.push(libro);
                guardarCarrito();
                renderCarrito();
            }
        });
    });
}

function renderCarrito() {
    carritoDOM.innerHTML = "";
    carrito.forEach((libro) => {
        const item = document.createElement("li");
        item.textContent = `${libro.titulo} - ${libro.autor}`;
        carritoDOM.appendChild(item);
    });
}

finalizar.addEventListener("click", () => {
    const nombre = nombreUsuarioInput.value.trim();

    if (nombre === "") {
        mensajeDOM.textContent = "Por favor, ingresá tu nombre para finalizar el préstamo.";
        mensajeDOM.style.color = "red";
        return;
    }

    carrito.forEach(libro => {
        libro.prestado = true;
    });

    guardarLibros();
    carrito = [];
    guardarCarrito();
    renderLibros();
    renderCarrito();

    mensajeDOM.textContent = `Gracias ${nombre}, los libros han sido prestados con éxito.`;
    mensajeDOM.style.color = "green";
});

renderLibros();
renderCarrito();
