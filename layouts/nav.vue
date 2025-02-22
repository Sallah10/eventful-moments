<script setup>
import { useRoute} from 'vue-router';
import { defineProps } from 'vue';

const props = defineProps(['isAuthenticated', 'logout']);

const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
  
}
</script>

<template>
    <nav class="bg-[#008289] flex justify-between items-center text-[#ffffff] px-4 py-4 md:px-6 md:py-6">
        <NuxtLink to="/buckets" class="italic text-xl">Eventful Moments.</NuxtLink>
        <ul class="flex gap-2 md:gap-4 items-center text-lg">
            <li><NuxtLink 
                to="/"
                :class="[
                  isActiveLink('/')
                    ? 'bg-[#06C3B4]'
                    : 'hover:bg-[#00000029]',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                ]">Login</NuxtLink></li>
            <li><NuxtLink 
                to="/register"
                :class="[
                  isActiveLink('/register')
                    ? 'bg-[#06C3B4]'
                    : 'hover:bg-[#00000029]',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                ]">Register</NuxtLink></li>   
        </ul>
    </nav>
</template>
