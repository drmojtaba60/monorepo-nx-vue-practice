<script lang="ts">
import { defineComponent } from 'vue';
import { Card, Carsoule } from '@components';

export default defineComponent({
  name: 'Carusole',
  components: { Carsoule, Card },
});
</script>

<template>
  <div class="flex flex-col justify-center h-scree w-screen m-auto p-5">
    <h1 class="bg-blue-600 text-white font-extrabold rounded-xl p-5">
      Hi MonoRepo App with Nx
    </h1>
    <div class="p-4">
      <button
        @click="setTheme('ocean')"
        class="px-3 py-2 bg-blue-600 text-white rounded"
      >
        Ocean
      </button>
      <button
        @click="setTheme('forest')"
        class="px-3 py-2 bg-green-600 text-white rounded"
      >
        Forest
      </button>
    </div>
    <div>
      <Card />
    </div>

    <!-- استفاده از کامپوننت کاروسل -->
    <Carsoule
      :items="carouselItems"
      :auto-play="true"
      :interval="2000"
      :show-dots="true"
      :show-arrows="true"
    />
  </div>
</template>

<style scoped></style>
