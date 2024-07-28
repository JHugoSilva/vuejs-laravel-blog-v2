<script setup lang="ts">
import { GetPostResponseType } from '../actions/GetPostList';


defineProps<{
    posts:GetPostResponseType
}>()

const emit = defineEmits<{
    (e:'deletePost', postId:number, i:number):void
}>()

</script>

<template>
    <table class="table table-hover table-bordered">
        <thead>
            <tr>
                <th>Id</th>
                <td>Image</td>
                <td>Title</td>
                <td>Content</td>
                <td>Upload</td>
                <td>Edit</td>
                <td>Delete</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(post, i) in posts?.data" :key="i">
                <th>{{ post.id }}</th>
                <td>{{ post.image }}</td>
                <td>{{ post.title }}</td>
                <td>{{ post.post_content }}</td>
                <td>
                    <button class="btn btn-primary">Upload</button>
                </td>
                <td>
                    <button class="btn btn-outline-primary">Edit</button>
                </td>
                <td>
                    <button @click="emit('deletePost', post.id, i)" class="btn btn-outline-danger">Delete</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>