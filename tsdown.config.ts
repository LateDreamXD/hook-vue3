import { defineConfig } from 'tsdown';

export default defineConfig({
	define: { 'process.env.NODE_ENV': JSON.stringify('production') },
	entry: { content: 'src/content/index.ts' },
	minify: true,
	dts: false,
	format: 'iife',
	tsconfig: 'tsconfig.app.json'
});
