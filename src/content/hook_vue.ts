// @ts-nocheck
import logger from './logger';

function recordComponent(component) {
	let element = component.vnode.el;
	while (!(element instanceof HTMLElement)) {
		element = element.parentElement;
	}
	element.__vue__ = element.__vue__ || [];
	element.__vue__.push(component);
}


function listenComponentMount(component) {
	let value = null;
	let hooked = false;
	Object.defineProperty(component.vnode, 'el', {
		get: () => value,
		set(newValue) {
			value = newValue;
			if (!hooked && value) {
				hooked = true;
				listenComponentUnmount(component);
				recordComponent(component);
				window.dispatchEvent(new CustomEvent('hook-vue:component_mount', { detail: component }));
			}
		}
	});
}


function listenComponentUnmount(component) {
	let value = null;
	let unhooked = false;
	Object.defineProperty(component, 'isUnmounted', {
		get: () => value,
		set(newValue) {
			value = newValue;
			if (!unhooked && value) {
				unhooked = true;
				window.dispatchEvent(new CustomEvent('hook-vue:component_unmount', { detail: component }));
			}
		}
	});
}


function proxyProxy(func) {
	return new Proxy(func, {
		construct(target, argArray, newTarget) {
			const component = argArray[0]?._;
			const hasValidUid = component?.uid >= 0;
			if (hasValidUid) {
				const element = component.vnode?.el;
				if (element) {
					listenComponentUnmount(component);
					recordComponent(component);
				} else {
					listenComponentMount(component);
				}
			}
			return Reflect.construct(target, argArray, newTarget);
		}
	});
}


export function initHook() {
	Proxy = proxyProxy(Proxy);
	window.dispatchEvent(new CustomEvent('hook-vue:init'));
	logger.log('vue hook initialized');
}
