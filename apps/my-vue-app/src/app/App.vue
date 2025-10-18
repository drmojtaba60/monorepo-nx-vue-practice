<script setup lang="ts">
import { useTheme } from '@shared/ui-styles';
import { Card,Test,Carsoule } from '@components';
import { ref } from 'vue';
const { setTheme } = useTheme();

// داده‌های نمونه برای کاروسل
const carouselItems = ref([
  {
    image: 'https://placehold.co/800x400/4f46e5/white?text=اسلاید اول شروع کار',
    title: 'اسلاید اول',
    description: 'توضیحات اسلاید اول'
  },
  {
    image: 'https://placehold.co/800x400/0ea5e9/white?text=اسلاید دوم بررسی',
    title: 'اسلاید دوم',
    description: 'توضیحات اسلاید دوم'
  },
  {
    image: 'https://placehold.co/800x400/8b5cf6/white?text=اسلاید سوم و نهایی',
    title: 'اسلاید سوم',
    description: 'توضیحات اسلاید سوم'
  }
]);

</script>

<template>

  <div class="flex flex-col min-h-screen bg-gray-100">
    <!-- Header -->
    <header class="bg-white shadow p-4 flex justify-between items-center">
      <div class="text-lg font-bold">SmartTask Dashboard</div>
      <button class="lg:hidden p-2" id="menu-btn">
        <!-- آیکن همبرگر -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
             viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
    </header>

    <div class="flex flex-1">
      <!-- Sidebar -->
      <aside id="sidebar"
             class="bg-white shadow lg:w-64 w-64 fixed lg:relative transform -translate-x-full lg:translate-x-0 transition-transform duration-200 ease-out z-50">
        <nav class="p-4">
          <ul class="space-y-2">
            <li><a class="block p-2 rounded hover:bg-gray-100" href="#">Dashboard</a></li>
            <li><a class="block p-2 rounded hover:bg-gray-100" href="#">Tasks</a></li>
            <li><a class="block p-2 rounded hover:bg-gray-100" href="#">Settings</a></li>
          </ul>
        </nav>
      </aside>

      <!-- Main content -->
      <main class="flex-1 p-6">
        <div class="bg-white rounded-lg shadow p-4 min-h-[calc(100vh-8rem)]">
          <h1 class="text-2xl font-bold mb-4">Dashboard Overview</h1>

        </div>
      </main>
    </div>

    <!-- Footer -->
    <footer class="bg-white shadow mt-auto p-4 text-center text-gray-600">
      © 2025 SmartTask AI. All rights reserved.
    </footer>
  </div>
</template>
