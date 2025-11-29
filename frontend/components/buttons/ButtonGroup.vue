<template>
  <div :class="['btn-group-wrapper', `btn-group-${direction}`]">
    <div class="btn-group" role="group" :aria-label="ariaLabel">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  direction: {
    type: String,
    default: 'horizontal',
    validator: (value) => ['horizontal', 'vertical'].includes(value)
  },
  ariaLabel: String
});
</script>

<style scoped>
.btn-group-wrapper {
  display: inline-flex;
}

.btn-group {
  display: flex;
  gap: 0;
}

.btn-group-horizontal {
  flex-direction: row;
}

.btn-group-horizontal .btn {
  border-radius: 0;
}

.btn-group-horizontal .btn:first-child {
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
}

.btn-group-horizontal .btn:last-child {
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}

.btn-group-vertical {
  flex-direction: column;
}

.btn-group-vertical .btn {
  border-radius: 0;
}

.btn-group-vertical .btn:first-child {
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}

.btn-group-vertical .btn:last-child {
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}
</style>
