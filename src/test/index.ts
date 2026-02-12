import { initHook } from '../content/hook_vue';
initHook();
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);
app.mount('#app');
