<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import api, { type Solicitud, type AuditLog } from './services/api';
import SolicitudesTable from './components/SolicitudesTable.vue';
import AuditLogs from './components/AuditLogs.vue';
import SolicitudModal from './components/SolicitudModal.vue';

const solicitudes = ref<Solicitud[]>([]);
const logsAuditoria = ref<AuditLog[]>([]);
const busqueda = ref('');
const cargando = ref(true);
const pestanaActiva = ref('solicitudes');
const mostrarModal = ref(false);
const errorCarga = ref(false);

const cargarDatos = async (intentos = 1) => {
  try {
    if (intentos === 1) cargando.value = true;
    errorCarga.value = false;
    const response = await api.getSolicitudes();
    solicitudes.value = response.data;
    
  } catch (e) { 
    console.error("Error Posgres:", e); 
    if (intentos < 2) {
      return cargarDatos(intentos + 1); 
    }
    errorCarga.value = true;
  } finally { 
    cargando.value = false; 
  }
};

const cargarLogs = async (intentos = 1) => {
  try {
    const response = await api.getAuditoria();
    logsAuditoria.value = response.data;
  } catch (e) { 
    console.error("Error Mongo:", e); 
    if (intentos < 2) {
      return cargarLogs(intentos + 1);
    }
  }
};

const cambiarPestana = (nombre: string) => {
  pestanaActiva.value = nombre;
  busqueda.value = '';
  if (nombre === 'auditoria'){ 
    cargarLogs();
  } else {
    cargarDatos();
  }
};

onMounted(cargarDatos);

const filtradas = computed(() => {
  const q = busqueda.value.trim().toLowerCase(); 
  
  if (!q) return solicitudes.value;

  return solicitudes.value.filter(s => 
    s.nombre_completo.toLowerCase().includes(q) ||
    s.email.toLowerCase().includes(q) ||
    s.numero_documento.toLowerCase().includes(q) ||
    s.pais.toLowerCase().includes(q) ||
    (s.nivel_riesgo && s.nivel_riesgo.toLowerCase().includes(q))
  );
});

const logsFiltrados = computed(() => {
  const q = busqueda.value.trim().toLowerCase();
  return logsAuditoria.value.filter(l => 
    l.accion.toLowerCase().includes(q) ||
    l.detalle.toLowerCase().includes(q)
  );
});
</script>

<template>
  <div class="min-h-screen bg-[#FDFBFF] text-black font-sans antialiased">
    <header class="bg-[#F3EDF7] border-b border-[#CAC4D0] px-8 py-4 sticky top-0 z-30 shadow-sm">
      <div class="max-w-full mx-auto flex justify-between items-center">
        <div class="flex items-center gap-4">
          <h1 class="text-xl font-medium tracking-tight italic">Prueba tecnica Gendra</h1>
        </div>
        <nav class="flex bg-[#E7E0EC] rounded-full p-1 border border-[#CAC4D0]">
          <button @click="cambiarPestana('solicitudes')" :class="['px-6 py-2 rounded-full text-sm font-medium transition-all', pestanaActiva === 'solicitudes' ? 'bg-[#6750A4] text-white shadow-md' : 'text-[#49454F]']">Solicitudes</button>
          <button @click="cambiarPestana('auditoria')" :class="['px-6 py-2 rounded-full text-sm font-medium transition-all', pestanaActiva === 'auditoria' ? 'bg-[#6750A4] text-white shadow-lg' : 'text-[#49454F]']">Logs</button>
        </nav>
      </div>
    </header>

    <main class="p-8 max-w-full mx-auto">
      <div class="space-y-6">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="relative w-full md:w-96">
            <input v-model="busqueda" type="text" :placeholder="pestanaActiva === 'solicitudes' ? 'Buscar por nombre, email o ID...' : 'Filtrar logs por acción...'" class="w-full bg-white border border-[#CAC4D0] rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-[#6750A4] outline-none shadow-sm"></div>
          <button v-if="pestanaActiva === 'solicitudes'" @click="mostrarModal = true" class="bg-[#6750A4] text-white px-10 py-3 rounded-full font-bold shadow-lg hover:bg-[#4F378B] transition-all active:scale-95">Crear Solicitud</button>
        </div>

        <SolicitudesTable v-if="pestanaActiva === 'solicitudes'" :solicitudes="filtradas" :cargando="cargando" />
        <AuditLogs v-else :logs="logsFiltrados" />
      </div>
    </main>

    <SolicitudModal :abierto="mostrarModal" @cerrar="mostrarModal = false" @guardado="cargarDatos" />
  </div>
</template>