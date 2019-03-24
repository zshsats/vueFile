import Vue from 'vue';
import router from './router.js';
import "./assets/styles/style.less";
import App from "./modules/app/app.js"
new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
