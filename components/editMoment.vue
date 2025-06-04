<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useAuth } from '@/composables/useAuth'
// const emit = defineEmits(['momentAdded'])

const route = useRoute()
const router = useRouter()
const { token } = useAuth()
const id = route.params.id

const futureDate = ref('')
const title = ref('')
const details = ref('')
const error = ref<string | null>(null)

// Fetch existing moment data
const fetchMoment = async () => {
  if (!token.value) {
    error.value = "Authentication token is missing";
    return;
  }

  try {
    const response = await axios.get(`https://eventful-moments-api.onrender.com/api/v1/moment/${id}`, {
      headers: {
        Authorization: `Bearer ${token.value}` 
      }
    })

    // Log response to see its structure
    console.log("Fetched moment response:", response.data)

    // If the API returns the moment wrapped in a "data" property, update accordingly:
    const momentData = response.data.data || response.data;
    
    futureDate.value = momentData.futureDate ? new Date(momentData.futureDate).toISOString().split('T')[0] : ''
    title.value = momentData.title
    details.value = momentData.details

  } catch (err) {
    console.error('Error fetching moment:', err)
    error.value = 'Failed to load moment'
  }
}

// Update moment
const updateMoment = async () => {
  try {
    await axios.patch(
      `https://eventful-moments-api.onrender.com/api/v1/moment/${id}`,
      {
        futureDate: new Date(futureDate.value).toISOString().split("T")[0],
        title: title.value,
        details: details.value,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.value}`
        }
      }
    )
    //  emit('momentAdded')
    router.push({ path: `/buckets/${id}`, query: { added: 'true' } });
    // router.push(`/buckets/${id}`)
  } catch (err) {
    console.error('Error updating moment:', err)
    error.value = 'Failed to update moment'
  }
}

onMounted(fetchMoment)
</script>

<template>
  <section class="section h-[100%]">
    <div v-if="error" class="texterror">
      <p>{{ error }}</p>
    </div>

    <form @submit.prevent="updateMoment" class="form lg:w-[638px] lg:self-center bg-white p-6 rounded-xl shadow-md">
      <!-- Date -->
      <div class="gap-2 flex flex-col mb-4">
        <h3 class="textH3">Date in the future</h3>
        <input 
          type="date"
          v-model="futureDate"
          class="rounded-2xl w-full border-[#707070] border-2 px-6 py-4"
          required
        />
      </div>

      <!-- Title -->
      <div class="gap-2 flex flex-col mb-4">
        <h3 class="textH3">Title</h3>
        <input 
          type="text" 
          v-model="title" 
          class="rounded-2xl w-full border-[#707070] border-2 px-6 py-4"
          required
        />
      </div>

      <!-- Details -->
      <div class="gap-2 flex flex-col mb-6">
        <h3 class="textH3">Details</h3>
        <textarea 
          class="rounded-2xl w-full h-[459px] border-[#707070] border-2 px-6 py-4"
          v-model="details"
          required
        ></textarea>
      </div>
      <!-- Error Message -->
      <div v-if="error" class="texterror mb-4">
        <p>{{ error }}</p>  
      </div>
      <!-- Success Message -->
      <div v-if="!error" class="text-green-600 mb-4">
        <p>Moment updated successfully!</p>
      </div>
      <!-- Submit Button -->
      <button type="submit" class="button bg-[#06C3B4] text-white self-center">
        Update
      </button>
    </form>
  </section>
</template>
