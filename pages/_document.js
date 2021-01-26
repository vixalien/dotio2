import Explosiv from 'explosiv'

import fs from 'fs'
import { resolve } from 'path'

let Document = () => {
	return (<html lang="en">
		<head>
			<meta charset="utf-8"/>
			<meta name="viewport" content="width=device-width,initial-scale=1"/>
			<meta name="theme-color" content="#0a1826" />
			<link rel="shortcut icon" href="/favicon.ico" async/>
			<link
				rel="apple-touch-icon"
				sizes="180x180"
				href="/favicon/android-chrome-192x192.png"
				async
			/>
			<style defer>
				{fs.readFileSync(resolve('public/css/app.css'), 'utf8')}
			</style>
		</head>
		<body>
			<div class="root"></div>
		</body>
	</html>)
}

export default Document;