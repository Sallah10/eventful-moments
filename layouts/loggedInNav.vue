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
                to="/buckets"
                :class="[
                  isActiveLink('/buckets')
                    ? 'bg-[#06C3B4]'
                    : 'hover:bg-[#00000029]',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                ]">Buckets</NuxtLink></li>
            <li><button
                :class="[
                  isActiveLink('/')
                    ? 'bg-[#06C3B4]'
                    : 'hover:bg-[#00000029]',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                ]"
                >Logout</button></li> 
                <!-- @click="props.logout" -->
        </ul>
    </nav>
</template>
