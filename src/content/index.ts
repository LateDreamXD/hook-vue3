import logger from './logger';
import { initHook } from './hook_vue';

if(document.readyState === 'loading') initHook();
else { logger.error('hook vue must be loaded before DOMContentLoaded'); };
