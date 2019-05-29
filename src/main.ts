import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

import {
    MdButton,
    MdMenu,
    MdIcon,
    MdList,
    MdProgress,
    MdField,
    MdEmptyState,
    MdRadio,
    MdRipple
// @ts-ignore
} from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';

Vue.use(MdButton);
Vue.use(MdMenu);
Vue.use(MdIcon);
Vue.use(MdList);
Vue.use(MdProgress);
Vue.use(MdField);
Vue.use(MdEmptyState);
Vue.use(MdRadio);
Vue.use(MdRipple);


Vue.config.productionTip = false;

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
