import './style.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';

import { VueTelegramPlugin } from 'vue-tg';

import VueAnimXyz from '@animxyz/vue3';
import '@animxyz/core';

import MainLayout from './layouts/MainLayout.vue';
import BlockLayout from './layouts/BlockLayout.vue';

import { initializeApp } from 'firebase/app';
import firebaseConfig from './constants/firebaseConfig';

initializeApp(firebaseConfig);

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(VueAnimXyz);
app.use(VueTelegramPlugin);

app.component('MainLayout', MainLayout);
app.component('BlockLayout', BlockLayout);

app.mount('#app');
