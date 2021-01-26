let fs = require('fs');
let { resolve } = require('path');
let glob = require('glob');
let { startService } = require('esbuild');

let js = glob.sync('js/*.js')
	.map(path => fs.readFileSync(resolve(path)))
	.join('\n')

let single = glob.sync('js/single/**/*.js')

let Build = async () => {
	const service = await startService();
	try {
		await service.build({
			entryPoints: single,
			outdir: 'public',
			minify: true
		});
		await service.transform(js, {
				minify: true
			})
			.then(({code}) => fs.writeFileSync(resolve('public', 'bundle.js'), code))
	} finally {
		service.stop()
	}
}

Build()
	.then(() => console.log('Build successful!'))
	.catch(err => console.log('Error', err))