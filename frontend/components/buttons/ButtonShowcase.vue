<template>
  <section class="button-showcase my-5">
    <div class="container">
      <h2 class="mb-4">UI Components - Button Library</h2>

      <!-- Primary Buttons -->
      <div class="card mb-4">
        <div class="card-header">
          <h5>Primary Buttons</h5>
        </div>
        <div class="card-body">
          <div class="button-grid">
            <ActionButton variant="primary" size="sm" icon="play-fill" label="Small" />
            <ActionButton variant="primary" size="md" icon="play-fill" label="Medium" />
            <ActionButton variant="primary" size="lg" icon="play-fill" label="Large" />
            <ActionButton variant="primary" :disabled="true" label="Disabled" />
            <ActionButton variant="primary" :loading="true" label="Loading..." />
          </div>
        </div>
      </div>

      <!-- Outline Buttons -->
      <div class="card mb-4">
        <div class="card-header">
          <h5>Outline Buttons</h5>
        </div>
        <div class="card-body">
          <div class="button-grid">
            <ActionButton variant="outline-primary" icon="cloud-download" label="Download" />
            <ActionButton variant="outline-secondary" icon="arrow-clockwise" label="Refresh" />
            <ActionButton variant="outline-success" icon="check-circle" label="Success" />
            <ActionButton variant="outline-danger" icon="exclamation-triangle" label="Delete" />
            <ActionButton variant="outline-primary" :loading="true" label="Fetching..." />
          </div>
        </div>
      </div>

      <!-- Icon Buttons -->
      <div class="card mb-4">
        <div class="card-header">
          <h5>Icon Buttons</h5>
        </div>
        <div class="card-body">
          <div class="button-grid">
            <IconButton icon="search" variant="primary" title="Search" />
            <IconButton icon="gear" variant="secondary" title="Settings" />
            <IconButton icon="heart" variant="danger" title="Like" />
            <IconButton icon="star" variant="warning" title="Favorite" />
            <IconButton icon="shield-check" variant="success" title="Verified" />
            <IconButton icon="info-circle" variant="info" title="Info" />
            <IconButton icon="check" variant="primary" :active="true" title="Active" />
            <IconButton icon="lock" :disabled="true" title="Disabled" />
          </div>
        </div>
      </div>

      <!-- Button Sizes -->
      <div class="card mb-4">
        <div class="card-header">
          <h5>Button Sizes</h5>
        </div>
        <div class="card-body">
          <div class="button-grid">
            <ActionButton variant="primary" size="sm" label="Small Button" />
            <ActionButton variant="primary" size="md" label="Medium Button" />
            <ActionButton variant="primary" size="lg" label="Large Button" />
          </div>
        </div>
      </div>

      <!-- Button Group -->
      <div class="card mb-4">
        <div class="card-header">
          <h5>Button Groups</h5>
        </div>
        <div class="card-body">
          <div class="mb-3">
            <h6>Horizontal Group</h6>
            <ButtonGroup direction="horizontal">
              <button class="btn btn-outline-primary">Left</button>
              <button class="btn btn-outline-primary">Center</button>
              <button class="btn btn-outline-primary">Right</button>
            </ButtonGroup>
          </div>
          <div>
            <h6>Vertical Group</h6>
            <ButtonGroup direction="vertical">
              <button class="btn btn-outline-secondary w-100">Top</button>
              <button class="btn btn-outline-secondary w-100">Middle</button>
              <button class="btn btn-outline-secondary w-100">Bottom</button>
            </ButtonGroup>
          </div>
        </div>
      </div>

      <!-- Variants -->
      <div class="card mb-4">
        <div class="card-header">
          <h5>All Variants</h5>
        </div>
        <div class="card-body">
          <div class="button-grid">
            <ActionButton variant="primary" label="Primary" />
            <ActionButton variant="secondary" label="Secondary" />
            <ActionButton variant="success" label="Success" />
            <ActionButton variant="danger" label="Danger" />
            <ActionButton variant="warning" label="Warning" />
            <ActionButton variant="info" label="Info" />
            <ActionButton variant="light" label="Light" />
            <ActionButton variant="dark" label="Dark" />
          </div>
        </div>
      </div>

      <!-- With Icons -->
      <div class="card mb-4">
        <div class="card-header">
          <h5>Buttons with Icons</h5>
        </div>
        <div class="card-body">
          <div class="button-grid">
            <ActionButton icon="save" label="Save" />
            <ActionButton icon="trash" variant="danger" label="Delete" />
            <ActionButton icon="cloud-upload" variant="success" label="Upload" />
            <ActionButton icon="download" variant="info" label="Download" />
            <ActionButton icon="share" variant="primary" label="Share" />
            <ActionButton icon="printer" variant="secondary" label="Print" />
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import ActionButton from './ActionButton.vue';
import IconButton from './IconButton.vue';
import ButtonGroup from './ButtonGroup.vue';
</script>

<style scoped>
.button-showcase {
  padding: 2rem 0;
}

.button-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  align-items: center;
}

.card {
  border: 1px solid #dee2e6;
  border-radius: 0.5rem;
  overflow: hidden;
}

.card-header {
  background-color: #f8f9fa;
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
}

.card-header h5 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
}

.card-body {
  padding: 1.5rem;
}

.card-body h6 {
  margin-bottom: 0.75rem;
  font-weight: 600;
}

button {
  margin: 0.25rem;
}
</style>
