<script setup lang="ts">
import axios from 'axios';
import MomentList from '~/components/momentList.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

const { token } = useAuth(); 

// const { id } = useRoute().params;

const error = ref('');
const me = ref<{ fullname?: string } | null>(null);

const momentListRef = ref<InstanceType<typeof MomentList> | null>(null);
const displayLimit = ref(5);
const hasMore = ref(true);

const loadMoreItems = () => {
  if (momentListRef.value) {
    momentListRef.value.loadMore();
  }
};

const handleLoadMoreStatus = (hasMoreItems: boolean) => {
  hasMore.value = hasMoreItems;
};

const fetchMoment = async () => {
  if (!token.value) {
    error.value = 'No token found. Please log in.';
    return;
  }

  try {
    const response = await axios.get('https://eventful-moments-api.onrender.com/api/v1/users/me', {
      headers: {
        Authorization: `Bearer ${token.value}` 
      }
    });

    me.value = response.data.data; 
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load moment';
  }
};

onMounted(fetchMoment);
</script>

<template>
  <section class="section h-[100%]">
    <div class="flex justify-between gap-6 flex-col md:flex-row">
      <div v-if="me" class="flex flex-col gap-4">
        <h1 class="text-2xl md:textH1 font-bold">Welcome {{ me.fullname }}</h1>
        <h1 v-if="error" class=" texterror">{{ error }}</h1>
        <p class="textP">Here are items in your eventful moment bucket.</p>
      </div>
      <NuxtLink to="/buckets/addItem" class="button">Add Item</NuxtLink>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-4">  
      <MomentList 
        ref="momentListRef"
        :limit="displayLimit"
        @load-more="handleLoadMoreStatus"
      />
    </div>
    <button 
      class="button"
      v-if="hasMore" 
      @click="loadMoreItems" 
      >Load More
    </button>
  </section>
</template>
