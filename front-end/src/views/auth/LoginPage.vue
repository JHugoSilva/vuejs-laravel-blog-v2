<script setup lang="ts">
//@ts-nocheck
import { ref } from 'vue';
import type { ILoginInput } from './auth-types';
import { helpers, required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import Error from '../../components/Error.vue'

const loginInput = ref<ILoginInput>({
    email:'',
    password:'',
})

const rules = {
    email: { required: helpers.withMessage('O campo email é obrigatório', required) },
    password: { required: helpers.withMessage('O campo password é obrigatório', required) }
}

const v$ = useVuelidate(rules, loginInput)

function loginUser() {
    const result = v$.value.$validate()

    if (!result) return
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
                            <button class="btn btn-primary">Login</button>
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