<script setup>
import axios from 'axios'

const moments = ref([])
const error = ref(null)

const fetchMoments = async () => {
  try {
    // <!--  ALL MOMENTS: https://eventful-moments-api.onrender.com/api/v1/moment -->
    const response = await axios.get('https://eventful-moments-api.onrender.com/api/v1/moment')
    moments.value = await response.json()
  } catch (err) {
    error.value = 'Failed to load moments'
  }
}

onMounted(fetchMoments)
</script>
<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-4">
            <div class="card hover:bg-[#FFF5A7] self-center mx-auto">
                <h2 class="text-lg md:textH2 font-bold">
                    {{moments.title}}
                </h2>
                <p class="textP">
                   {{moments.body}}
                </p>
                <div class="flex justify-between">
                    <NuxtLink :to="'/buckets/' + moments.id" class="text-[#5271FF] hover:text-[#008289]">
                        View Details
                    </NuxtLink>
                    <div class="md:flex gap-4">
                        <h3 class="textH3 text-[#B2B2B2]">{{moments.createdAt}}</h3>
                        <h3 class="textH3">{{moments.updatedAt}}</h3>
                    </div>
                </div>
            </div>
        </div>
</template>