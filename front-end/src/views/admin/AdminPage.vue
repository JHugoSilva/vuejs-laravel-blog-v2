<script setup lang="ts">

import { onMounted } from 'vue';
import { getUserData } from '../../helper/GetUserData';
import Storage from '../../helper/Storage';
import { showError, successMsg } from '../../helper/ToastNotification';
import { logoutUserHttp } from './actions/LogoutUser';
import { useRouter } from 'vue-router';
import { userIsLoggedInHttp } from './actions/UserIsLoggedIn';
const userData = getUserData()
const router = useRouter()
async function logoutUser() {
    const userId = userData?.user?.id
    if (typeof userId !== 'undefined') {
        const data = await logoutUserHttp()
        setTimeout(()=>{
            successMsg(data.message)
            router.push('/')
        }, 2000)
        Storage.remove('userData')
    }
}

async function userIsLoggedIn() {
    try {
        await userIsLoggedInHttp()
    } catch (error:any) {
        showError(error.message)
        router.push('/')
    }
}

onMounted(async()=>{
    userIsLoggedIn()
})

</script>

<template>
    <div class="container">
        <div>
            <span>Name: {{ userData?.user.name}}</span>
            <br>
            <span>Email: <a href="">{{ userData?.user.email }}</a> </span>
            <br>
            <span style="color:red; cursor:pointer" @click="logoutUser">
                <b>Logout</b>
            </span>
            <br>
        </div>
        <nav class="navbar navbar-expand-lg lg-body-tertiary" style="background-color: #E3F2FD;">
            <div class="container-fluid">
                <div class="collapse navbar-collapse" id="navbarText">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0" id="navbarText">
                        <li class="nav-item">
                            <router-link class="nav-link" aria-current="page" to="/admin">Dashboard</router-link>
                        </li>
                        <li class="nav-item" style="font-weight: 500;">
                            <router-link class="nav-link" to="/create-post">Post Create</router-link>
                        </li>
                        <li class="nav-item" style="font-weight: 500;">
                            <router-link class="nav-link" to="/list-post">Post List</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="row">
            <router-view></router-view>
        </div>
    </div>
</template>