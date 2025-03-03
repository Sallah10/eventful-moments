<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useAuth } from '@/composables/useAuth';

const { token } = useAuth();

const props = defineProps({
  limit: {
    type: Number,
    default: 5
  }
});

// Define an event to notify parent when user wants more items
const emit = defineEmits(['loadMore']);

const moments = ref([])
const LoadedMoments = ref([])
const error = ref(null)

const fetchMoments = async () => {
  if (!token.value) {
    error.value = 'No token found. Please log in.';
    return;
  }
  try {
    const response = await axios.get('https://eventful-moments-api.onrender.com/api/v1/moment', {
      headers: {
        Authorization: `Bearer ${token.value}` 
      }
    });
    moments.value = response.data.data;

    LoadedMoments.value = moments.value.slice(0, props.limit);
  } catch (err) {
    error.value = 'Failed to load moments'
  }
}

// Method to handle loading more when called from parent
const loadMore = () => {
  if (moments.value.length < allMoments.value.length) {
    const newLimit = moments.value.length + 5;
    moments.value = moments.value.slice(0, newLimit);
    
    // If we've shown all moments now, notify parent
    if (LoadedMoments.value.length >= moments.value.length) {
      emit('loadMore', false); // No more to load
    }
  }
};

// Expose loadMore method to parent component
defineExpose({ loadMore });

onMounted(fetchMoments)
</script>

<template>
  <div v-if="LoadedMoments.length">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-4">
      <div v-for="moment in moments" :key="moment._id" class="card hover:bg-[#FFF5A7] self-center mx-auto">
        <h2 class="text-lg md:textH2 font-bold">
          {{ moment.title }}
        </h2>
        <p class="textP">
          {{ moment.details }}
        </p>
        <div class="flex justify-between">
          <NuxtLink :to="'/buckets/' + moment._id" class="text-[#5271FF] hover:text-[#008289]">
            View Details
          </NuxtLink>
          <div class="md:flex gap-4">
            <h3 class="textH3 text-[#B2B2B2]">{{ moment.createdAt }}</h3>
            <!-- new Date(moment.createdAt).toLocaleDateString() -->
            <h3 class="textH3">{{ moment.updatedAt }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="textH2 text-center py-8">
    No moments found.
  </div>
</template>
