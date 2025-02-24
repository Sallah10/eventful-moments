<script setup lang="ts">
import axios from 'axios';
import MomentList from '~/components/momentList.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const { id } = useRoute().params;
const error = ref('');
const me = ref<{ name?: string } | null>(null); // Define `me` as a reactive object

// Fetch user data
const fetchMoment = async () => {
  try {
    const response = await axios.get('https://eventful-moments-api.onrender.com/api/v1/users/me');
    me.value = response.data; // Assign the response data to `me`
  } catch (error: any) {
    error.value = error.message || 'Failed to load moment'
    // error.value = err.message || 'Failed to load moment';
  }
};

onMounted(fetchMoment);
</script>

<template>
  <section class="section h-[100%]">
    <div class="flex justify-between gap-6 flex-col md:flex-row">
      <div v-if="me" class="flex flex-col gap-4">
        <h1 class="text-2xl md:textH1 font-bold">Welcome {{ me.name }}</h1>
        <h1 v-if="error">{{ error }}</h1>
        <p class="textP">Here are items in your eventful moment bucket.</p>
      </div>
      <NuxtLink to="/addItem" class="button">Add Item</NuxtLink>
    </div>
    <MomentList />
    <button class="button">Load More</button>
  </section>
</template>
