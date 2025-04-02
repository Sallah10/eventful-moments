<script setup lang="ts">
import Nav from './nav.vue';
import Footer from './footer.vue';

</script>

<template>
     <div class="min-h-screen flex flex-col">
        <Nav/>
        <slot/>
        <Footer/>
     </div>
</template>