# hook-vue

## app
```js
const app = app.app.__vue_app__;
// ...
```

## events
```js
window.addEventListener('hook-vue:init', /* ... */);
window.addEventListener('hook-vue:component_mount', ({ detail: { component } }) => /* ... */);
window.addEventListener('hook-vue:component_unmount', ({ detail: { component } }) => /* ... */);
```
