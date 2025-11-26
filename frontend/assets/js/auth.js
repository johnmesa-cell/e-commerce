// ============================================
// GESTIÓN DE AUTENTICACIÓN
// ============================================

// Actualizar UI de autenticación en todas las páginas
function updateAuthUI() {
  const currentUser = Storage.get('currentUser');
  const loginBtn = document.getElementById('login-btn');
  const userInfo = document.getElementById('user-info');
  const userName = document.getElementById('user-name');

  if (currentUser) {
    // Usuario logueado
    if (loginBtn) loginBtn.style.display = 'none';
    if (userInfo) userInfo.style.display = 'flex';
    if (userName) userName.textContent = currentUser.name || currentUser.email;
  } else {
    // Usuario NO logueado
    if (loginBtn) loginBtn.style.display = 'block';
    if (userInfo) userInfo.style.display = 'none';
  }
}

// Evento para cerrar sesión
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', function() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      Storage.remove('currentUser');
      updateAuthUI();
      alert('Sesión cerrada exitosamente');
      window.location.href = 'index.html';
    }
  });
}

// ============================================
// REGISTRO DE USUARIO
// ============================================
const registerForm = document.getElementById('register-form');
if (registerForm) {
  registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const terms = document.getElementById('terms').checked;
    const messageDiv = document.getElementById('register-message');
    
    // Validaciones
    if (!name || !email || !password || !confirmPassword) {
      showMessage(messageDiv, 'Por favor completa todos los campos', 'error');
      return;
    }
    
    if (password.length < 6) {
      showMessage(messageDiv, 'La contraseña debe tener al menos 6 caracteres', 'error');
      return;
    }
    
    if (password !== confirmPassword) {
      showMessage(messageDiv, 'Las contraseñas no coinciden', 'error');
      return;
    }
    
    if (!terms) {
      showMessage(messageDiv, 'Debes aceptar los términos y condiciones', 'error');
      return;
    }
    
    // Obtener usuarios registrados
    const users = Storage.get('users') || [];
    
    // Verificar si el email ya está registrado
    if (users.find(user => user.email === email)) {
      showMessage(messageDiv, 'Este correo ya está registrado', 'error');
      return;
    }
    
    // Crear nuevo usuario
    const newUser = {
      id: Date.now(),
      name: name,
      email: email,
      password: password, // En producción, esto debería estar hasheado
      createdAt: new Date().toISOString()
    };
    
    // Guardar usuario
    users.push(newUser);
    Storage.set('users', users);
    
    showMessage(messageDiv, 'Cuenta creada exitosamente. Redirigiendo...', 'success');
    
    // Iniciar sesión automáticamente
    Storage.set('currentUser', { id: newUser.id, name: newUser.name, email: newUser.email });
    
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
  });
}

// ============================================
// INICIO DE SESIÓN
// ============================================
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    const messageDiv = document.getElementById('login-message');
    
    // Validaciones
    if (!email || !password) {
      showMessage(messageDiv, 'Por favor completa todos los campos', 'error');
      return;
    }
    
    // Obtener usuarios registrados
    const users = Storage.get('users') || [];
    
    // Buscar usuario
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      showMessage(messageDiv, 'Correo o contraseña incorrectos', 'error');
      return;
    }
    
    // Iniciar sesión
    Storage.set('currentUser', { id: user.id, name: user.name, email: user.email });
    
    if (remember) {
      Storage.set('rememberMe', true);
    }
    
    showMessage(messageDiv, 'Inicio de sesión exitoso. Redirigiendo...', 'success');
    
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  });
}

// ============================================
// FUNCIONES AUXILIARES
// ============================================
function showMessage(element, message, type) {
  if (!element) return;
  
  element.textContent = message;
  element.className = 'message ' + type;
  element.style.display = 'block';
  
  if (type === 'success') {
    setTimeout(() => {
      element.style.display = 'none';
    }, 3000);
  }
}

// Inicializar autenticación al cargar la página
document.addEventListener('DOMContentLoaded', function() {
  updateAuthUI();
});
