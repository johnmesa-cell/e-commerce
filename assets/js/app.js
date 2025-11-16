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
  lista.forEach((prod, idx) => {
    // incluimos data-index para poder identificar el producto al hacer clic
    const imgSrc = encodeURI(prod.imagen || 'assets/images/placeholder.svg');
    const prodHTML = `
      <article class="producto-card" data-index="${idx}">
        <img src="${imgSrc}" alt="${prod.nombre}" />
        <h3>${prod.nombre}</h3>
        <p>${prod.descripcion}</p>
        <p><b>Precio:</b> $${prod.precio.toFixed(2)}</p>
      </article>`;
    productosContainer.insertAdjacentHTML("beforeend", prodHTML);
  });

  // Añadir listeners para abrir modal con información relevante del producto
  productosContainer.querySelectorAll('.producto-card').forEach(card => {
    card.addEventListener('click', () => {
      const index = parseInt(card.dataset.index, 10);
      // index corresponde a la posición dentro de la lista pasada a la función
      showProductDetail(index, lista);
    });
  });
}

// Cargar datos desde JSON o sessionStorage
function cargarDatos() {
  const dataEnStorage = sessionStorage.getItem("listado_productos");
  if (dataEnStorage) {
    const parsed = JSON.parse(dataEnStorage);
    // Si los datos en sessionStorage contienen rutas remotas antiguas, preferimos volver a fetch
    const tieneUrlsRemotas = parsed.some(p => typeof p.imagen === 'string' && p.imagen.startsWith('http'));
    if (tieneUrlsRemotas) {
      console.log('SessionStorage contiene rutas remotas; forzando recarga desde JSON');
    } else {
      productos = parsed;
      productosFiltrados = productos;
      mostrarProductos(productos);
      console.log("Datos cargados desde sessionStorage");
      return Promise.resolve();
    }
  } else {
    // Ajuste: ruta correcta al JSON dentro de la estructura del proyecto
    fetch("assets/json/data.json")
      .then(res => res.json())
      .then(data => {
        productos = data;
        productosFiltrados = data;
        mostrarProductos(data);
        sessionStorage.setItem("listado_productos", JSON.stringify(data));
        console.log("Datos cargados desde archivo JSON");
        return;
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
  // Aseguramos que cargarDatos devuelva una promesa para realizar acciones una vez cargados los productos
  Promise.resolve(cargarDatos()).then(() => {
    // Selección de categoría desde query string (si existe)
    const params = new URLSearchParams(window.location.search);
    const catParam = params.get('category');
    if (catParam) {
      const catElem = Array.from(document.querySelectorAll('.category')).find(c => c.dataset.category === catParam);
      if (catElem) {
        document.querySelectorAll('.category').forEach(c => c.classList.remove('selected'));
        catElem.classList.add('selected');
        document.querySelectorAll('.category').forEach(c => c.setAttribute('aria-pressed', 'false'));
        catElem.setAttribute('aria-pressed', 'true');
        // aplicar filtro inicial según la categoría en la URL
        filtrarProductos();
      }
    } else {
      if (!document.querySelector('.category.selected')) {
        const first = document.querySelector('.category[data-category]');
        if (first) first.classList.add('selected');
        document.querySelectorAll('.category').forEach(c => c.setAttribute('aria-pressed', 'false'));
        first.setAttribute('aria-pressed', 'true');
        filtrarProductos();
      }
    }

    // Si hay parámetro product en la URL, abrir detalle correspondiente
    const productParam = params.get('product');

    // event listeners
    inputBuscar.addEventListener("input", () => {
      filtrarProductos();
    });

    document.querySelectorAll(".category").forEach(cat => {
      // permitir activación por click o por teclado (enter). Prevenir navegación por defecto cuando hay handler.
      cat.addEventListener("click", (e) => {
        if (e && e.preventDefault) e.preventDefault();
        document.querySelectorAll(".category").forEach(c => { c.classList.remove("selected"); c.setAttribute('aria-pressed', 'false'); });
        cat.classList.add("selected");
        cat.setAttribute('aria-pressed', 'true');
        filtrarProductos();
        // actualizamos la query string para compartir enlace de categoría sin recargar
        const newParams = new URLSearchParams(window.location.search);
        newParams.set('category', cat.dataset.category);
        newParams.delete('product');
        history.replaceState(null, '', `${location.pathname}?${newParams.toString()}`);
      });
      // permitir interacción por teclado para elementos no nativos (si se usaran), aunque <a> ya maneja esto
      cat.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          cat.click();
        }
      });
    });

    // Si hay productParam, intentar abrir su detalle
    if (productParam) {
      // productParam ya viene decodificado por URLSearchParams
      const decoded = productParam;
      // buscar índice en la lista completa de productos
      const idx = productos.findIndex(p => p.nombre === decoded);
      if (idx >= 0) {
        // Mostrar detalle del producto (usamos productosFiltrados para el índice dentro de la lista mostrada)
        // Intentamos encontrar el índice dentro de la lista filtrada si corresponde
        const listadoActual = productosFiltrados.length ? productosFiltrados : productos;
        const idxEnListado = listadoActual.findIndex(p => p.nombre === decoded);
        if (idxEnListado >= 0) showProductDetail(idxEnListado, listadoActual);
        else showProductDetail(idx, productos);
      }
    }
  });
});

// Modal: mostrar y cerrar
const modalOverlay = document.getElementById('modal-overlay');
const modalCloseBtn = document.getElementById('modal-close');
function showProductDetail(index, lista) {
  const prod = lista[index];
  if (!prod) return;
  document.getElementById('modal-img').src = encodeURI(prod.imagen || 'assets/images/placeholder.svg');
  document.getElementById('modal-img').alt = prod.nombre;
  document.getElementById('modal-title').textContent = prod.nombre;
  document.getElementById('modal-desc').textContent = prod.descripcion;
  document.getElementById('modal-price').textContent = `$ ${prod.precio.toFixed(2)}`;
  const catEl = document.getElementById('modal-category');
  if (catEl) catEl.querySelector('span').textContent = prod.categoria;
  modalOverlay.classList.add('open');
  modalOverlay.setAttribute('aria-hidden', 'false');
  // Actualizar URL para que pueda compartirse el producto
  const params = new URLSearchParams(window.location.search);
  params.set('product', prod.nombre);
  history.replaceState(null, '', `${location.pathname}?${params.toString()}`);
}

function closeModal() {
  modalOverlay.classList.remove('open');
  modalOverlay.setAttribute('aria-hidden', 'true');
  // eliminar product de query string al cerrar
  const params = new URLSearchParams(window.location.search);
  params.delete('product');
  history.replaceState(null, '', `${location.pathname}${params.toString() ? '?' + params.toString() : ''}`);
}

modalCloseBtn && modalCloseBtn.addEventListener('click', closeModal);
modalOverlay && modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});
