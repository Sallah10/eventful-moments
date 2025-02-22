<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

    definePageMeta({
        layout: "custom",
    });

    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');

    const handleLogin = () => {
      if (email.value && password.value) {
        errorMessage.value = ''; // Clear any error message
        emits('login');
        router.push('/buckets'); // Redirect to another page
        console.log("Login successful");
      } else {
        errorMessage.value = 'Email and Password are required!';
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
            <button type="submit" class="button lg:h-[54px]">Login</button>
            <p v-if="errorMessage" class="texterror">{{ errorMessage }}</p>
        </form>
    </section>
</template>