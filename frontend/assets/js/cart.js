// ============================================
// GESTIÓN DEL CARRITO DE COMPRAS
// ============================================

// Obtener carrito del localStorage
function getCart() {
  return Storage.get('cart') || [];
}

// Guardar carrito en localStorage
function saveCart(cart) {
  Storage.set('cart', cart);
  updateCartCount();
}

// Actualizar contador del carrito en el header
function updateCartCount() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const cartCountElement = document.getElementById('cart-count');
  if (cartCountElement) {
    cartCountElement.textContent = totalItems;
  }
}

// Agregar producto al carrito
function addToCart(productId, productData = null) {
  const cart = getCart();
  
  // Buscar si el producto ya existe en el carrito
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    // Incrementar cantidad
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    // Agregar nuevo producto
    const newItem = productData || {
      id: productId,
      quantity: 1
    };
    cart.push(newItem);
  }
  
  saveCart(cart);
  alert('Producto agregado al carrito');
}

// Eliminar producto del carrito
function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  
  // Si estamos en la página del carrito, renderizar de nuevo
  if (typeof renderCart === 'function') {
    renderCart();
  }
}

// Actualizar cantidad de un producto
function updateQuantity(productId, newQuantity) {
  const cart = getCart();
  const item = cart.find(item => item.id === productId);
  
  if (item) {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      item.quantity = newQuantity;
      saveCart(cart);
      
      // Si estamos en la página del carrito, renderizar de nuevo
      if (typeof renderCart === 'function') {
        renderCart();
      }
    }
  }
}

// Vaciar carrito completo
function clearCart() {
  if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
    Storage.remove('cart');
    updateCartCount();
    
    // Si estamos en la página del carrito, renderizar de nuevo
    if (typeof renderCart === 'function') {
      renderCart();
    }
  }
}

// Renderizar carrito en cart.html
function renderCart() {
  const cart = getCart();
  const cartContent = document.getElementById('cart-content');
  const emptyCart = document.getElementById('empty-cart');
  const cartSummary = document.getElementById('cart-summary');
  
  if (!cartContent) return;
  
  if (cart.length === 0) {
    // Mostrar mensaje de carrito vacío
    cartContent.innerHTML = '';
    if (emptyCart) emptyCart.style.display = 'block';
    if (cartSummary) cartSummary.style.display = 'none';
    return;
  }
  
  // Ocultar mensaje de carrito vacío
  if (emptyCart) emptyCart.style.display = 'none';
  if (cartSummary) cartSummary.style.display = 'block';
  
  // Renderizar items del carrito
  cartContent.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <img src="${item.imagen || 'assets/images/placeholder.jpg'}" alt="${item.nombre || 'Producto'}">
      <div class="item-details">
        <h3>${item.nombre || 'Producto'}</h3>
        <p class="item-price">${item.precio || '$0'}</p>
      </div>
      <div class="item-quantity">
        <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
        <span>${item.quantity || 1}</span>
        <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
      </div>
      <div class="item-total">
        <p>${calculateItemTotal(item)}</p>
      </div>
      <button class="remove-btn" onclick="removeFromCart(${item.id})">🗑️</button>
    </div>
  `).join('');
  
  // Actualizar resumen
  updateCartSummary(cart);
}

// Calcular total de un item
function calculateItemTotal(item) {
  const price = parseFloat(item.precio?.replace('$', '').replace('.', '').replace(',', '.') || 0);
  const total = price * (item.quantity || 1);
  return '$' + total.toLocaleString('es-CO');
}

// Actualizar resumen del carrito
function updateCartSummary(cart) {
  let subtotal = 0;
  
  cart.forEach(item => {
    const price = parseFloat(item.precio?.replace('$', '').replace('.', '').replace(',', '.') || 0);
    subtotal += price * (item.quantity || 1);
  });
  
  const shipping = subtotal > 100000 ? 0 : 10000; // Envío gratis si supera $100.000
  const total = subtotal + shipping;
  
  const subtotalElement = document.getElementById('subtotal');
  const shippingElement = document.getElementById('shipping');
  const totalElement = document.getElementById('total');
  
  if (subtotalElement) subtotalElement.textContent = '$' + subtotal.toLocaleString('es-CO');
  if (shippingElement) shippingElement.textContent = shipping === 0 ? 'GRATIS' : '$' + shipping.toLocaleString('es-CO');
  if (totalElement) totalElement.textContent = '$' + total.toLocaleString('es-CO');
}

// Evento para botón de checkout
const checkoutBtn = document.getElementById('checkout-btn');
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', function() {
    const currentUser = Storage.get('currentUser');
    
    if (!currentUser) {
      alert('Debes iniciar sesión para proceder al pago');
      window.location.href = 'login.html';
      return;
    }
    
    alert('Funcionalidad de pago en desarrollo. Tu pedido está listo para ser procesado.');
  });
}

// Evento para botón de vaciar carrito
const clearCartBtn = document.getElementById('clear-cart-btn');
if (clearCartBtn) {
  clearCartBtn.addEventListener('click', clearCart);
}

// Inicializar contador del carrito al cargar cualquier página
document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();
});
