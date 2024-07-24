import { createApp } from 'vue'
// import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import "vue-toastification/dist/index.css";
import Toast from "vue-toastification";
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'

const options = {
    // You can set your default options here
};

const app = createApp(App)
app.use(createPinia())
app.use(Toast, options);
app.use(router)

app.mount('#app')
