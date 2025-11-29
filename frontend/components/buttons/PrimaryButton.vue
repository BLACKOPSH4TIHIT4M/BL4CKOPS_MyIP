<template>
  <button
    :type="type"
    :class="[
      'btn',
      `btn-${variant}`,
      {
        'btn-sm': size === 'sm',
        'btn-lg': size === 'lg',
        'disabled': disabled,
        'loading': isLoading,
      }
    ]"
    :disabled="disabled || isLoading"
    @click="handleClick"
  >
    <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
    <slot></slot>
  </button>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value)
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'outline-primary', 'outline-secondary', 'outline-success', 'outline-danger'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['click']);

const isLoading = computed(() => props.loading);

const handleClick = (event) => {
  if (!props.disabled && !isLoading.value) {
    emit('click', event);
  }
};
</script>

<style scoped>
.btn {
  transition: all 0.3s ease;
  font-weight: 500;
}

.btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn.loading {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-outline-primary:hover:not(:disabled) {
  background-color: #0d6efd;
  border-color: #0d6efd;
  color: white;
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
  border-width: 0.2em;
}
</style>
