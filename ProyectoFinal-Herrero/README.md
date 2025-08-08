
# Repositorio de Libros 📚

Este proyecto es un simulador de préstamos de libros desarrollado como entrega final del curso de JavaScript de Coderhouse.

## 🎯 Objetivo

El sistema permite agregar libros a un repositorio, buscarlos por título, autor o género, seleccionar libros para préstamo y confirmar el préstamo ingresando el nombre del usuario. Toda la lógica se gestiona mediante JavaScript y se almacena la información utilizando `localStorage`. Se utilizan eventos del DOM, asincronía y la librería SweetAlert2 para notificaciones interactivas.

## ⚙️ Funcionalidades

- Agregar nuevos libros con título, autor y género.
- Buscar libros dinámicamente.
- Agregar libros al carrito de préstamo.
- Quitar libros del carrito.
- Confirmar el préstamo ingresando el nombre del usuario.
- Visual feedback mediante SweetAlert2.
- Almacenamiento persistente en `localStorage`.
- Carga inicial de libros desde archivo `libros.json` mediante `fetch()`.

## 🧰 Tecnologías y herramientas utilizadas

- HTML5
- CSS3
- JavaScript (ES6)
- SweetAlert2 (https://sweetalert2.github.io/)
- JSON (para datos locales)
- `localStorage` para persistencia

## 📁 Estructura de Archivos

```
/index.html
/css/style.css
/js/main.js
/data/libros.json
/README.md
```

## ✅ Requisitos del proyecto (cumplidos)

- Uso de DOM y eventos ✔️
- Fetch + JSON ✔️
- Librería externa (SweetAlert2) ✔️
- localStorage ✔️
- Interfaz 100% interactiva, sin uso de consola ✔️
- Código legible y comentado ✔️

## 🙋 Autor

Christian Herrero  
Proyecto original para el curso de JavaScript - Coderhouse (2025)
