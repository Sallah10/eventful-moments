<script setup>
import axios from 'axios'

const route = useRoute()
const router = useRouter()
import { useAuth } from '@/composables/useAuth'

const { token } = useAuth()
// const { id } = route.params
const id = ref('')
const date = ref('')
const title = ref('')
const body = ref('')
const error = ref(null)

// Fetch existing moment data
const fetchMoment = async () => {
  try {
       // https://eventful-moments-api.onrender.com/api/v1/moment/61455755cd07331621f6bb0d
    const response = await axios.get(`https://eventful-moments-api.onrender.com/api/v1/moment/${id}`)
    const moment = await response.json()
    id.value = moment._id
    date.value = moment.date
    title.value = moment.title
    body.value = moment.body
  } catch (err) {
    error.value = 'Failed to load moment'
  }
}

const updateMoment = async () => {
  try {
    await axios.put(`https://eventful-moments-api.onrender.com/api/v1/moment/${id}`, {
      headers: {
        'Content-Type': 'application/json'
        ,
          'Authorization': `Bearer ${token.value}`
      },
      data: {
        date: date.value,
        title: title.value,
        body: body.value,
      }
    })
    
    router.push(`/buckets/${id}`)
  } catch (err) {
    error.value = 'Failed to update moment'
  }
}

onMounted(fetchMoment)
</script>
<template>
   <section class="section h-[100%]">
         <form @submit.prevent="updateMoment" action="" class="form lg:w-[638px] lg:self-center">
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
                  class="rounded-2xl w-full h-[459px] border-[#707070] border-2 px-6 py-4"
                  v-model="body"
                  required
                 ></textarea>
             </div>
             <button type="submit" class="button">Update</button>
         </form>
    </section>
</template>