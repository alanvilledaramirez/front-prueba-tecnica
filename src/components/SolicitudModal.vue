<script setup lang="ts">
import { ref, computed } from 'vue';
import api, { type Solicitud } from '../services/api';

const props = defineProps<{
  abierto: boolean;
}>();

const emit = defineEmits(['cerrar', 'guardado']);

const enviando = ref(false);
const formulario = ref<Solicitud>({
  nombre_completo: '',
  email: '',
  telefono: '',
  pais: '',
  tipo_documento: '',
  numero_documento: '',
  url_imagen: '',
  estado: ''
});

const emailValido = computed(() => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(formulario.value.email);
});

const telefonoValido = computed(() => {
  const regex = /^[0-9]+$/;
  return regex.test(formulario.value.telefono) && formulario.value.telefono.length >= 8;
});


const formularioValido = computed(() => {
  return (
    formulario.value.nombre_completo.trim().length >= 3 &&
    emailValido.value &&
    telefonoValido.value &&
    formulario.value.numero_documento.trim().length > 0 &&
    formulario.value.pais !== '' &&
    formulario.value.tipo_documento !== '' &&
    formulario.value.estado !== ''
  );
});

const guardar = async () => {
  if (!formularioValido.value) return;

  enviando.value = true;
  try {
    await api.createSolicitud(formulario.value);
    emit('guardado');
    cerrar();
  } catch (error) {
    alert("Error al registrar la solicitud. Por favor, intente de nuevo.");
  } finally {
    enviando.value = false;
  }
};

const cerrar = () => {
  formulario.value = {
    nombre_completo: '',
    email: '',
    telefono: '',
    pais: '',
    tipo_documento: '',
    numero_documento: '',
    url_imagen: '',
    estado: ''
  };
  emit('cerrar');
};
</script>

<template>
  <div v-if="abierto" class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div class="bg-[#F3EDF7] rounded-[28px] shadow-2xl w-full max-w-xl p-8">
      <h2 class="text-2xl font-normal text-[#1C1B1F] mb-8">Nueva Solicitud</h2>
      
      <form @submit.prevent="guardar" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex flex-col border-b border-[#79747E] bg-[#E7E0EC] px-4 py-2 rounded-t-md">
            <label class="text-[10px] font-bold text-[#6750A4] uppercase">Nombre Completo</label>
            <input v-model="formulario.nombre_completo" required class="bg-transparent border-none outline-none py-1 text-sm text-black" placeholder="Ej. Juan Pérez">
          </div>
          
          <div class="flex flex-col border-b bg-[#E7E0EC] px-4 py-2 rounded-t-md"
               :class="[formulario.email && !emailValido ? 'border-red-500' : 'border-[#79747E]']">
            <label class="text-[10px] font-bold text-[#6750A4] uppercase">Correo Electrónico</label>
            <input v-model="formulario.email" type="email" required class="bg-transparent border-none outline-none py-1 text-sm text-black" placeholder="correo@ejemplo.com">
            <span v-if="formulario.email && !emailValido" class="text-[9px] text-red-600 font-medium">Formato de correo inválido</span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex flex-col border-b bg-[#E7E0EC] px-4 py-2 rounded-t-md" :class="[formulario.telefono && !telefonoValido ? 'border-red-500' : 'border-[#79747E]']">
            <label class="text-[10px] font-bold text-[#6750A4] uppercase">Teléfono</label>
            <input v-model="formulario.telefono" required class="bg-transparent border-none outline-none py-1 text-sm text-black" placeholder="Solo números">
            <span v-if="formulario.telefono && !telefonoValido" class="text-[9px] text-red-600 font-medium">Mínimo 8 dígitos numéricos</span>
          </div>

          <div class="flex flex-col border-b border-[#79747E] bg-[#E7E0EC] px-4 py-2 rounded-t-md">
            <label class="text-[10px] font-bold text-[#6750A4] uppercase">País</label>
            <select v-model="formulario.pais" class="bg-transparent border-none outline-none py-1 text-sm text-black">
              <option value="Mexico">Mexico</option>
              <option value="Colombia">Colombia</option>
              <option value="Iran">Iran</option>
              <option value="Cuba">Cuba</option>
              <option value="Corea del Norte">Corea del Norte</option>
              <option value="Argentina">Argentina</option>
              <option value="EEUU">Estados Unidos</option>
              <option value="Siria">Siria</option>
              <option value="Rusia">Rusia</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex flex-col border-b border-[#79747E] bg-[#E7E0EC] px-4 py-2 rounded-t-md">
            <label class="text-[10px] font-bold text-[#6750A4] uppercase">Tipo de documento</label>
            <select v-model="formulario.tipo_documento" class="bg-transparent border-none outline-none py-1 text-sm text-black">
              <option value="INE">INE</option>
              <option value="Pasaporte">Pasaporte</option>
              <option value="Licencia">Licencia</option>
            </select>
          </div>
          <div class="flex flex-col border-b border-[#79747E] bg-[#E7E0EC] px-4 py-2 rounded-t-md">
            <label class="text-[10px] font-bold text-[#6750A4] uppercase">Numero de Documento</label>
            <input v-model="formulario.numero_documento" required class="bg-transparent border-none outline-none py-1 text-sm text-black">
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex flex-col border-b border-[#79747E] bg-[#E7E0EC] px-4 py-2 rounded-t-md">
            <label class="text-[10px] font-bold text-[#6750A4] uppercase">URL Imagen</label>
            <input v-model="formulario.url_imagen" placeholder="https://fotito.jpg" class="bg-transparent border-none outline-none py-1 text-sm text-black">
          </div>
          
          <div class="flex flex-col border-b border-[#79747E] bg-[#E7E0EC] px-4 py-2 rounded-t-md">
            <label class="text-[10px] font-bold text-[#6750A4] uppercase">Estado Inicial</label>
            <select v-model="formulario.estado" class="bg-transparent border-none outline-none py-1 text-sm text-black">
              <option value="pendiente">PENDIENTE</option>
              <option value="aprobada">APROBADA</option>
              <option value="rechazada">RECHAZADA</option>
              <option value="requiere_informacion">REQUIERE_INFORMACION</option>
            </select>
          </div>
        </div>

        <div class="flex justify-end gap-3 mt-10 font-bold">
          <button type="button" @click="cerrar" 
                  class="px-6 py-2 text-[#6750A4] text-sm hover:bg-[#6750A4]/10 rounded-full transition-colors">
            CANCELAR
          </button>
          <button type="submit" 
                  :disabled="enviando || !formularioValido" 
                  class="bg-[#6750A4] text-white px-10 py-2 rounded-full text-sm shadow-md transition-all 
                         disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed">
            {{ enviando ? 'PROCESANDO...' : 'REGISTRAR' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>