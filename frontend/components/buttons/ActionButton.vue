<template>
  <button
    :type="type"
    :class="[
      'btn btn-action',
      `btn-${variant}`,
      {
        'btn-sm': size === 'sm',
        'btn-lg': size === 'lg',
        'disabled': disabled || loading,
        'btn-loading': loading,
      },
      customClass
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
    :aria-label="ariaLabel"
  >
    <i v-if="icon && !loading" :class="['bi', `bi-${icon}`, 'me-2']"></i>
    <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status"></span>
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'button'
  },
  variant: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    default: 'md'
  },
  icon: String,
  label: String,
  disabled: Boolean,
  loading: Boolean,
  ariaLabel: String,
  customClass: String
});

const emit = defineEmits(['click']);

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event);
  }
};
</script>

<style scoped>
.btn-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  font-weight: 500;
}

.btn-action:not(:disabled):hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}

.btn-action.btn-loading {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-sm {
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
}

.btn-lg {
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
}
</style>
