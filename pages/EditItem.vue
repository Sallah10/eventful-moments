<template>
    <section class="section h-[100%]">
         <form action="" class="form lg:w-[638px] lg:self-center">
             <div class="gap-2 flex flex-col">
                 <h3 class="textH3">Date in the future</h3>
                 <input 
                 type="date"
                 class="rounded-2xl w-full border-[#707070] border-2 px-6 py-4"
                 />
             </div>
             <div class="gap-2 flex flex-col">
                 <h3 class="textH3">Title</h3>
                 <input 
                 type="text"  
                 class="rounded-2xl w-full border-[#707070] border-2 px-6 py-4"/>
             </div>
             <div class="gap-2 flex flex-col">
                 <h3 class="textH3">Details</h3>
                 <textarea 
                 class="rounded-2xl w-full h-[459px] border-[#707070] border-2 px-6 py-4"
                 ></textarea>
             </div>
             <button class="button">Update</button>
         </form>
    </section>
 </template>