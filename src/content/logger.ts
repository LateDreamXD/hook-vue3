export default {
	log: (...args: any[]) => console.log('[Hook Vue]', ...args),
	error: (...args: any[]) => console.error('\x1b[31m[Hook Vue]\x1b[0m', ...args),
}
