<script setup lang="ts">
//@ts-nocheck
import { ref } from 'vue';
import type { ICreatePostInput } from './types/createPost.types';
import { helpers, required } from '@vuelidate/validators';
import { showError, successMsg } from '../../../helper/ToastNotification';
import { createPostHttp } from './actions/CreatePost';
import { postStore } from '../../../stores/postStore';
import { updatePostHttp } from './actions/UpdatePost';
import { IUpdatePostInput } from './types/updatePost.types';
import Error from '../../../components/Error.vue'
import useVuelidate from '@vuelidate/core';
import BaseBtn from '../../../components/BaseBtn.vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const loadingStatus = ref(false)

const postInput = ref<ICreatePostInput|IUpdatePostInput>({
    id: postStore.editPostData.id,
    title: postStore.editPostData.title,
    post_content: postStore.editPostData.post_content,
})

const rules = {
    title: { required: helpers.withMessage('O campo Título é obrigatório', required) },
    post_content: { required: helpers.withMessage('O campo Conteúdo é obrigatório', required) }
}

const v$ = useVuelidate(rules, postInput)

async function createOrUpdatePost() {
    const result = await v$.value.$validate()
    
    if (!result) return
    
    try {
        console.log('AQUI', postStore.editPost.edit);
        
        loadingStatus.value = true
        postStore.editPost.edit ? await updatePost() : createPost()
        v$.value.$reset()
        loadingStatus.value = false
    } catch (error:any) {
        loadingStatus.value = false
        showError(error?.message)
    }
}

async function createPost() {
    const data = await createPostHttp(postInput.value as ICreatePostInput)
    postInput.value = {} as ICreatePostInput
    successMsg(data.message)
}

async function updatePost() {
    const data = await updatePostHttp(postInput.value as IUpdatePostInput)
    postStore.editPostData = {} as IUpdatePostInput
    postStore.editPost.edit = false
    postInput.value = {} as IUpdatePostInput
    router.push('/list-post')
    successMsg(data.message)
}

</script>
<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card mt-3">
                <div class="card-header">Create Post - {{ postStore.editPostData }}</div>
                <div class="card-body">
                    <form  @submit.prevent="createOrUpdatePost">
                        <Error inputLabel="Título" :formErrors="v$.title.$errors">
                            <input type="text" v-model="postInput.title" class="form-control">
                        </Error>

                        <Error inputLabel="Password" :formErrors="v$.post_content.$errors">
                            <textarea v-model="postInput.post_content" class="form-control"></textarea>
                        </Error>
                        <div class="d-grid gap-2 d-md-flex mt-2">
                            <BaseBtn :class="postStore.editPost.edit ? 'btn-warning':'btn-primary'" :label="postStore.editPost.edit ? 'Update Post':'Create Post'" :loading="loadingStatus"/>
                            <router-link to="/list-post" class="btn btn-warning">List</router-link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
       
    </div>
</template>