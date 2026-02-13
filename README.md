# hook-vue

## vue2-like comp attr
```js
const app_comp = app.__vue__;
// ...
```

## events
```js
document.addEventListener('hook-vue:init', /* ... */);
document.addEventListener('hook-vue:comp_mount', ({ detail: { component } }) => /* ... */);
document.addEventListener('hook-vue:comp_unmount', ({ detail: { component } }) => /* ... */);
```
