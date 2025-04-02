<script setup lang="ts">
import LoggedInNav from './loggedInNav.vue';
import Footer from './footer.vue';

</script>

<template>
     <div class="min-h-screen flex flex-col">
        <LoggedInNav/>
        <slot/>
        <Footer/>
     </div>
</template>