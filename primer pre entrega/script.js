// Array para almacenar los libros
const libros = 
[
    { 
    titulo: "Nada", 
    autor: "Teller, Jane", 
    genero: "Ficcion" 
    },
    { 
    titulo: "1984", 
    autor: "Orwell, George", 
    genero: "Ciencia Ficcion" 
    },
    {
    titulo: "El Principito", 
    autor: "Saint-Exupéry, Antoine de", 
    genero: "Literatura Infantil" 
    },
    { 
    titulo: "Rebelion en la granja", 
    autor: "Orwell, George", 
    genero: "Ficcion" 
    },
];

// llamado a la funcion para agregar un libro al repositorio
function agregarAlRepositorio(libro, repositorio) 
{
    repositorio.push(libro); // Agrega el libro al array
    return repositorio; // Devuelve el array actualizado
}

libros.sort((a, b) => a.autor.localeCompare(b.autor)); // Ordena el array de libros por autor al inicio

// Función para mostrar el menú principal
function mostrarMenu() 

{
    let continuar = true;
    alert("Bienvenido al repositorio de libros. Aquí puede buscar, agregar y ver libros disponibles.");
    while (continuar) 
    {
        const opcion = parseInt(prompt(
            "Ingrese: \n 1 - Buscar Libro.\n 2 - Mostrar Lista Completa de Libros.\n 3 - Agregar un Libro \n 4 - Salir"))
        if (isNaN(opcion) || opcion < 1 || opcion > 4) 
        {
            alert("Por favor, ingrese una opción válida (1-4)."); // operacion no valida
            continue;
        }

        switch (opcion) 
        {
            case 1:
                buscarLibro();
                break;
            case 2:
                mostrarLibros();
                break;
            case 3:
                agregarLibro();
                break;
            case 4:
                alert("Gracias por usar el repositorio de libros. ¡Hasta pronto!");
                continuar = false;
                break;
        }
    }
}

// Función para buscar libros por criterio
function buscarLibro() 
{
    const criterio = parseInt(prompt("Buscar por: \n 1 - Título\n 2 - Autor\n 3 - Género\n 4 - Volver al menú principal"));
        if (isNaN(criterio) || criterio < 1 || criterio > 4) //criterio no valido
        {
            alert("Por favor, ingrese una opción válida (1-4).");
            buscarLibro(); // Vuelve a llamar a la función si la opción es inválida
            return;
        }
    let resultado = [];
    switch (criterio) 
    {
        case 1:
            var titulo = prompt("Ingrese el título del libro:");
            if (titulo === null) // Verifica si el usuario canceló la entrada
            { 
                alert("Operación cancelada.");
                return;
            }
            titulo = titulo.trim().toLowerCase();
            resultado = libros.filter(libro => libro.titulo.toLowerCase().includes(titulo));
            break;
        case 2:
            var autor = prompt("Ingrese el autor del libro:");
            if (autor === null) // Verifica si el usuario canceló la entrada
            { 
                alert("Operación cancelada.");
                return;
            }
            autor = autor.trim().toLowerCase();
            resultado = libros.filter(libro => libro.autor.toLowerCase().includes(autor));
            break;
        case 3:
            var genero = prompt("Ingrese el género del libro:");
            if (genero === null) // Verifica si el usuario canceló la entrada
            { 
                alert("Operación cancelada.");
                return;
            }
            genero = genero.trim().toLowerCase();
            resultado = libros.filter(libro => libro.genero.toLowerCase().includes(genero));
            break;
        case 4:
            return;
    }

    if (resultado.length > 0) //para devolver los resultados de la busqueda
    {
        // libros.sort((a, b) => a.autor.localeCompare(b.autor)); // Ordena los resultados por autor
        let mensaje = "Resultados de la búsqueda:\n";
        resultado.forEach(libro => 
        {
            mensaje += `${libro.titulo} - ${libro.autor} (${libro.genero})\n`;
        });
        alert(mensaje);
        buscarLibro(); // Vuelve a llamar a la función para permitir otra búsqueda, facilitando la navegacion y no teniendo que volver al menu principal
    } 
    else 
    {
        alert("No se encontraron libros con ese criterio.");
        buscarLibro(); // Vuelve a llamar a la función si no se encuentran resultados, facilitando la navegacion y no teniendo que volver al menu principal
    }
}

// Función para mostrar todos los libros
function mostrarLibros() 
{
    if (libros.length > 0) {
        let mensaje = "Lista completa de libros:\n";
        libros.forEach((libro, index) => 
            {
            mensaje += `${index + 1}. ${libro.titulo} - ${libro.autor} (${libro.genero})\n`;
            });
        alert(mensaje);
    } 
    else 
    {
        alert("No hay libros en el repositorio."); //mensaje si no hay libros
    }
}

// Función para agregar un libro
function agregarLibro() 
{
    alert("Para poder tener un repositorio ordenado, considere que tanto en los campos de título, autores y género empiezan con mayuscula, y que el autor se escribe en el formato 'Apellido, Nombre'.");
    const titulo = prompt("Ingrese el título del libro:");
        if (titulo === null)  // Verifica si el usuario canceló la entrada
            {
            alert("Operación cancelada.");
            return;
            }

    const autor = prompt("Ingrese el autor del libro:");
        if (autor === null) // Verifica si el usuario canceló la entrada
            {
            alert("Operación cancelada.");
            return;
            }

    const genero = prompt("Ingrese el género del libro:");
        if (genero === null) // Verifica si el usuario canceló la entrada
            {
            alert("Operación cancelada.");
            return;
            }

    if (titulo && autor && genero) //condicion para que se agregue el libro
    { 
        const nuevoLibro = { titulo, autor, genero };
        const libroExistente = libros.find(libro => // Verifica si el libro ya existe
            libro.titulo.toLowerCase() === nuevoLibro.titulo.toLowerCase() &&
            libro.autor.toLowerCase() === nuevoLibro.autor.toLowerCase() &&
            libro.genero.toLowerCase() === nuevoLibro.genero.toLowerCase()
        );
        if (libroExistente) 
        {
            alert("El libro ya existe en el repositorio.");
            return; // Sale de la función si el libro ya existe
        }
        confirmacion = confirm(`¿Está seguro de que desea agregar el libro ${nuevoLibro.titulo} de ${nuevoLibro.autor} (${nuevoLibro.genero})?`); //consulta si esta seguro de agregar el libro
            if (!confirmacion) //negativa
            {
                alert("El libro no fue agregado al repositorio.");
                return; // Sale de la función si el usuario cancela
            }
            else
            {
                const librosActualizados = agregarAlRepositorio(nuevoLibro, libros); //funcion agregar el libro con return mas abajo
                libros.sort((a, b) => a.autor.localeCompare(b.autor)); // Ordena el repositorio por autor
                alert("Libro agregado con éxito. Ahora hay " + librosActualizados.length + " libros en el repositorio.");
            }
    } 
    else 
    { 
        alert("Todos los campos son obligatorios."); //mensaje si no estan todos los campos
    }
}




mostrarMenu();