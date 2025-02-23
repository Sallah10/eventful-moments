<script setup lang="ts">
import LoggedInNav from './loggedInNav.vue';
import Footer from './footer.vue';

</script>

<template>
    <LoggedInNav/>
    <slot/>
    <Footer/>
</template>