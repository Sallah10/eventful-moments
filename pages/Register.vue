<script setup>
//add spinner and use
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  VueSpinnerBars,
  // ...
} from 'vue3-spinners';

    definePageMeta({
        layout: "custom",
    });

    const router = useRouter();

    const formData = reactive({
        name : (''),
        email : (''),
        password : ('')
    })

    const error = ref(null)
    const loading = ref(false)

const handleSignUp = async () => {
  try{
    loading.value = true
    error.value = null

    const response = await axios.post('https://eventful-moments-api.onrender.com/api/v1/users/signup',formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok){
        throw new Error('Wrong Credentials Provided(Registration Failed)')
    }

    const { user, token } = await response.json()
    useAuth(user, token)
    router.push('/')
  }
  catch (error){
    error.value = error.message || 'Registration Failed'
  }
  finally {
    loading.value = false
  }
};

</script>

<template>
    <section class="section  md:items-center lg:gap-4 lg:pt-2 md:h-[100vh] sm:100vh">
        <div>
            <h1 class="textH1 self-start">Create an account,</h1>
        </div>
        <h2 class="textH2 lg:w-[626px]">
            Hi, my name is Eventful Moments, I am a bucket… no, not the bucket of water but I store awesome moments you will like to have in coming years.
        </h2>
        <form @submit.prevent="handleSignUp" class="form">
            <div class="gap-2 flex flex-col ">
                <h3 class="textH3">Fullname</h3>
                <input 
                type="text"  
                v-model="formData.name"
                required
                class="rounded-2xl w-full border-[#707070] border-2 px-6 py-4 md:w-[626px]"/>
            </div>
            <div class="gap-2 flex flex-col ">
                <h3 class="textH3">Email</h3>
                <input 
                type="email"  
                v-model="formData.email"
                required
                class="rounded-2xl w-full border-[#707070] border-2 px-6 py-4 md:w-[626px]"/>
            </div>
            <div class="gap-2 flex flex-col">
                <h3 class="textH3">Password</h3>
                <input 
                type="password"
                v-model="formData.password"
                class="rounded-2xl w-full border-[#707070] border-2 px-6 py-4 md:w-[626px]"
                required
                />
            </div>
            <button 
                type='submit' 
                :disabled="loading"
                class="button lg:h-[54px]">
            {{ loading ? 'Creating account...' : 'Create' }}
            </button>
            <p v-if="error" class="texterror">{{ error }}</p>
            <VueSpinnerBars v-if="loading" color="#06C3B4"/>
        </form>
        <div class="text-center textp">
            <NuxtLink to="/" class="text-[#06C3B4] hover:text-[#05a89c] mb-2">
                Already have an account? Sign in
            </NuxtLink>
        </div>
    </section>
</template>