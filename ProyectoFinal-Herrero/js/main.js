// Clase Libro para representar cada libro individualmente
class Libro {
    constructor(titulo, autor, genero) {
        this.titulo = titulo;
        this.autor = autor;
        this.genero = genero;
        this.prestado = false;
    }
}
//arrary principal de los libros
let libros = [];

// Carrito de libros seleccionados, cargado desde localStorage si existe
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Referencias al DOM
const listaLibros = document.getElementById("lista-libros");
const carritoDOM = document.getElementById("carrito");
const finalizar = document.getElementById("finalizar");
const mensajeDOM = document.getElementById("mensajeConfirmacion");
const nombreUsuarioInput = document.getElementById("nombreUsuario");
const buscador = document.getElementById("buscador");
const formularioLibro = document.getElementById("formulario-libro");

// Guarda el array de libros en localStorage
function guardarLibros() {
    localStorage.setItem("libros", JSON.stringify(libros));
}

// Guarda el carrito en localStorage
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Renderiza la lista de libros disponibles, con un filtro opcional
function renderLibros(filtro = "") {
    listaLibros.innerHTML = "";

    let filtrados = libros.filter(libro => {
        return (
        libro.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
        libro.autor.toLowerCase().includes(filtro.toLowerCase()) ||
        libro.genero.toLowerCase().includes(filtro.toLowerCase())
        );
    });

    // Crea los elementos de la lista de libros
    filtrados.forEach((libro, index) => {
    const item = document.createElement("li");
    item.innerHTML = `
        <div class="info-libro">
            <strong>${libro.titulo}</strong> - ${libro.autor} (${libro.genero})
            ${libro.prestado ? '<span class="prestado-msg">(Ya has pedido este libro)</span>' : ''}
        </div>
        <button data-index="${index}" class="agregar">Agregar al carrito</button>
    `;
    listaLibros.appendChild(item);
});

    agregarListeners();
    }

    // Agrega listeners a los botones "Agregar al carrito"
    function agregarListeners() {
    const botones = document.querySelectorAll(".agregar");
    botones.forEach(boton => {
        boton.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        const libro = libros[index];
        
        // Solo se agrega si no está ya en el carrito
        if (!carrito.includes(libro)) {
            carrito.push(libro);
            guardarCarrito();
            renderCarrito();
            Swal.fire("Agregado", `"${libro.titulo}" fue agregado al carrito.`, "success");
        }
        });
    });
    }

    // Renderiza los libros que están en el carrito
    function renderCarrito() {
        carritoDOM.innerHTML = "";

        carrito.forEach((libro, index) => {
            const item = document.createElement("li");
            item.innerHTML = `
            ${libro.titulo} - ${libro.autor}
            <button class="quitar" data-index="${index}">Quitar</button>
            `;
            carritoDOM.appendChild(item);
        });

    // Agrega listeners para quitar libros del carrito
    const quitarBotones = document.querySelectorAll(".quitar");
    quitarBotones.forEach(boton => {
        boton.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        const libroQuitado = carrito.splice(index, 1)[0];
        guardarCarrito();
        renderCarrito();
        Swal.fire("Eliminado", `"${libroQuitado.titulo}" fue quitado del carrito.`, "info");
        });
    });
    }

    // Finaliza el préstamo de libros y vacía el carrito
    finalizar.addEventListener("click", () => {
    const nombre = nombreUsuarioInput.value.trim();

    if (nombre === "") {
        mensajeDOM.textContent = "Por favor, ingresá tu nombre para finalizar el préstamo.";
        mensajeDOM.style.color = "red";
        return;
    }

    // Marca los libros como prestados
    carrito.forEach(libro => {
        libro.prestado = true;
    });

    guardarLibros();
    carrito = [];
    guardarCarrito();
    renderLibros();
    renderCarrito();

    Swal.fire("¡Préstamo finalizado!", `Gracias ${nombre}, los libros han sido prestados con éxito.`, "success");
    });

    // Filtra los libros mientras se escribe en el input del buscador
    buscador.addEventListener("input", () => {
        renderLibros(buscador.value);
    });

    // Agrega un nuevo libro desde el formulario
    formularioLibro.addEventListener("submit", (e) => {
    e.preventDefault();
    const titulo = document.getElementById("titulo").value.trim();
    const autor = document.getElementById("autor").value.trim();
    const genero = document.getElementById("genero").value.trim();

    if (!titulo || !autor || !genero) {
        Swal.fire("Error", "Todos los campos son obligatorios.", "error");
        return;
    }

    // Verifica si el libro ya existe en la lista
    const nuevoLibro = new Libro(titulo, autor, genero);
    const existe = libros.some(libro =>
        libro.titulo.toLowerCase() === titulo.toLowerCase() &&
        libro.autor.toLowerCase() === autor.toLowerCase()
    );

    if (existe) {
        Swal.fire("Repetido", "El libro ya existe en el repositorio.", "warning");
        return;
    }

    // Confirmación antes de agregar
    Swal.fire({
        title: "¿Confirmar?",
        text: `¿Deseás agregar "${titulo}" de ${autor}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, agregar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
        libros.push(nuevoLibro);
        guardarLibros();
        renderLibros();
        formularioLibro.reset();
        Swal.fire("Agregado", "El libro fue agregado con éxito.", "success");
        }
    });
    });

    // Carga los libros desde localStorage o desde archivo JSON si es la primera vez
    async function cargarLibros() {
    const guardados = localStorage.getItem("libros");
    if (guardados) {
        libros = JSON.parse(guardados);
    } else {
        const res = await fetch("./data/libros.json");
        const data = await res.json();
        libros = data.map(libro => new Libro(libro.titulo, libro.autor, libro.genero));
        guardarLibros();
    }
    renderLibros();
    renderCarrito();
    }
    
    // Inicializa la app
    cargarLibros();
