<script setup lang="ts">
//@ts-nocheck
import { ref } from 'vue';
import type { ILoginInput } from './auth-types';
import { helpers, required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import Error from '../../components/Error.vue'
import BaseBtn from '../../components/BaseBtn.vue';
import { loginUserHttp } from './actions/LoginUser';
import { showError, successMsg } from '../../helper/ToastNotification';
import Storage from '../../helper/Storage';
import { useRouter } from 'vue-router'
const loadingStatus = ref(false)
const router = useRouter()
const loginInput = ref<ILoginInput>({
    email: 'h@email.com',
    password: '123456',
})

const rules = {
    email: { required: helpers.withMessage('O campo email é obrigatório', required) },
    password: { required: helpers.withMessage('O campo password é obrigatório', required) }
}

const v$ = useVuelidate(rules, loginInput)

async function loginUser() {
    const result = await v$.value.$validate()

    if (!result) return

    try {
        loadingStatus.value = true
        const data = await loginUserHttp(loginInput.value)
        Storage.set('userData', JSON.stringify(data))
        loginInput.value = {} as ILoginInput
        successMsg(data.message)
        router.push({ name: 'dashboard' })
        loadingStatus.value = false
        v$.value.$reset()
    } catch (error: any) {
        loadingStatus.value = false
        if (error.message) {
            showError(error.message);
        } else {
            for (let err of Object.values(error.errors, {})) {
                console.log(e);
                
                for (const e of err) {
                    showError(e)
                }
            }
        }
    }
}

</script>
<template>
    <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-4">
            {{ loginInput }}
            <div class="card mt-3">
                <div class="card-header">Page Login</div>
                <div class="card-body">
                    <form  @submit.prevent="loginUser">
                        <Error inputLabel="Email" :formErrors="v$.email.$errors">
                            <input type="email" v-model="loginInput.email" class="form-control">
                        </Error>

                        <Error inputLabel="Password" :formErrors="v$.password.$errors">
                            <input type="password" v-model="loginInput.password" class="form-control">
                        </Error>
                        <div class="d-grid gap-2 d-md-flex mt-2">
                           <BaseBtn label="Login" :loading="loadingStatus"/>
                            <router-link to="/register" class="btn btn-warning">Register</router-link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="col-md-4">
        </div>
    </div>
</template>