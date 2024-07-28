<script setup lang="ts">
//@ts-nocheck
import { ref } from 'vue';
import type { ICreatePostInput } from './types/createPost.types';
import { helpers, required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import Error from '../../../components/Error.vue'
import { showError, successMsg } from '../../../helper/ToastNotification';
import { createPostHttp } from './actions/CreatePost';
import BaseBtn from '../../../components/BaseBtn.vue';

const loadingStatus = ref(false)

const postInput = ref<ICreatePostInput>({
    title:'',
    post_content:'',
})

const rules = {
    title: { required: helpers.withMessage('O campo Título é obrigatório', required) },
    post_content: { required: helpers.withMessage('O campo Conteúdo é obrigatório', required) }
}

const v$ = useVuelidate(rules, postInput)

async function createPost() {
    const result = await v$.value.$validate()
    
    if (!result) return
    
    try {
        loadingStatus.value = true
        const data = await createPostHttp(postInput.value)
        successMsg(data.message)
        loadingStatus.value = false
        postInput.value = {} as ICreatePostInput
        v$.value.$reset()
    } catch (error:any) {
        loadingStatus.value = false
        console.log(error);
        
        showError(error?.message)
    }
}

</script>
<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card mt-3">
                <div class="card-header">Create Post</div>
                <div class="card-body">
                    <form  @submit.prevent="createPost">
                        <Error inputLabel="Título" :formErrors="v$.title.$errors">
                            <input type="text" v-model="postInput.title" class="form-control">
                        </Error>

                        <Error inputLabel="Password" :formErrors="v$.post_content.$errors">
                            <textarea v-model="postInput.post_content" class="form-control"></textarea>
                        </Error>
                        <div class="d-grid gap-2 d-md-flex mt-2">
                            <BaseBtn label="Create Post" :loading="loadingStatus"/>
                            <router-link to="/list-post" class="btn btn-warning">List</router-link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
       
    </div>
</template>