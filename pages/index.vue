<script setup>
//add spinner and use
import { ref } from 'vue';
import { useRouter } from 'vue-router';
    definePageMeta({
            layout: "custom",
        });
        
    const router = useRouter()
    const {setAuth} = useAuth()

    const formData = reactive({
        email: '',
        password: ''
    })

    const error = ref(null)
    const loading = ref(false)
    // const errorMessage = ref('');

    const handleLogin = async () => {
        try{
            loading.value = true
            error.value = null
            
            const response = await axios.post('https://api.example.com/auth/login', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
                });

            if (!response.ok) {
            throw new Error('Invalid credentials')
            }
            
            const { user, token } = await response.json()
            setAuth(user, token)
            router.push('/buckets')
        } catch (error) {
            error.value = error.message || 'Login failed'
        } finally {
            loading.value = false
        }
    };
</script>

<template>
    <section class="section md:items-center lg:gap-4 lg:pt-2">
      <!-- class="w-100% lg:w-[626px]" md:max-w-[626px]-->
        <div >
            <h1 class="textH1 self-start">Welcome back,</h1>
        </div>
        <h2 class="textH2 lg:w-[626px]">
            Hi, my name is Eventful Moments, I am a bucket… no, not the bucket of water but I store awesome moments you will like to have in coming years.
        </h2>
        <form @submit.prevent="handleLogin" class="form" >
            <div class="gap-2 flex flex-col">
                <h3 class="textH3">Email</h3>
                <input 
                type="email"  
                class="rounded-2xl w-full border-[#707070] border-2 px-6 py-4 md:w-[626px]"
                v-model="email"
                required
                />
            </div>
            <div class="gap-2 flex flex-col">
                <h3 class="textH3">Password</h3>
                <input 
                type="password"
                class="rounded-2xl w-full border-[#707070] border-2 px-6 py-4 md:w-[626px]"
                v-model="password"
                required
                />
            </div>
            <button type="submit" 
            :disabled="loading"
            class="button lg:h-[54px]">{{ loading ? 'Logging in...' : 'Login' }}</button>
            <p v-if="error.value" class="texterror">{{ error.value}}</p>
        </form>
        <div class="text-center textp">
            <NuxtLink to="/register" class="text-[#06C3B4] hover:text-[#05a89c]">
                Don't have an account? Sign up
            </NuxtLink>
        </div>
    </section>
</template>