<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { useAuth } from '@/composables/useAuth';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

interface Moment {
  _id: string;
  title: string;
  details: string;
  createdAt: string;
  updatedAt: string;
}

const { token } = useAuth();

const props = defineProps({
  limit: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['loadMore']);

const allMoments = ref<Moment[]>([]);
const displayedMoments = ref<Moment[]>([]);
const error = ref<string | null>(null);
const isLoading = ref(false); // New loading state

const fetchMoments = async () => {
  if (!token.value) {
    error.value = 'No token found. Please log in.';
    return;
  }
  
  try {
    isLoading.value = true;
    error.value = null;
    
    const response = await axios.get('https://eventful-moments-api.onrender.com/api/v1/moment', {
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Cache-Control': 'no-cache' // Prevent caching
      }
    });
    
    // Debug log
    console.log('API Response:', response.data);
    
    allMoments.value = Array.isArray(response.data?.data) 
      ? response.data.data.filter((moment: any) => moment?.title?.trim())
      : [];
      
    displayedMoments.value = allMoments.value.slice(0, props.limit);
  } catch (err) {
    console.error('Fetch error:', err);
    error.value = 'Failed to load moments. Please try again.';
    allMoments.value = [];
    displayedMoments.value = [];
  } finally {
    isLoading.value = false;
  }
};

const loadMore = () => {
  const currentLength = displayedMoments.value.length;
  if (currentLength < allMoments.value.length) {
    const newLimit = Math.min(currentLength + 5, allMoments.value.length);
    displayedMoments.value = allMoments.value.slice(0, newLimit);
    
    emit('loadMore', newLimit < allMoments.value.length);
  }
};

defineExpose({ loadMore, fetchMoments });

// Initial load
onMounted(fetchMoments);

// Watch for route changes
watch(
  () => route.query,
  async (newQuery) => {
    if (newQuery.added) {
      await fetchMoments();
  setTimeout(() => {
    router.replace({ path: route.path });
  }, 500);
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="section">
    <div v-if="isLoading" class="text-center py-8">
      <p>Loading moments...</p>
    </div>
    
    <div v-else-if="error" class="textH2 text-center py-8">
      <p>{{ error }}</p>
    </div>
    
    <div v-else-if="displayedMoments.length">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-4">
        <div 
          v-for="moment in displayedMoments" 
          :key="moment._id" 
          class="card hover:bg-[#FFF5A7] self-center mx-auto"
        >
          <h2 class="text-lg md:textH2 font-bold">
            {{ moment.title }}
          </h2>
          <p class="textP">
            {{ moment.details }}
          </p>
          <div class="flex justify-between">
            <NuxtLink 
              :to="'/buckets/' + moment._id" 
              class="text-[#5271FF] hover:text-[#008289]"
            >
              View Details
            </NuxtLink>
            <div class="md:flex gap-4">
              <h3 class="textH3 text-[#B2B22B]">
                {{ new Date(moment.createdAt).toLocaleDateString() }}
              </h3>
            </div>
          </div>
        </div>
      </div>
      
      <button 
        v-if="displayedMoments.length < allMoments.length" 
        @click="loadMore"
        class="button"
        :disabled="isLoading"
      >
        {{ isLoading ? 'Loading...' : 'Load More' }}
      </button>
    </div>
    
    <div v-else class="textH2 text-center py-8">
      <p>No moments found.</p>
    </div>
  </div>
</template>