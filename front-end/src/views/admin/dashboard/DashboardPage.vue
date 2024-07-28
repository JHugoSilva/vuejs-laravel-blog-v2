<script lang="ts" setup>
//@ts-nocheck
import { onMounted, ref } from 'vue';
import { countPostHttp } from './actions/CountPost';
import CountPost from './components/CountPost.vue';

const numberOfPost = ref<number>(0)

onMounted(async()=>{
   const data = await countPostHttp()
   numberOfPost.value = data
})
</script>

<template>
   <div>
      <div class="row">
          <h1>Dahsboard Page</h1>
       </div>
       <div class="row">
          <div class="col-md-6">
             <div class="card">
                <div class="card-header">Post</div>
                <div class="card-body">
                  <CountPost :countPost="numberOfPost"/>
                </div>
             </div>
          </div>
       </div>
  </div>
</template>