const wbn = require('wbn');
const fs = require('fs');
const glob = require('fast-glob');
const mime = require('mime');

require('dotenv').config();

const primaryURL = process.env.URL;
const bundleSRC = 'out/vixalien.wbn'

const builder = (new wbn.BundleBuilder(primaryURL))
  .setManifestURL(primaryURL + '/manifest.json')

glob.sync('out/**/*')
	.forEach(src => {
		if (src.match(bundleSRC)) return;

		const webURL = src.replace(/^out/, primaryURL).replace(/\/index\.html$/, '');
		const body = fs.readFileSync(src, 'utf8');

		console.log('on', webURL)

		builder.addExchange(
			webURL,
			200,
			{
				'Content-Type': mime.getType(src) || '',
				'Content-Length': body.length.toString(),
				'Date': new Date().toUTCString()
			},
			body
		)
	})

fs.writeFileSync(bundleSRC, builder.createBundle());