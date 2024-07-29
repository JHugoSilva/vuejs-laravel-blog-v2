import { defineStore } from "pinia";
import { ref } from "vue";
import { IEditPostDataInput } from "../views/admin/postList/types/postList-types";

const usePostStore = defineStore('post', ()=>{

    const editPostData = ref<IEditPostDataInput>({
        id: null,
        title: '',
        post_content: ''
    })
    const editPost = ref({
        edit:false
    })
    return {
        editPostData,
        editPost
    }
})

export const postStore = usePostStore()