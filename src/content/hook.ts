// @ts-nocheck
import logger from './logger';

function recordComponent(component) {
	let element = component.vnode.el;
	let isBindToParent = false;
	while (!(element instanceof HTMLElement)) {
		element = element.parentElement;
		isBindToParent = true;
	}
	logger.debug('bind to el attr', component, element, isBindToParent);
	if(isBindToParent) {
		element.__child_vue_comps__ = element.__child_vue_comps__ || [];
		element.__child_vue_comps__.push(component);
	} else if(element.__vue__) {
		if(element.__vue__ === component) return;
		else {
			element.__vue_comps__ = element.__vue_comps__ || [];
			element.__vue_comps__.push(component);
		}
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
				document.dispatchEvent(new CustomEvent('hook-vue:comp_mount', { detail: component }));
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
				document.dispatchEvent(new CustomEvent('hook-vue:comp_unmount', { detail: component }));
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
				const element = component._vnode?.el;
				if (element) {
					listenComponentUnmount(component);
					recordComponent(component);
				} else {
					listenComponentMount(component);
				}
			}
			component && logger.debug('new comp:', component);
			return Reflect.construct(target, argArray, newTarget);
		}
	});
}


export function initHook() {
	Proxy = proxyProxy(Proxy);
	document.dispatchEvent(new CustomEvent('hook-vue:init'));
	logger.log('hook initialized');
}
