<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useAuth } from '@/composables/useAuth';

const { token } = useAuth(); // Get the token from authentication

const moments = ref([])
const error = ref(null)

const fetchMoments = async () => {
  if (!token.value) {
    error.value = 'No token found. Please log in.';
    return;
  }
  try {
    const response = await axios.get('https://eventful-moments-api.onrender.com/api/v1/moment', {
      headers: {
        Authorization: `Bearer ${token.value}` // Send token in the headers
      }
    });
    moments.value = response.data;
  } catch (err) {
    error.value = 'Failed to load moments'
  }
}

onMounted(fetchMoments)
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-4">
    <div v-for="moment in moments" :key="moment.id" class="card hover:bg-[#FFF5A7] self-center mx-auto">
      <h2 class="text-lg md:textH2 font-bold">
        {{ moment.title }}
      </h2>
      <p class="textP">
        {{ moment.body }}
      </p>
      <div class="flex justify-between">
        <NuxtLink :to="'/buckets/' + moment.id" class="text-[#5271FF] hover:text-[#008289]">
          View Details
        </NuxtLink>
        <div class="md:flex gap-4">
          <h3 class="textH3 text-[#B2B2B2]">{{ moment.createdAt }}</h3>
          <h3 class="textH3">{{ moment.updatedAt }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>
