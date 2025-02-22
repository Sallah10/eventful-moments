<script setup>

</script>
<template>
    <section class="section  h-[100%]">
        <div class="flex justify-between gap-6 flex-col md:flex-row">
            <div class="flex flex-col gap-4">
                <h1 class=" text-2xl md:textH1 font-bold "> Welcome John Doe</h1>
                <p class="textP">Here are items in your eventful moment bucket.</p>
            </div>
            <NuxtLink to="/addItem" class="button">Add Item</NuxtLink>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-4">
            <div class="card hover:bg-[#FFF5A7] self-center mx-auto">
                <h2 class="text-lg md:textH2 font-bold">
                    Lorem ipsum began as scrambled, nonsensical Latin derived from Cicero’s 1st-century BC text De Finibus Bonorum et Malorum.
                </h2>
                <p class="textP">
                    Until recently, the prevailing view assumed lorem ipsum was born as a nonsense text. “It’s not Latin, though it looks like it, and it actually says nothing,” Before & After magazine answered a curious reader, “Its ‘words’ loosely approximate the frequency with which letters occur in English, which is why at a glance it looks pretty real. Until recently, the prevailing view assumed lorem ipsum was born as a nonsense text. “It’s not Latin, though it looks like it, and it actually says nothing,” Before & After magazine answered a curious reader, “Its ‘words’ loosely approximate the frequency with which letters occur in English, which is why at a glance it looks pretty real.
                </p>
                <div class="flex justify-between">
                    <button class="text-[#5271FF] hover:text-[#008289]">View Details</button>
                    <div class="md:flex gap-4">
                        <h3 class="textH3 text-[#B2B2B2]">20/05/2025</h3>
                        <h3 class="textH3">20/05/2025</h3>
                    </div>
                </div>
            </div>
            <div class="card hover:bg-[#FFF5A7] self-center mx-auto">
                <h2 class="text-lg md:textH2 font-bold">
                    Lorem ipsum began as scrambled, nonsensical Latin derived from Cicero’s 1st-century BC text De Finibus Bonorum et Malorum.
                </h2>
                <p class="textP">
                    Until recently, the prevailing view assumed lorem ipsum was born as a nonsense text. “It’s not Latin, though it looks like it, and it actually says nothing,” Before & After magazine answered a curious reader, “Its ‘words’ loosely approximate the frequency with which letters occur in English, which is why at a glance it looks pretty real. Until recently, the prevailing view assumed lorem ipsum was born as a nonsense text. “It’s not Latin, though it looks like it, and it actually says nothing,” Before & After magazine answered a curious reader, “Its ‘words’ loosely approximate the frequency with which letters occur in English, which is why at a glance it looks pretty real.
                </p>
                <div class="flex justify-between">
                    <button class="text-[#5271FF] hover:text-[#008289]">View Details</button>
                    <div class="md:flex gap-4">
                        <h3 class="textH3 text-[#B2B2B2]">20/05/2025</h3>
                        <h3 class="textH3">20/05/2025</h3>
                    </div>
                </div>
            </div>
        </div>
        <button class="button"> Load More</button>
    </section>
</template>