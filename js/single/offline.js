// Reload this page when online
ononline = () => location.reload()

let htmls = [], nothtmls = [];

function readCache(cacheName) {
	return caches.open(cacheName)
		.then(cache => cache
			.keys()
			.then(requests => requests
				.map(request => {
					// Skip non-GET requests
					if (request.method != "GET") return;
					// Skip non-local stuff
					if (new URL(request.url).host != location.host) return;
					// This is one finnicky way to do this
					let isHTML;
					if ((request.headers.get('--sw-content-type') || request.headers.get('accept') || '').match('html')) {
						htmls.push(request)
					} else {
						nothtmls.push(request)
					}
				})
			)
		)
}

function append() {
	const main = document.getElementsByTagName('main')[0];

	let paragraph = document.createElement('p');
	paragraph.innerHTML = "Don't worry here are some cached content that you can view while offline ";

	let title = document.createElement('h2');
	let title2 = document.createElement('h3');

	main.appendChild(paragraph);
	main.appendChild(title);

	let list = document.createElement('ul');
	let list2 = document.createElement('ul');

	function parse (htmls, list) {
		if (htmls.length) {
			htmls.forEach(page => {
				const listitem = document.createElement('li');
				const link = document.createElement('a');
				link.href = link.textContent = new URL(page.url).pathname;
				listitem.appendChild(link);
				list.appendChild(listitem);
			})
		} else {
			list.innerHTML = "Nothing cached sorry"
		}
	}


	title.innerHTML = 'Pages'
	parse(htmls, list);
	main.appendChild(title);
	main.appendChild(list);

	title2.innerHTML = 'Other non-interesting cached stuff'
	parse(nothtmls, list2);
	main.appendChild(title2);
	main.appendChild(list2);
}

onload = function() {
	if (!location.pathname.match(/^\/offline/)) return
	return caches
		.keys()
		.then(cacheNames => Promise.all(cacheNames.map(cacheName => readCache(cacheName))))
		.then(append)
}