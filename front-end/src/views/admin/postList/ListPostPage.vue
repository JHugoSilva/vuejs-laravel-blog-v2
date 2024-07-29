<script setup lang="ts">
//@ts-nocheck
import { onMounted, ref } from 'vue';
import { getPostHttp } from './actions/GetPostList';
import { closeModal, myDebounce, openModal } from '../../../helper/util'
import type { GetPostResponseType } from './actions/GetPostList';
import { Bootstrap5Pagination } from 'laravel-vue-pagination';
import { confirmDelation } from '../../../helper/SweetAlert';
import { deletePostHttp } from './actions/DeletePost';
import { showError, successMsg } from '../../../helper/ToastNotification';
import PostTable from './components/PostTable.vue';
import UploadImageModal from './components/UploadImageModal.vue';
import { IEditPostDataInput } from './types/postList-types';
import { postStore } from '../../../stores/postStore';
import { useRouter } from 'vue-router';

const router = useRouter()
const posts = ref<GetPostResponseType>()
const query = ref<string>('')
const currentPostId = ref<number>(0)

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

async function showModal(postId:number){
    await openModal('postModal', postId).then((postId)=>{
        currentPostId.value = postId;
    }).catch((err)=>{
        console.log(err);
    })
}

function editPostData(postData:IEditPostDataInput) {
   postStore.editPostData.id = postData.id
   postStore.editPostData.title = postData.title
   postStore.editPostData.post_content = postData.post_content
   postStore.editPost.edit = true
   router.push('/create-post')
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
        <template v-if="posts">
            <PostTable :posts="posts" @edit-post="editPostData" @show-modal="showModal" @delete-post="deletePost" />
        </template>
        <UploadImageModal :post-id="currentPostId" @refresh-table="showPost"  @close-modal="closeModal('postModal')"/>
        <template v-if="posts">
            <Bootstrap5Pagination :data="posts" @pagination-change-page="showPost"/>
        </template>
    </div>
   </div>
</template>