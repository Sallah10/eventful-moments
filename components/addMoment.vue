<script setup>
const router = useRouter()
const title = ref('')
const body = ref('')
const date = ref('')
const error = ref(null)

const createMoment = async () => {
  try {
    // https://eventful-moments-api.onrender.com/api/v1/moment
    const response = await axios.post('https://eventful-moments-api.onrender.com/api/v1/moment', {
        date: date.value,
        title: title.value,
        body: body.value,
        userId: 1 // Assuming we have user authentication
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
    });
    
    const newMoment = await response.json()
    router.push(`/buckets/${newMoment.id}`)
  } catch (err) {
    error.value = 'Failed to create moment'
  }
}
</script>
<template>
  <section class="section  h-[100%]">
         <form @submit.prevent="addItem" action="" class="form lg:w-[638px] lg:self-center ">
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
                 class="rounded-2xl w-full border-[#707070] border-2 px-6 py-4"
                 v-model="title"
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
             <button type="submit" class="button">Save</button>
             <NuxtLink to="/moments" class="button bg-gray-500 px-6 py-2 rounded text-white">
              Cancel
            </NuxtLink>
         </form>
    </section>
</template>