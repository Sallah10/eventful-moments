<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useAuth } from '@/composables/useAuth'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

interface Moment {
  _id: string;
  title: string;
  details: string;
  createdAt: string;
  updatedAt: string;
}

const { token } = useAuth();

const props = defineProps({
  limit: {
    type: Number,
    required: true
  }
});

// Emit event to parent when there are no more items to load
const emit = defineEmits(['loadMore']);

// allMoments holds the full list of moments fetched from the API
const allMoments = ref<Moment[]>([]);

// displayedMoments holds the subset currently displayed
const displayedMoments = ref<Moment[]>([]);
const error = ref<string | null>(null);

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
    
    // Filter out moments that are "empty" (for example, with no title)
    const data = response.data.data;
    allMoments.value = Array.isArray(data)
      ? data.filter((moment: any) => moment.title && moment.title.trim() !== '')
      : [];

    displayedMoments.value = allMoments.value.slice(0, props.limit);
  } catch (err) {
    error.value = 'Failed to load moments';
  }
};

const loadMore = () => {
  const currentLength = displayedMoments.value.length;
  if (currentLength < allMoments.value.length) {
    const newLimit = currentLength + 5;
    displayedMoments.value = allMoments.value.slice(0, newLimit);
    
    // If we've loaded all items, notify the parent
    if (displayedMoments.value.length >= allMoments.value.length) {
      emit('loadMore', false); // No more to load
    } else {
      emit('loadMore', true);
    }
  }
};

defineExpose({ loadMore, fetchMoments  });

onMounted(() => {
  fetchMoments() 
  if (route.query.added) {
    setTimeout(() => {
      fetchMoments();
      router.replace({ path: route.path }); // Properly remove the query param
    }, 500);
  }
})

</script>

<template>
  <div>
    <div v-if="error" class="textH2 text-center py-8">
      <p>{{ error }}</p>
    </div>
    <div v-else-if="displayedMoments.length">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-4">
        <div v-for="moment in displayedMoments" :key="moment._id" class="card hover:bg-[#FFF5A7] self-center mx-auto">
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
              <h3 class="textH3">{{ moment.updatedAt }}</h3>
            </div>
          </div>
        </div>
      </div>
      <button class="button" v-if="displayedMoments.length < allMoments.length" @click="loadMore">
        Load More
      </button>
    </div>
    <div v-else class="textH2 text-center py-8">
      <p>No moments found.</p>
    </div>
  </div>
</template>
