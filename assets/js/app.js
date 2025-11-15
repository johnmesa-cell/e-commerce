// var, let, const
// "cadenas", 'cadenas', `cadenas ${variable}`
// boleanos: true, false
// 2, 2.1, -2, 2.5
// null, undefined, NaN
// nombre_funcion()=>{}, function()
// new Set, new Map, Array [], Object {}, [...new Set(valores_repetidos)],
// ciclos for, while, for...of, for...in
// if, else if, else, switch
// try, catch, finally
// find, filter, map, reduce


const productosContainer = document.querySelector("#productos-container");
const inputBuscar = document.querySelector("#buscarInput");
let productos = [];
let productosFiltrados = [];

// Función para mostrar productos en el contenedor
function mostrarProductos(lista) {
  productosContainer.innerHTML = "";
  if (lista.length === 0) {
    productosContainer.innerHTML = "<p>No se encontraron productos.</p>";
    return;
  }
  lista.forEach(prod => {
    const prodHTML = `
      <article class="producto-card">
        <img src="${prod.imagen}" alt="${prod.nombre}" />
        <h3>${prod.nombre}</h3>
        <p>${prod.descripcion}</p>
        <p><b>Precio:</b> $${prod.precio.toFixed(2)}</p>
      </article>`;
    productosContainer.insertAdjacentHTML("beforeend", prodHTML);
  });
}

// Cargar datos desde JSON o sessionStorage
function cargarDatos() {
  const dataEnStorage = sessionStorage.getItem("listado_productos");
  if (dataEnStorage) {
    productos = JSON.parse(dataEnStorage);
    productosFiltrados = productos;
    mostrarProductos(productos);
    console.log("Datos cargados desde sessionStorage");
  } else {
    fetch("data.json")
      .then(res => res.json())
      .then(data => {
        productos = data;
        productosFiltrados = data;
        mostrarProductos(data);
        sessionStorage.setItem("listado_productos", JSON.stringify(data));
        console.log("Datos cargados desde archivo JSON");
      })
      .catch(err => console.error("Error al cargar datos:", err));
  }
}

// Filtrar productos por búsqueda y categoría
function filtrarProductos() {
  const texto = inputBuscar.value.toLowerCase();
  const catSeleccionada = document.querySelector(".category.selected").dataset.category;
  productosFiltrados = productos.filter(prod => {
    const coincideCategoria = catSeleccionada === "all" || prod.categoria === catSeleccionada;
    const coincideTexto = prod.nombre.toLowerCase().includes(texto) || prod.descripcion.toLowerCase().includes(texto);
    return coincideCategoria && coincideTexto;
  });
  mostrarProductos(productosFiltrados);
}

document.addEventListener("DOMContentLoaded", () => {
  cargarDatos();

  inputBuscar.addEventListener("input", () => {
    filtrarProductos();
  });

  // Filtrado por categorías manejado en main.js que agrega la clase 'selected' y después llamará esta función
  document.querySelectorAll(".category").forEach(cat => {
    cat.addEventListener("click", () => {
      document.querySelectorAll(".category").forEach(c => c.classList.remove("selected"));
      cat.classList.add("selected");
      filtrarProductos();
    });
  });
});
