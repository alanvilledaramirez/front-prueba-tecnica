<script setup lang="ts">

defineProps<{
  logs: any[];
}>();
</script>

<template>
  <div class="space-y-4">
    <h2 class="text-lg font-medium px-2 text-[#1C1B1F]">Logs de Mongo DB</h2>
    <div class="bg-[#1C1B1F] rounded-[28px] p-6 shadow-xl border border-[#49454F]">
      <div class="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar font-mono text-[11px]">
        <div v-for="log in logs" :key="log._id" class="bg-[#2B2930] rounded-xl p-4 border border-[#49454F]">
           <pre class="text-[#B3FFB3] overflow-x-auto">{{ JSON.stringify(log, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #49454F; border-radius: 10px; }
</style>