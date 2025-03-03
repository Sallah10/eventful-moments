<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { VueSpinnerBars } from 'vue3-spinners';
import axios from 'axios'
import { useAuth } from '@/composables/useAuth';

const { token } = useAuth(); 

const route = useRoute()
const router = useRouter()
const id = route.params.id 
const moment = ref(null)
const error = ref(null)
const loading = ref(true)

// Fetch moment details
const fetchMoment = async () => {
  if (!id) {
    error.value = 'No moment ID provided'
    loading.value = false
    return;
  }

  try {
    loading.value = true
    const response = await axios.get(`https://eventful-moments-api.onrender.com/api/v1/moment/${id}`, {
      headers: {
        Authorization: `Bearer ${token.value}` 
      }
    });
    
    moment.value = response.data.data || null;
    if (!moment.value) error.value = 'Moment not found';
  } catch (err) {
    console.error('Error fetching moment:', err)
    error.value = err.response?.data?.message || 'Failed to load moment'
  } finally {
    loading.value = false
  }
}

// Delete moment
const deleteItem = async () => {
  if (!confirm('Are you sure you want to delete this moment?')) return

  try {
    await axios.delete(`https://eventful-moments-api.onrender.com/api/v1/moment/${id}`, {
      headers: {
        Authorization: `Bearer ${token.value}` 
      }
    })
    router.push('/buckets') 
  } catch (err) {
    console.error('Error deleting moment:', err)
    error.value = err.response?.data?.message || 'Failed to delete moment'
  }
}

onMounted(fetchMoment)
</script>

<template>
  <section class="section h-[100vh] p-4">
    <!-- Loading Spinner -->
    <div v-if="loading" class="text-center py-8">
      <p>Loading moment...</p>
      <VueSpinnerBars v-if="loading" class="text-[#06C3B4] flex self-center"/>
    </div>

    <!-- Error Message -->
    <div v-else-if="error" class="texterror">
      <p>{{ error }}</p>
    </div>

    <!-- Display Moment -->
    <div v-else-if="moment">
        <h1 class="text-2xl font-bold md:textH1">{{ moment.title }}</h1>
        <h3 class="textH3 text-[#5271FF]">
          {{ moment.createdAt ? new Date(moment.createdAt).toLocaleDateString() : 'Date not available' }}
        </h3>
        <p class="textP">
          {{ moment.details }}
        </p>

      <!-- Action Buttons -->
      <div class="flex gap-4 flex-col md:flex-row md:justify-between mt-6">
        <NuxtLink :to="`/buckets/${id}/editItem`" class="button bg-[#06C3B4] px-4 py-2 text-white rounded text-center">
          Edit
        </NuxtLink>
        <button @click="deleteItem" class="button bg-[#C34F06] px-4 py-2 text-white rounded text-center">
          Delete
        </button>
      </div>
    </div>

    <!-- No Data -->
    <div v-else class="text-center py-8">
      <p>No moment Details found</p>
    </div>
  </section>
</template>
