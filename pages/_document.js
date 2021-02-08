import Explosiv from 'explosiv'

import fs from 'fs'
import { resolve } from 'path'

let Document = () => {
	return (<html lang="en">
		<head>
			<meta charset="utf-8"/>
			<meta name="viewport" content="width=device-width,initial-scale=1"/>
			<link rel="stylesheet" href="/css/app.css"/>
			<meta name="theme-color" content="#0a1826" />
			<link rel="shortcut icon" href="/favicon.ico"/>
			<link
				rel="apple-touch-icon"
				sizes="180x180"
				href="/favicon/android-chrome-192x192.png"
			/>
			<link rel="alternate" type="application/xml" title="Site Map" href="/sitemap.xml" />
		</head>
		<body>
			<div class="root"></div>
			<script src="/bundle.js" defer/>
		</body>
	</html>)
}

export default Document;
