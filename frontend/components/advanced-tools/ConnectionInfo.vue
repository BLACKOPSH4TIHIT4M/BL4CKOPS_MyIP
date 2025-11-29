<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Connection Info</h5>
      <p class="card-text">View listening sockets, established connections, and LAN neighbors (ARP table).</p>

      <div class="mb-2">
        <button class="btn btn-outline-primary btn-sm" :disabled="loading || !connInfoEnabled" @click="fetchConnInfo">Refresh</button>
        <span v-if="loading" class="small text-muted ms-2">Loading…</span>
      </div>
      <div v-if="!connInfoEnabled" class="alert alert-warning">Connection info is disabled on this server</div>

      <div v-if="error" class="alert alert-danger">{{ error }}</div>

      <div v-if="connInfo">
        <h6>Host IPs</h6>
        <ul>
          <li v-for="ip of connInfo.hostIPs" :key="ip.ip"><code>{{ ip.iface }}: {{ ip.ip }}</code></li>
        </ul>

        <h6>Open Sockets / Connections (sample)</h6>
        <table class="table table-sm table-bordered">
          <thead>
            <tr><th>#</th><th>Local</th><th>Peer</th><th>State</th><th>Proc</th></tr>
          </thead>
          <tbody>
            <tr v-for="(s, idx) in connInfo.sockets" :key="idx">
              <td>{{ idx + 1 }}</td>
              <td>{{ s.local || s.Local }}</td>
              <td>{{ s.peer || s['Peer Address:Port'] || s.foreign || s.foreignAddress }}</td>
              <td><span :class="stateBadgeClass(s.state || s.State)">{{ s.state || s.State }}</span></td>
              <td>{{ s.proc || s.PROCESS || '' }}</td>
            </tr>
          </tbody>
        </table>

        <h6>Neighbors / ARP Table</h6>
        <table class="table table-sm table-bordered">
          <thead><tr><th>IP</th><th>MAC</th><th>Device</th><th>State/Flags</th></tr></thead>
          <tbody>
            <tr v-for="n in connInfo.neighbors" :key="n.ip">
              <td>{{ n.ip }}</td>
              <td>{{ n.mac || '' }}</td>
              <td>{{ n.dev || n.devic || n.dev || '' }}</td>
              <td>{{ n.state || n.flags || '' }}</td>
            </tr>
          </tbody>
        </table>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useMainStore } from '@/store';

const loading = ref(false);
const error = ref(null);
const connInfo = ref(null);
const store = useMainStore();
const connInfoEnabled = computed(() => store.configs?.connInfo);

function toJsonOrText(v) { try { return JSON.parse(v); } catch (e) { return v; } }

async function fetchConnInfo() {
  loading.value = true;
  error.value = null;
  connInfo.value = null;
  try {
    if (!connInfoEnabled.value) {
      error.value = 'Connection info is disabled on this server';
      loading.value = false;
      return;
    }
    const resp = await fetch('/api/conn-info', { headers: { Referer: window.location.origin } });
    if (!resp.ok) {
      if (resp.status === 429) throw new Error('Rate limit exceeded. Try again later.');
      throw new Error(`HTTP ${resp.status}`);
    }
    const json = await resp.json();
    if (json.error) {
      error.value = json.error || JSON.stringify(json);
    } else {
      connInfo.value = json;
    }
  } catch (e) {
    console.error('fetchConnInfo failed', e);
    error.value = e.message || 'Failed to fetch connection info';
  } finally {
    loading.value = false;
  }
}

function stateBadgeClass(state) {
  if (!state) return 'badge bg-secondary';
  const st = state.toString().toUpperCase();
  if (st.includes('ESTABLISHED')) return 'badge bg-success';
  if (st.includes('LISTEN')) return 'badge bg-primary';
  if (st.includes('CLOSE')) return 'badge bg-danger';
  if (st.includes('SYN')) return 'badge bg-warning text-dark';
  return 'badge bg-secondary';
}

// Automatically fetch on mounted
fetchConnInfo();
</script>

<style scoped>
.card { margin-bottom: 1rem; }
</style>
