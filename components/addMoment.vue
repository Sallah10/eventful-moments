<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useAuth } from '@/composables/useAuth'
const { token } = useAuth()
const route = useRoute()
// const id = route.params.id 
const router = useRouter()
const title = ref('')
const details = ref('')
const futureDate = ref('')
const error = ref(null)



const createMoment = async () => {
  try {
    if (!token.value) {
      error.value = "Authentication failed. Please log in again.";
      return;
    }

    if (!futureDate.value || !title.value || !details.value) {
      error.value = "All fields are required!";
      return;
    }

    if (!futureDate.value) {
      error.value = "Date is required!";
      return;
    }
    
    const formattedDate = new Date(futureDate.value).toISOString().split('T')[0];
    
    const requestData = {
      title: title.value,
      details: details.value,
      futureDate: formattedDate 
    };
    
    console.log("Sending Data:", requestData); // Log the ACTUAL data being sent
    
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
    
    console.log("API Response:", response.data);
    const momentId = response.data.data._id;
    // emit('momentAdded')
    
    if (momentId) {
      router.push({ path: `/buckets/${momentId}`, query: { added: 'true' } });
      // router.push(`/buckets/${momentId}`);
    } else {
      console.error("Could not find moment ID in response");
      error.value = "Created moment but couldn't navigate to details view";
      router.push('/buckets');
    }
  }catch (err) {
    console.error("Error creating moment:", err);
    if (err.response) {
      console.error("Response data:", err.response.data);
      console.error("Response status:", err.response.status);
      error.value = err.response.data?.message || `Error ${err.response.status}: Failed to create moment`;
    } else if (err.request) {
      console.error("No response received");
      error.value = "Server did not respond. Please try again later.";
    } else {
      console.error("Error message:", err.message);
      error.value = err.message || "An unexpected error occurred";
    }
  }
};
</script>

<template>
  <section class="section h-[100vh]">
    <form @submit.prevent="createMoment" class="form lg:w-[638px] lg:self-center">
      <div class="gap-2 flex flex-col">
        <h3 class="textH3">Date in the future</h3>
        <input 
          type="date" 
          v-model="futureDate" 
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
          v-model="details" 
          class="rounded-2xl w-full h-[459px] border-[#707070] border-2 px-6 py-4"
          required 
        ></textarea>
      </div>
      <button type="submit" class="button">Save</button>
      <NuxtLink to="/buckets" class="button bg-red-600">Cancel</NuxtLink>
    </form>
  </section>
</template>
