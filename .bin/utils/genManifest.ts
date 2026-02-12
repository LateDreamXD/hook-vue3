import fs from 'fs';
import path from 'path';
import package_json from '../../package.json' with { type: 'json' };
import template from '../../manifest.json' with { type: 'json' };

const dist_path = path.join(process.cwd(), 'dist');

const start_time = Date.now();

template.name = package_json.name;
template.description = package_json.description;
template.version = package_json.version;

try {
	fs.writeFileSync(
		path.join(dist_path, 'manifest.json'),
		JSON.stringify(template, null, 2),
		'utf-8'
	);
	console.log(
		'✔️  Successfully generated manifest.json after:', `${Date.now() - start_time}ms`
	);
} catch(e: any) {
	console.error(
		`❌️  Failed to generate manifest.json after ${Date.now() - start_time}ms:`,
		e.message,
		e?.stack
	);
}
