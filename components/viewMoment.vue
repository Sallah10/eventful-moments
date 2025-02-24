<!-- components/ViewMoment.vue -->
<script setup>
const { id } = useRoute().params
const moment = ref(null)
const error = ref(null)
const router = useRouter()

// Fetch moment details
const fetchMoment = async () => {
  // SINGLE MOMENT: https://eventful-moments-api.onrender.com/api/v1/moment/614556facd07331621f6bb0a
  try {
    const response = await axios.get(`https://eventful-moments-api.onrender.com/api/v1/moment/614556facd07331621f6bb0a/${id}`)
    moment.value = await response.json()
  } catch (err) {
    error.value = 'Failed to load moment'
  }
}

// Delete moment
const deleteItem = async () => {
  try {
    // DELETE: https://eventful-moments-api.onrender.com/api/v1/moment/61455767cd07331621f6bb0f
    await fetch(`https://eventful-moments-api.onrender.com/api/v1/moment/61455767cd07331621f6bb0f/${id}`, {
      method: 'DELETE'
    })
    router.push('/moments')
  } catch (err) {
    error.value = 'Failed to delete moment'
  }
}

onMounted(fetchMoment)
</script>

<template>
    <section class="section  h-[100%]">
        <h1 class="text-2xl font-bold md:textH1"> {{moment.title}}</h1>
        <h3 class="textH3 text-[#5271FF]">20/05/2023</h3>
        <p class="textP">
           {{ moment.body }}
        </p>
        <div class="flex gap-4 flex-col
        md:flex-row md:justify-between">
            <NuxtLink to="/editItem" class="button bg-[#06C3B4]">Edit</NuxtLink>
            <button @click="deleteItem" class="button bg-[#C34F06]">Delete</button>
            <!-- <button class="button bg-[#06C3B4]">Edit</button> -->
        </div>
    </section>
</template>