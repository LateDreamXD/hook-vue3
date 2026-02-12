import type { UserConfig } from 'vite';
import vue from 'unplugin-vue/vite';

export default <UserConfig>{
	define: {
		'process.env.NODE_ENV': JSON.stringify('development'),
	},
	plugins: [vue()],
};
