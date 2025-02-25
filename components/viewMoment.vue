<!-- components/ViewMoment.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const id = route.params.id // Get the ID from the route params
const moment = ref(null)
const error = ref(null)
const loading = ref(true)

// Fetch moment details
const fetchMoment = async () => {
  try {
    loading.value = true
    // Use the ID from the route to fetch the specific moment
    const response = await axios.get(`https://eventful-moments-api.onrender.com/api/v1/moment/${id}`)
    
    // Check if there's valid data
    if (response.data) {
      moment.value = response.data
    } else {
      error.value = 'Moment not found'
    }
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
    // Use the ID from the route for deletion
    await axios.delete(`https://eventful-moments-api.onrender.com/api/v1/moment/${id}`)
    router.push('/buckets') // Redirect after successful deletion
  } catch (err) {
    console.error('Error deleting moment:', err)
    error.value = err.response?.data?.message || 'Failed to delete moment'
  }
}

// Call fetchMoment when component is mounted
onMounted(() => {
  if (id) {
    fetchMoment()
  } else {
    error.value = 'No moment ID provided'
    loading.value = false
  }
})
</script>

<template>
  <section class="section h-full p-4">
    <div v-if="loading" class="text-center py-8">
      <p>Loading moment...</p>
    </div>
    
    <div v-else-if="error" class="text-red-500 text-center py-8">
      <p>{{ error }}</p>
    </div>
    
    <div v-else-if="moment">
      <h1 class="text-2xl font-bold md:textH1">{{ moment.title }}</h1>
      <h3 class="textH3 text-[#5271FF]">
        {{ moment.createdAt ? new Date(moment.createdAt).toLocaleDateString() : 'Date not available' }}
      </h3>
      <p class="textP mt-4">
        {{ moment.body }}
      </p>
      <div class="flex gap-4 flex-col md:flex-row md:justify-between mt-6">
        <NuxtLink :to="`/editItem/${id}`" class="button bg-[#06C3B4] px-4 py-2 text-white rounded text-center">
          Edit
        </NuxtLink>
        <button @click="deleteItem" class="button bg-[#C34F06] px-4 py-2 text-white rounded text-center">
          Delete
        </button>
      </div>
    </div>
    
    <div v-else class="text-center py-8">
      <p>No moment found</p>
    </div>
  </section>
</template>