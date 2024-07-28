<script setup lang="ts">
//@ts-nocheck
import { onMounted, ref } from 'vue';
import { getPostHttp } from './actions/GetPostList';
import { myDebounce } from '../../../helper/util'
import type { GetPostResponseType } from './actions/GetPostList';
import { Bootstrap5Pagination } from 'laravel-vue-pagination';
import { confirmDelation } from '../../../helper/SweetAlert';
import { deletePostHttp } from './actions/DeletePost';
import { showError, successMsg } from '../../../helper/ToastNotification';
import PostTable from './components/PostTable.vue';

const posts = ref<GetPostResponseType>()
const query = ref<string>('')

async function showPost(page=1, query='') {
    const data = await getPostHttp(page, query)
    posts.value = data
}

const searchPost = myDebounce(async function(){
    await showPost(1, query.value)
}, 300)

async function deletePost(id:number, i:number) {
    confirmDelation().then(async()=>{
        const data = await deletePostHttp(id)
        posts.value.data.splice(i, 1)
        successMsg(data.message)
    }).catch((err)=>{
        showError(err.message)
        console.log(err);
    })
}

onMounted(async()=>{
    await showPost()
})
</script>
<template>
   <div class="row mt-3">
    <div class="col-md-12">
        <div class="row mb-3">
            <div class="col-md-4">
                <div class="form-group">
                    <input type="text" placeholder="Search..." @keydown="searchPost" v-model="query" class="form-control">
                </div>
            </div>
        </div>
        <PostTable :posts="posts" @delete-post="deletePost" />
        <template v-if="posts">
            <Bootstrap5Pagination :data="posts" @pagination-change-page="showPost"/>
        </template>
    </div>
   </div>
</template>