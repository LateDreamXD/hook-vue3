import { initHook } from '../content/hook_vue';
window.addEventListener('hook-vue:init', () => {
	console.log('[event listener] hook-vue init');
});
window.addEventListener('hook-vue:comp_mount', (e) => {
	console.log('[event listener] comp mounted', e.detail);
});
window.addEventListener('hook-vue:comp_unmount', (e) => {
	console.log('[event listener] comp unmounted', e.detail);
});
initHook();

import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);
app.mount('#app');
