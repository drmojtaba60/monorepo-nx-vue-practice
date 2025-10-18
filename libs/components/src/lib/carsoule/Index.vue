<template>
  <div class="carousel-container">
    <!-- Main Carousel Wrapper -->
    <div
      class="relative w-full max-w-6xl mx-auto overflow-hidden rounded-2xl shadow-xl"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
      @keydown="handleKeyDown"
      tabindex="0"
      role="region"
      aria-label="Image Carousel"
    >
      <!-- Slides Container -->
      <div class="relative h-96 md:h-[500px]">
        <transition-group
          name="slide"
          tag="div"
          class="absolute inset-0"
        >
          <div
            v-for="(item, index) in items"
            :key="index"
            v-show="index === currentIndex"
            class="absolute inset-0 transition-opacity duration-700 ease-in-out"
          >
            <img
              v-if="item.image"
              :src="item.image"
              :alt="item.title || `Slide ${index + 1}`"
              class="w-full h-full object-cover"
              loading="lazy"
            />
            <div
              v-else
              class="w-full h-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center"
            >
              <h3 class="text-white text-2xl font-bold">{{ item.title }}</h3>
            </div>

            <!-- Content Overlay -->
            <div
              v-if="item.title || item.description"
              class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white"
            >
              <h3
                v-if="item.title"
                class="text-xl md:text-2xl font-bold"
              >
                {{ item.title }}
              </h3>
              <p
                v-if="item.description"
                class="mt-2 text-sm md:text-base"
              >
                {{ item.description }}
              </p>
            </div>
          </div>
        </transition-group>
      </div>

      <!-- Navigation Arrows -->
      <template v-if="showArrows">
        <button
          @click="prevSlide"
          class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-20 backdrop-blur-sm transition-all duration-300"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          @click="nextSlide"
          class="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-20 backdrop-blur-sm transition-all duration-300"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </template>

      <!-- Dots Indicator -->
      <template v-if="showDots">
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          <button
            v-for="(item, index) in items"
            :key="index"
            @click="goToSlide(index)"
            :class="[
              'w-3 h-3 rounded-full transition-all duration-300',
              index === currentIndex
                ? 'bg-white w-6'
                : 'bg-white/50 hover:bg-white/80'
            ]"
            :aria-label="`Go to slide ${index + 1}`"
          />
        </div>
      </template>

      <!-- Progress Indicator -->
      <div class="absolute top-4 right-4 bg-black/30 text-white text-xs px-2 py-1 rounded-full z-20 backdrop-blur-sm">
        {{ currentIndex + 1 }} / {{ items.length }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

// Props
const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  autoPlay: {
    type: Boolean,
    default: true
  },
  interval: {
    type: Number,
    default: 3000
  },
  showDots: {
    type: Boolean,
    default: true
  },
  showArrows: {
    type: Boolean,
    default: true
  }
});

// Reactive state
const currentIndex = ref(0);
const isHovered = ref(false);
let intervalId = null;

// Methods
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % props.items.length;
};

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + props.items.length) % props.items.length;
};

const goToSlide = (index) => {
  currentIndex.value = index;
};

const handleKeyDown = (e) => {
  if (e.key === 'ArrowLeft') {
    prevSlide();
  } else if (e.key === 'ArrowRight') {
    nextSlide();
  }
};

// Auto-play effect
const startAutoPlay = () => {
  if (props.autoPlay && !isHovered.value) {
    intervalId = setInterval(() => {
      nextSlide();
    }, props.interval);
  }
};

const stopAutoPlay = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
};

// Watchers
watch(
  () => isHovered.value,
  (newVal) => {
    if (newVal) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  }
);

watch(
  () => props.autoPlay,
  (newVal) => {
    if (newVal) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }
  }
);

// Lifecycle hooks
onMounted(() => {
  startAutoPlay();
});

onUnmounted(() => {
  stopAutoPlay();
});
</script>

<style scoped>
/* Slide transition styles */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.7s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

/* Ensure only one slide is visible at a time */
.absolute.inset-0 {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
