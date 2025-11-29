<template>
  <div class="admin-auth-container">
    <!-- Login Modal -->
    <div v-if="!isAuthenticated" class="admin-auth-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>🔐 Admin Login</h3>
          <p class="subtitle">Enter your admin password to access restricted features</p>
        </div>

        <form @submit.prevent="login" class="login-form">
          <div class="form-group">
            <label for="admin-password">Admin Password:</label>
            <input
              id="admin-password"
              v-model="password"
              type="password"
              class="form-control"
              placeholder="Enter your admin password"
              @keyup.enter="login"
              :disabled="loading"
              autofocus
            />
          </div>

          <button type="submit" class="btn btn-primary w-100" :disabled="loading || !password.trim()">
            <span v-if="loading">
              <i class="spinner-border spinner-border-sm me-2"></i>Logging in...
            </span>
            <span v-else>
              <i class="bi bi-lock"></i> Login
            </span>
          </button>
        </form>

        <div v-if="error" class="alert alert-danger">
          <i class="bi bi-exclamation-circle"></i> {{ error }}
        </div>

        <div class="info-section">
          <div class="info-item">
            <i class="bi bi-info-circle"></i>
            <small>This password protects advanced features like Traceroute and Connection Info.</small>
          </div>
          <div class="info-item">
            <i class="bi bi-shield-lock"></i>
            <small>Your session will expire after 24 hours of inactivity.</small>
          </div>
        </div>
      </div>
    </div>

    <!-- Authenticated State -->
    <div v-else class="admin-authenticated">
      <div class="auth-header">
        <span class="badge bg-success">
          <i class="bi bi-check-circle"></i> Admin Authenticated
        </span>
        <button @click="logout" class="btn btn-sm btn-outline-danger">
          <i class="bi bi-box-arrow-right"></i> Logout
        </button>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const password = ref('');
const isAuthenticated = ref(false);
const error = ref('');
const loading = ref(false);

// Check if token exists in sessionStorage
onMounted(() => {
  const storedToken = sessionStorage.getItem('admin_token');
  if (storedToken) {
    isAuthenticated.value = true;
  }
});

async function login() {
  if (!password.value.trim()) {
    error.value = 'Password cannot be empty';
    return;
  }

  loading.value = true;
  error.value = '';

  try {
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: password.value }),
    });

    const data = await response.json();

    if (response.ok && data.token) {
      // Store token in sessionStorage (tidak persisted)
      sessionStorage.setItem('admin_token', data.token);
      sessionStorage.setItem('admin_token_expiry', new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString());
      
      isAuthenticated.value = true;
      password.value = '';
      error.value = '';
    } else {
      error.value = data.error || 'Login failed. Please try again.';
    }
  } catch (err) {
    error.value = 'Connection error: ' + err.message;
    console.error('Admin login error:', err);
  } finally {
    loading.value = false;
  }
}

function logout() {
  sessionStorage.removeItem('admin_token');
  sessionStorage.removeItem('admin_token_expiry');
  isAuthenticated.value = false;
  password.value = '';
  error.value = '';
}

// Expose token getter untuk parent components
function getAdminToken() {
  const token = sessionStorage.getItem('admin_token');
  const expiry = sessionStorage.getItem('admin_token_expiry');
  
  // Check if expired
  if (token && expiry && new Date(expiry) < new Date()) {
    logout();
    return null;
  }
  
  return token;
}

defineExpose({ getAdminToken, logout });
</script>

<style scoped>
.admin-auth-container {
  width: 100%;
}

.admin-auth-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-content {
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  max-width: 420px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-header h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a1a1a;
}

.subtitle {
  margin: 0;
  font-size: 0.95rem;
  color: #666;
}

.login-form {
  margin: 1.5rem 0;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  font-size: 0.95rem;
  color: #333;
}

.form-control {
  width: 100%;
  padding: 0.875rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-control:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.form-control:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.btn {
  padding: 0.875rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
}

.btn-primary:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
  border-width: 0.2em;
}

.w-100 {
  width: 100%;
}

.me-2 {
  margin-right: 0.5rem;
}

.alert {
  padding: 1rem;
  border-radius: 6px;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.alert-danger {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.info-section {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
  color: #666;
}

.info-item i {
  flex-shrink: 0;
  margin-top: 0.1rem;
  color: #007bff;
}

.admin-authenticated {
  position: relative;
}

.auth-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #e7f3ff;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  border-left: 4px solid #007bff;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #28a745 !important;
  color: white;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.btn-outline-danger {
  border: 2px solid #dc3545;
  color: #dc3545;
  background: transparent;
}

.btn-outline-danger:hover {
  background: #dc3545;
  color: white;
}

/* Responsive */
@media (max-width: 600px) {
  .modal-content {
    padding: 2rem;
    border-radius: 8px;
  }

  .modal-header h3 {
    font-size: 1.5rem;
  }

  .auth-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .btn-outline-danger {
    width: 100%;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .modal-content {
    background: #2a2a2a;
    color: #e0e0e0;
  }

  .modal-header h3 {
    color: #fff;
  }

  .subtitle {
    color: #aaa;
  }

  .form-control {
    background: #3a3a3a;
    color: #fff;
    border-color: #555;
  }

  .form-control:focus {
    border-color: #007bff;
  }

  .info-item {
    color: #aaa;
  }

  .auth-header {
    background: #1a3a4a;
  }
}
</style>
