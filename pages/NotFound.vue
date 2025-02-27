<script setup>
</script>

<template>
  <section class="text-center flex flex-col justify-center items-center  h-[100vh]">
    <i class="pi pi-exclamation-triangle text-yellow-500 text-7xl mb-5"></i>
    <h1 class="textH1  mb-4">404 Not Found</h1>
    <p class="textp mb-5">This page does not exist</p>
    <NuxtLink
      to="/"
      class="text-white bg-[#008289] hover:bg-[#60CED4] rounded-md px-3 py-2 mt-4"
      >Go Back</NuxtLink
    >
  </section>
</template>
