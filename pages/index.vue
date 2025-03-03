<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { VueSpinnerBars } from 'vue3-spinners';
import axios from 'axios';
import { useAuth } from '@/composables/useAuth'; 

definePageMeta({
    layout: "custom",
});

const router = useRouter();
const { setAuth } = useAuth();

const formData = reactive({
    email: '',
    password: ''
});

const error = ref(null);
const loading = ref(false);

const handleLogin = async () => {
    try {
        loading.value = true;
        error.value = null;

        const response = await axios.post('https://eventful-moments-api.onrender.com/api/v1/users/login', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const { user, token } = response.data;
        setAuth(user, token);
        router.push('/buckets');
    } catch (err) {
        error.value = err.response?.data?.message || 'Login failed';
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <section class="section md:items-center lg:gap-4 lg:pt-2">
        <div>
            <h1 class="textH1 self-start">Welcome back,</h1>
        </div>
        <h2 class="textH2 lg:w-[626px]">
            Hi, my name is Eventful Moments, I am a bucket… no, not the bucket of water but I store awesome moments you
            will like to have in coming years.
        </h2>
        <form @submit.prevent="handleLogin" class="form">
            <div class="gap-2 flex flex-col">
                <h3 class="textH3">Email</h3>
                <input type="email" class="rounded-2xl w-full border-[#707070] border-2 px-6 py-4 md:w-[626px]"
                    v-model="formData.email" required />
            </div>
            <div class="gap-2 flex flex-col">
                <h3 class="textH3">Password</h3>
                <input type="password" class="rounded-2xl w-full border-[#707070] border-2 px-6 py-4 md:w-[626px]"
                    v-model="formData.password" required />
            </div>
            <button type="submit" :disabled="loading" class="button lg:h-[54px]">
                {{ loading ? 'Logging in...' : 'Login' }}
            </button>
            <p v-if="error" class="texterror">{{ error }}</p>
            <VueSpinnerBars v-if="loading" class="text-[#06C3B4] self-center" />
        </form>
        <div class="text-center textp">
            <NuxtLink to="/register" class="text-[#06C3B4] hover:text-[#05a89c] mb-2">
                Don't have an account? Sign up
            </NuxtLink>
        </div>
    </section>
</template>
