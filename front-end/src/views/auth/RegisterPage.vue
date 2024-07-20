<script setup lang="ts">
//@ts-nocheck
import { ref } from 'vue';
import type { IRegisterInput } from './auth-types';
import { helpers, required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import Error from '../../components/Error.vue'

const registerInput = ref<IRegisterInput>({
    name:'',
    email:'',
    password:'',
})

const rules = {
    name: { required: helpers.withMessage('O campo nome é obrigatório', required) },
    email: { required: helpers.withMessage('O campo email é obrigatório', required) },
    password: { required: helpers.withMessage('O campo password é obrigatório', required) }
}

const v$ = useVuelidate(rules, registerInput)

function registerUser() {
    const result = v$.value.$validate()

    if (!result) return
}

</script>
<template>
    <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-4">
            <div class="card mt-3">
                <div class="card-header">Page Register</div>
                <div class="card-body">
                    {{ registerInput }}
                    <form @submit.prevent="registerUser">

                        <Error inputLabel="Name" :formErrors="v$.name.$errors">
                            <input type="text" v-model="registerInput.name" class="form-control">
                        </Error>

                        <Error inputLabel="Email" :formErrors="v$.email.$errors">
                            <input type="email" v-model="registerInput.email" class="form-control">
                        </Error>

                        <Error inputLabel="Password" :formErrors="v$.password.$errors">
                            <input type="password" v-model="registerInput.password" class="form-control">
                        </Error>
                      
                        <div class="d-grid gap-2 d-md-flex mt-2">
                            <button class="btn btn-primary mr-2">Register</button>
                           <router-link to="/" class="btn btn-warning">Login</router-link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="col-md-4"></div>
    </div>
</template>