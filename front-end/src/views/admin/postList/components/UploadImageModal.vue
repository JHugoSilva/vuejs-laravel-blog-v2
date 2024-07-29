<script setup lang="ts">
import { ref } from 'vue';
import { getSelectImage, uploadImageHeader } from '../../../../helper/uploadImage'
import { APP } from '../../../../shared/App';
import { showError, successMsg } from '../../../../helper/ToastNotification';

const props =  defineProps<{
    postId:number
}>()

const emit = defineEmits<{
    (e:'closeModal'):void,
    (e:'refreshTable'):void
}>()

const image = ref<any>()

function selectImage(e:any) {
    const selectedImage = getSelectImage(e, 'outputImage')
    image.value = selectedImage
}

async function uploadImage() {
    try {
        if (image.value !== '') {
            const requestOptions = uploadImageHeader(image.value, props.postId)
            const response = await fetch(`${APP.apiURL}/posts/upload`, requestOptions)
            const data = await response.json()
            successMsg(data?.message)
            image.value = ''
            const imgTag = document.getElementById('outputImage') as HTMLImageElement
            
            imgTag.src = ''            
            emit('refreshTable')
        } else {
            showError('Please select an image.')
        }
    } catch (error:any) {
        showError(error?.message)
    }
}
</script>
<template>
    <div>
        <!-- Modal -->
        <div class="modal fade" id="postModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form enctype="multipart/form-data" @submit.prevent="uploadImage">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title {{ postId }}</h1>
                            <button type="button" class="btn-close" @click="emit('closeModal')" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <img style="height: 150px;" src="" id="outputImage"> <br>
                                <label for="">Image</label> <br>
                                <input type="file" @change="selectImage" id="fileImage">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" @click="emit('closeModal')" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Upload</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>