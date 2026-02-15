<script setup lang="ts">
import type { Solicitud } from '../services/api';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

defineProps<{
  solicitudes: Solicitud[];
  cargando: boolean;
}>();

const getEstadoClass = (estado: string) => {
  switch (estado?.toUpperCase()) {
    case 'APROBADA': return 'bg-green-100 text-green-700 border-green-200';
    case 'RECHAZADA': return 'bg-red-100 text-red-700 border-red-200';
    default: return 'bg-amber-100 text-amber-700 border-amber-200';
  }
};
</script>

<template>
  <div class="bg-white border border-[#CAC4D0] rounded-[28px] shadow-sm overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-left text-[13px] border-collapse min-w-[1600px]">
        <thead class="bg-[#F7F2FA] border-b border-[#CAC4D0]">
          <tr class="text-[#49454F] font-bold uppercase text-[10px] tracking-widest">
            <th class="p-5">Nombre</th>
            <th class="p-5">Correo</th>
            <th class="p-5">Telefono</th>
            <th class="p-5">Pais</th>
            <th class="p-5">Tipo documento</th>
            <th class="p-5">Numero documento</th>
            <th class="p-5">URL Imagen</th>
            <th class="p-5">Nivel de riesgo</th>
            <th class="p-5">Estado</th> <th class="p-5 text-right">Fecha</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="cargando">
            <td colspan="10" class="p-10 text-center text-gray-400 italic">Consultando PostgreSQL...</td>
          </tr>
          <tr v-else-if="solicitudes.length === 0">
            <td colspan="10" class="p-10 text-center text-gray-500 font-medium">No se encontraron registros.</td>
          </tr>
          <tr v-for="s in solicitudes" :key="s.id" class="border-b border-[#CAC4D0]/50 last:border-0 hover:bg-[#F3EDF7]/30">
            <td class="p-5 text-black font-normal">{{ s.nombre_completo }}</td>
            <td class="p-5 text-black font-normal">{{ s.email }}</td>
            <td class="p-5 text-black font-normal">{{ s.telefono }}</td>
            <td class="p-5 text-black font-normal">{{ s.pais }}</td>
            <td class="p-5 text-black font-normal uppercase">{{ s.tipo_documento }}</td>
            <td class="p-5 text-black font-normal font-mono">{{ s.numero_documento }}</td>
            <td class="p-5 text-black font-normal break-all max-w-[300px]">{{ s.url_imagen }}</td>
            <td class="p-5 text-black font-normal">
                <span :class="s.nivel_riesgo === 'ALTO' ? 'text-red-600' : 'text-gray-700'">{{ s.nivel_riesgo }}</span> 
                <span class="text-[11px] text-gray-500">({{ s.score_riesgo }})</span>
            </td>
            
            <td class="p-5">
              <span :class="getEstadoClass(s.estado || 'PENDIENTE')" class="px-3 py-1 rounded-full text-[11px] font-bold border"> {{ s.estado || 'PENDIENTE' }}</span>
            </td>

            <td class="p-5 text-right text-black font-normal">{{ s.fecha_creacion ? format(new Date(s.fecha_creacion), 'dd/MM/yyyy HH:mm', { locale: es }) : '---' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>