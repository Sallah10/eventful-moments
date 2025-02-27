<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useAuth } from '@/composables/useAuth'

const route = useRoute()
const router = useRouter()
const { token } = useAuth()
const id = route.params.id // Get moment ID from route

const date = ref('')
const title = ref('')
const body = ref('')
const error = ref(null)

// Fetch existing moment data
const fetchMoment = async () => {
  try {
    const response = await axios.get(`https://eventful-moments-api.onrender.com/api/v1/moment/${id}`, {
      headers: {
        Authorization: `Bearer ${token.value}` // ✅ Added token to GET request
      }
    })

    const moment = response.data

    // ✅ Ensure correct date format for input[type="date"]
    date.value = moment.date ? new Date(moment.date).toISOString().split('T')[0] : ''

    title.value = moment.title
    body.value = moment.body
  } catch (err) {
    console.error('Error fetching moment:', err)
    error.value = 'Failed to load moment'
  }
}

// Update moment
const updateMoment = async () => {
  try {
    await axios.put(
      `https://eventful-moments-api.onrender.com/api/v1/moment/${id}`,
      {
        date: date.value,
        title: title.value,
        body: body.value,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.value}` // ✅ Fixed headers placement
        }
      }
    )

    router.push(`/buckets/${id}`)
  } catch (err) {
    console.error('Error updating moment:', err)
    error.value = 'Failed to update moment'
  }
}

onMounted(fetchMoment)
</script>

<template>
  <section class="section h-[100%] p-4">
    <div v-if="error" class="texterror">
      <p>{{ error }}</p>
    </div>

    <form @submit.prevent="updateMoment" class="form lg:w-[638px] lg:self-center bg-white p-6 rounded-xl shadow-md">
      <!-- Date -->
      <div class="gap-2 flex flex-col mb-4">
        <h3 class="textH3">Date in the future</h3>
        <input 
          type="date"
          v-model="date"
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
          v-model="body"
          required
        ></textarea>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="button bg-[#06C3B4] text-white px-4 py-2 rounded-lg w-full">
        Update
      </button>
    </form>
  </section>
</template>
