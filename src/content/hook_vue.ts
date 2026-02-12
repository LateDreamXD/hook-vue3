// @ts-nocheck
import logger from './logger';

function recordComponent(component) {
	let element = component.vnode.el;
	while (!(element instanceof HTMLElement)) {
		element = element.parentElement;
	}
	logger.debug('bind to attr', component, element);
	if(element.__vue__) {
		if(Array.isArray(element.__vue__)) {
			element.__vue__.push(component);
		} else element.__vue__ = [element.__vue__, component];
	} else element.__vue__ = component;
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
				logger.debug('comp mounted', component);
				window.dispatchEvent(new CustomEvent('hook-vue:comp_mount', { detail: component }));
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
				logger.debug('comp unmounted', component);
				window.dispatchEvent(new CustomEvent('hook-vue:comp_unmount', { detail: component }));
			}
		}
	});
}


function proxyProxy(func) {
	return new Proxy(func, {
		construct(target, argArray, newTarget) {
			logger.debug('new call', argArray);
			const component = argArray[0]?._;
			const hasValidUid = component?.uid >= 0;
			if (hasValidUid) {
				const element = component._vnode?.el;
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
