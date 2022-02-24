let fs = require('fs');
let { resolve } = require('path');
let glob = require('glob');
let esbuild = require('esbuild');

let js = glob.sync('js/*.js')
	.map(path => fs.readFileSync(resolve(path)))
	.join(';\n')

let single = glob.sync('js/single/**/*.js')

let Build = async () => {
	await esbuild.build({
		entryPoints: single,
		outdir: 'public/js',
		minify: true
	});
	await esbuild.transform(js, {
			minify: true
		})
		.then(({code}) => fs.writeFileSync(resolve('public/js', 'bundle.js'), code))
}

Build()
	.then(() => console.log('Build successful!'))
	.catch(err => console.log('Error', err))