let Document = () => {
	return (<html lang="en">
		<head>
			<meta charset="utf-8"/>
			<meta name="viewport" content="width=device-width,initial-scale=1"/>
			<meta name="theme-color" content="#0a1826" />
			<link rel="stylesheet" href="/css/app.css"/>
			<link rel="shortcut icon" href="/favicon.ico"/>
			<link rel="manifest" href="/manifest.min.json"/>
			<link rel="apple-touch-icon"sizes="180x180"href="/favicon/android-chrome-192x192.png"/>
			<link rel="alternate" type="application/rss+xml" title="RSS" href="https://vixalien.ga/feed/feed.rss" />
			<link rel="alternate" type="application/atom+xml" title="Atom" href="https://vixalien.ga/feed/feed.atom" />
			<link rel="alternate" type="application/json" title="JSON" href="https://vixalien.ga/feed/feed.json" />
		</head>
		<body>
			<div class="root"></div>
			<script src="/bundle.js" defer="defer"/>
		</body>
	</html>)
}

export default Document;
