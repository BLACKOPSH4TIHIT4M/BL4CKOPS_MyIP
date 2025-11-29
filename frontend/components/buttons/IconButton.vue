<template>
  <button
    :class="[
      'btn-icon',
      `btn-icon-${variant}`,
      {
        'btn-icon-sm': size === 'sm',
        'btn-icon-lg': size === 'lg',
        'disabled': disabled,
        'active': active
      }
    ]"
    :disabled="disabled"
    @click="handleClick"
    :title="title"
    :aria-label="ariaLabel"
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
  size: {
    type: String,
    default: 'md'
  },
  disabled: Boolean,
  active: Boolean,
  title: String,
  ariaLabel: String
});

const emit = defineEmits(['click']);

const handleClick = (event) => {
  if (!props.disabled) {
    emit('click', event);
  }
};
</script>

<style scoped>
.btn-icon {
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border-radius: 50%;
  border: 2px solid currentColor;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  font-size: 1rem;
}

.btn-icon:hover:not(:disabled) {
  transform: scale(1.1);
}

.btn-icon-primary {
  color: #0d6efd;
}

.btn-icon-primary:hover:not(:disabled) {
  background-color: #0d6efd;
  color: white;
}

.btn-icon-secondary {
  color: #6c757d;
}

.btn-icon-secondary:hover:not(:disabled) {
  background-color: #6c757d;
  color: white;
}

.btn-icon-danger {
  color: #dc3545;
}

.btn-icon-danger:hover:not(:disabled) {
  background-color: #dc3545;
  color: white;
}

.btn-icon-success {
  color: #198754;
}

.btn-icon-success:hover:not(:disabled) {
  background-color: #198754;
  color: white;
}

.btn-icon-sm {
  width: 2rem;
  height: 2rem;
  font-size: 0.875rem;
}

.btn-icon-lg {
  width: 3rem;
  height: 3rem;
  font-size: 1.25rem;
}

.btn-icon.active {
  background-color: currentColor;
  color: white;
}

.btn-icon:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
