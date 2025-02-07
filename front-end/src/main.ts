import { createApp } from 'vue'
// import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import "vue-toastification/dist/index.css";
import Toast from "vue-toastification";
import VueSweetalert2  from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router'

const options = {
    // You can set your default options here
};

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)
app.use(pinia)
app.use(Toast, options);
app.use(VueSweetalert2)
app.use(router)

app.mount('#app')
