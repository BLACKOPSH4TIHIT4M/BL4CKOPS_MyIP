<template>
  <button
    :class="[
      'fab',
      `fab-${position}`,
      `fab-${variant}`,
      {
        'fab-sm': size === 'sm',
        'fab-lg': size === 'lg',
      }
    ]"
    :disabled="disabled"
    @click="handleClick"
    :title="title"
  >
    <i :class="['bi', `bi-${icon}`]"></i>
  </button>
</template>

<script setup>
const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  variant: {
    type: String,
    default: 'primary'
  },
  position: {
    type: String,
    default: 'bottom-right',
    validator: (value) => ['bottom-right', 'bottom-left', 'top-right', 'top-left'].includes(value)
  },
  size: {
    type: String,
    default: 'md'
  },
  disabled: Boolean,
  title: String
});

const emit = defineEmits(['click']);

const handleClick = (event) => {
  if (!props.disabled) {
    emit('click', event);
  }
};
</script>

<style scoped>
.fab {
  position: fixed;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1040;
}

.fab:hover:not(:disabled) {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.fab:active:not(:disabled) {
  transform: scale(0.95);
}

/* Positions */
.fab-bottom-right {
  bottom: 2rem;
  right: 2rem;
}

.fab-bottom-left {
  bottom: 2rem;
  left: 2rem;
}

.fab-top-right {
  top: 2rem;
  right: 2rem;
}

.fab-top-left {
  top: 2rem;
  left: 2rem;
}

/* Variants */
.fab-primary {
  background-color: #0d6efd;
  color: white;
}

.fab-secondary {
  background-color: #6c757d;
  color: white;
}

.fab-success {
  background-color: #198754;
  color: white;
}

.fab-danger {
  background-color: #dc3545;
  color: white;
}

.fab-warning {
  background-color: #ffc107;
  color: black;
}

.fab-info {
  background-color: #0dcaf0;
  color: black;
}

/* Sizes */
.fab-sm {
  width: 2.75rem;
  height: 2.75rem;
  font-size: 1.125rem;
}

.fab-lg {
  width: 4.25rem;
  height: 4.25rem;
  font-size: 1.875rem;
}

.fab:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
