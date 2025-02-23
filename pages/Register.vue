<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

    definePageMeta({
        layout: "custom",
    });

    const name = ref('');
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const router = useRouter();

const handleLogin = () => {
  if (!name.value || !email.value || !password.value) {
    errorMessage.value = 'All fields are required!';
    return;
  }

  errorMessage.value = ''; 
  console.log("Registration done");
  emits('login');
  router.push('/buckets');
};
</script>

<template>
    <section class="section  md:items-center lg:gap-4 lg:pt-2">
        <div>
            <h1 class="textH1 self-start">Create an account,</h1>
        </div>
        <h2 class="textH2 lg:w-[626px]">
            Hi, my name is Eventful Moments, I am a bucket… no, not the bucket of water but I store awesome moments you will like to have in coming years.
        </h2>
        <form @submit.prevent="handleLogin" class="form">
            <div class="gap-2 flex flex-col ">
                <h3 class="textH3">Fullname</h3>
                <input 
                type="text"  
                v-model="name"
                class="rounded-2xl w-full border-[#707070] border-2 px-6 py-4 md:w-[626px]"/>
            </div>
            <div class="gap-2 flex flex-col ">
                <h3 class="textH3">Email</h3>
                <input 
                type="email"  
                v-model="email"
                class="rounded-2xl w-full border-[#707070] border-2 px-6 py-4 md:w-[626px]"/>
            </div>
            <div class="gap-2 flex flex-col">
                <h3 class="textH3">Password</h3>
                <input 
                type="password"
                v-model="password"
                class="rounded-2xl w-full border-[#707070] border-2 px-6 py-4 md:w-[626px]"
                />
            </div>
            <button class="button lg:h-[54px]">Create</button>
            <p v-if="errorMessage" class="texterror">{{ errorMessage }}</p>
        </form>
    </section>
</template>