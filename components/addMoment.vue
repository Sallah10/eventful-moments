<!-- const createMoment = async () => {
  try {
    if (!token.value) {
      error.value = "Authentication failed. Please log in again.";
      return;
    }

    if (!date.value || !title.value || !body.value) {
      error.value = "All fields are required!";
      return;
    }

    const formattedDate = new Date(date.value).toISOString().split('T')[0];

    const requestData = {
      date: formattedDate,
      title: title.value,
      body: body.value
    };

    console.log("Sending Data:", requestData); // Check if data is correct before sending

    const response = await axios.post(
      'https://eventful-moments-api.onrender.com/api/v1/moment',
      requestData,
      {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.value}`
        }
      }
    );

    console.log("API Response:", response.data); // Check response

    router.push(`/buckets/${response.data._id || response.data.id}`);

  } catch (err) {
    console.error("Error creating moment:", err.response?.data || err.message);
    error.value = err.response?.data?.message || "Failed to create moment";
  }
}; -->

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
  const formattedDate = new Date(date.value).toISOString().split('T')[0];
  try {
    const response = await axios.post(
      'https://eventful-moments-api.onrender.com/api/v1/moment',
      {
        date: formattedDate,
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
    
    console.log("Sending Data:", {
      date: date.value,
      title: title.value,
      body: body.value
    });

    const newMoment = response.data
    router.push(`/buckets/${newMoment._id}`)
  } catch (err) {
    console.error('Error creating moment:', err)
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
