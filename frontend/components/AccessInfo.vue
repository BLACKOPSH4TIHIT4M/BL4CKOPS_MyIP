<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Access Info</h5>
      <p class="card-text">This section displays how you can access this app from this host or your LAN.</p>

      <div v-if="loading" class="text-muted">Loading access info…</div>
      <div v-else>
        <div v-if="error" class="alert alert-danger">{{ error }}</div>

        <div v-if="data">
            <h6>Local / Host</h6>
            <ul>
              <li><code>{{ data.accessUrls.localhost }}</code></li>
              <li v-if="data.accessUrls && data.accessUrls.hostIPs && data.accessUrls.hostIPs.length">
                <div>Host IPs (LAN):</div>
                <ul>
                  <li v-for="u in data.accessUrls.hostIPs" :key="u"><code>{{ u }}</code></li>
                </ul>
              </li>
            </ul>

            <h6>Suggested LAN Links</h6>
            <p class="small text-muted">Use these links from devices on the same LAN to reach this server.</p>
            <ul>
              <li v-for="link in data.accessUrls.hostIPs" :key="link"><code>{{ link }}</code></li>
            </ul>

          <hr />
          <p class="small text-muted">If you need public access, consider using a reverse proxy or expose this port through ssh-tunnel / ngrok / cloud hosting.</p>
          <div class="mt-2 small">
            <strong>Admin Monitor:</strong>
            <span v-if="data.adminEnabled" class="text-success">Enabled (see admin monitor docs)</span>
            <span v-else class="text-muted">Disabled by default</span>
            &nbsp;•&nbsp;
            <strong>Conn Info:</strong>
            <span v-if="data.connInfoEnabled" class="text-success">Enabled</span>
            <span v-else class="text-muted">Disabled</span>
            <span v-if="data.connInfoLocalOnly" class="text-warning"> (local only)</span>
            &nbsp;•&nbsp;
            <strong>Traceroute:</strong>
            <span v-if="data.tracerouteEnabled" class="text-success">Enabled</span>
            <span v-else class="text-muted">Disabled</span>
            <span v-if="data.tracerouteLocalOnly" class="text-warning"> (local only)</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const data = ref(null);
const loading = ref(false);
const error = ref(null);

async function fetchAccessInfo() {
  loading.value = true;
  error.value = null;
  try {
    const res = await fetch('/api/access-info', { headers: { Referer: window.location.origin } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    data.value = json;
  } catch (err) {
    console.error('AccessInfo fetch failed', err);
    error.value = err.message || 'Failed to retrieve access info';
  } finally {
    loading.value = false;
  }
}

onMounted(fetchAccessInfo);
</script>

<style scoped>
.card { margin-bottom: 1rem; }
</style>
