<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Traceroute</h5>
      <p class="card-text">Enter a host or IP to traceroute from the server.</p>

      <div class="input-group mb-3">
        <input v-model="target" class="form-control" placeholder="example.com or 8.8.8.8" @keyup.enter="runTraceroute" :disabled="!tracerouteEnabled" />
        <button class="btn btn-primary" :disabled="loading || !target || !tracerouteEnabled" @click="runTraceroute">Run</button>
      </div>
      <div v-if="!tracerouteEnabled" class="alert alert-warning">Traceroute is disabled on this server</div>

      <div v-if="loading" class="text-muted">Running traceroute…</div>

      <div v-if="error" class="alert alert-danger">{{ error }}</div>

      <div v-if="rawOutput">
        <h6 class="mt-2">Raw Output</h6>
        <pre class="small" style="white-space: pre-wrap;">{{ rawOutput }}</pre>
      </div>

      <div v-if="parsed && parsed.length">
        <h6 class="mt-2">Parsed Hops</h6>
        <table class="table table-sm table-bordered">
          <thead><tr><th>#</th><th>Host</th><th>IP</th><th>Times</th></tr></thead>
          <tbody>
            <tr v-for="hop in parsed" :key="hop.index">
              <td>{{ hop.index }}</td>
              <td>{{ hop.host }}</td>
              <td>{{ hop.ip }}</td>
              <td>{{ hop.times }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="parsed && parsed.length" class="mt-3">
        <h6>Path Visualization</h6>
        <div class="d-flex align-items-center path-visual">
          <div v-for="(hop, index) in parsed" :key="hop.index" class="path-node text-center">
            <div class="node-name">{{ hop.host || hop.ip }}</div>
            <div class="node-lat">{{ parseFirstTime(hop.times) }}</div>
            <div v-if="index < parsed.length - 1" class="node-arrow">→</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useMainStore } from '@/store';

const target = ref('');
const loading = ref(false);
const error = ref(null);
const rawOutput = ref('');
const parsed = ref([]);

const store = useMainStore();
const tracerouteEnabled = computed(() => store.configs?.traceroute);

async function runTraceroute() {
  if (!tracerouteEnabled.value) {
    error.value = 'Traceroute is disabled on this server';
    return;
  }
  if (!target.value) return;
  loading.value = true;
  error.value = null;
  rawOutput.value = '';
  parsed.value = [];
  try {
    const resp = await fetch(`/api/traceroute?target=${encodeURIComponent(target.value)}`, { headers: { Referer: window.location.origin } });
    if (!resp.ok) {
      // Rate limit handling
      if (resp.status === 429) throw new Error('Rate limit exceeded. Try again later.');
      throw new Error(`HTTP ${resp.status}`);
    }
    const json = await resp.json();
    if (json.error) {
      error.value = json.error;
    } else {
      rawOutput.value = json.raw || json.rawOutput || '';
      parsed.value = parseTraceroute(rawOutput.value);
    }
  } catch (err) {
    console.error('Traceroute failure', err);
    error.value = err.message || 'Failed to run traceroute';
  } finally {
    loading.value = false;
  }
}

function parseTraceroute(raw) {
  if (!raw) return [];
  const lines = raw.split(/\r?\n/).filter(Boolean);
  const hopLines = lines.map(line => {
    // Attempt to parse common traceroute output
    // Example: 1  192.XXX.XXX.1 (192.XXX.XXX.1)  0.645 ms  0.478 ms  0.455 ms
    const m = line.match(/^(\d+)\s+(.*?)\s+(?:\((\d+\.\d+\.\d+\.\d+)\))?\s*(.*)$/);
    if (!m) return null;
    const idx = parseInt(m[1], 10);
    const host = m[2].trim();
    const ip = m[3] || host.match(/(\d+\.\d+\.\d+\.\d+)/)?.[0] || '';
    const times = m[4]?.trim() || '';
    return { index: idx, host, ip, times };
  }).filter(Boolean);
  return hopLines;
}

function parseFirstTime(times) {
  if (!times) return '';
  // times like "0.123 ms 0.456 ms 0.789 ms"
  const ms = times.split(/\s+/).filter(Boolean).find(t => t.endsWith('ms'));
  return ms || '';
}
</script>

<style scoped>
.card { margin-bottom: 1rem; }
.path-visual { gap: 8px; flex-wrap: nowrap; overflow-x: auto; padding: 0.5rem 0; }
.path-node { display: inline-flex; align-items: center; gap: 8px; padding: 6px 8px; border-radius: 8px; background: var(--bs-light); margin-right: 6px; }
.node-name { font-weight: bold; font-size: 0.85rem; }
.node-lat { font-size: 0.8rem; color: #666; }
.node-arrow { margin-left: 6px; font-size: 1.2rem; color: #444; }
</style>
