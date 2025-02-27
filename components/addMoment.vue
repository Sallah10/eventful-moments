<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useAuth } from '@/composables/useAuth'

const { token } = useAuth()

const router = useRouter()

const title = ref('')
const body = ref('')
const date = ref('')
const error = ref(null)

const createMoment = async () => {
  try {
    const response = await axios.post(
      'https://eventful-moments-api.onrender.com/api/v1/moment',
      {
        date: date.value,
        title: title.value,
        body: body.value,
      },
      {
        headers: { 
          'Content-Type': 'application/json' ,
          'Authorization': `Bearer ${token.value}` // Attach token in request
        }
      }
    )
    
    const newMoment = response.data
    router.push(`/buckets/${newMoment.id}`)
  } catch (err) {
    error.value = 'Failed to create moment'
  }
}
</script>

<template>
  <section class="section h-[100%]">
    <form @submit.prevent="createMoment" class="form lg:w-[638px] lg:self-center">
      <div class="gap-2 flex flex-col">
        <h3 class="textH3">Date in the future</h3>
        <input 
          type="date" 
          v-model="date" 
          class="rounded-2xl w-full border-[#707070] border-2 px-6 py-4"
          required 
        />
      </div>
      <div class="gap-2 flex flex-col">
        <h3 class="textH3">Title</h3>
        <input 
          type="text"  
          v-model="title" 
          class="rounded-2xl w-full border-[#707070] border-2 px-6 py-4"
          required 
        />
      </div>
      <div class="gap-2 flex flex-col">
        <h3 class="textH3">Details</h3>
        <textarea 
          v-model="body" 
          class="rounded-2xl w-full h-[459px] border-[#707070] border-2 px-6 py-4"
          required 
        ></textarea>
      </div>
      <button type="submit" class="button">Save</button>
      <NuxtLink to="/buckets" class="button bg-red-600">Cancel</NuxtLink>
    </form>
  </section>
</template>
