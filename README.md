# hook-vue

## vue2-like comp attr
```js
const app_comp = app.__vue__;
// ...
```

## events
```js
window.addEventListener('hook-vue:init', /* ... */);
window.addEventListener('hook-vue:comp_mount', ({ detail: { component } }) => /* ... */);
window.addEventListener('hook-vue:comp_unmount', ({ detail: { component } }) => /* ... */);
```
