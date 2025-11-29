<template>
  <div class="split-button" :class="`split-button-${direction}`">
    <button
      :class="[
        'btn',
        `btn-${variant}`,
        {
          'btn-sm': size === 'sm',
          'btn-lg': size === 'lg',
        }
      ]"
      :disabled="disabled"
      @click="handleMainClick"
    >
      <slot name="main">{{ label }}</slot>
    </button>
    <button
      :class="[
        'btn',
        `btn-${variant}`,
        'dropdown-toggle-split'
      ]"
      :disabled="disabled"
      @click="toggleDropdown"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <span class="visually-hidden">Toggle Dropdown</span>
    </button>
    <ul v-if="showDropdown" class="dropdown-menu">
      <slot name="dropdown"></slot>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  label: String,
  variant: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    default: 'md'
  },
  direction: {
    type: String,
    default: 'horizontal'
  },
  disabled: Boolean
});

const emit = defineEmits(['click', 'toggle']);

const showDropdown = ref(false);

const handleMainClick = (event) => {
  emit('click', event);
};

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
  emit('toggle', showDropdown.value);
};
</script>

<style scoped>
.split-button {
  display: inline-flex;
  gap: 0;
}

.split-button-horizontal {
  flex-direction: row;
}

.split-button-vertical {
  flex-direction: column;
}

.split-button .btn {
  border-radius: 0;
  margin: 0;
}

.split-button .btn:first-child {
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
}

.split-button .dropdown-toggle-split {
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 0.25rem;
  padding: 0.5rem 0;
  list-style: none;
}

.dropdown-menu li {
  padding: 0.5rem 1rem;
}

.dropdown-menu li:hover {
  background-color: #f8f9fa;
}
</style>
