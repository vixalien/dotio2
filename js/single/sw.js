let CACHE = 'vixalien-sw-v2';

// utils

function fromCache(request) {
	return caches.open(CACHE).then(function (cache) {
		return cache.match(request).then(function (matching) {
			return matching || Promise.reject('no-match');
		});
	});
}

function toCache(request, response) {
	return caches.open(CACHE).then(function (cache) {
		if (response.status < 200 || response.status > 399) return "not stored"
		return cache.put(request, response.clone()).then(() => response);
	});
}

function update(request) {
	return fetch(request).then(function (response) {
		return toCache(request, response);
	})
	// failed to fetch, probably offline, do nothing
	.catch(() => {});
}

// functions

let Precache = (list) => {
	return caches.open(CACHE).then(function (cache) {
		return cache.addAll(list);
	});
}

// strategies

let StaleWhileRevalidate = () => {
	return {
		onfetch: (req) => fromCache(req).catch(() => fetch(req)),
		waitUntil: (req) => update(req)
	}
}

let NetworkOnly = () => {
	return {
		onfetch: (req) => fetch(req)
	}
}

let CacheOnly = () => {
	return {
		onfetch: (req) => fromCache(req)
	}
}

let NetworkFirst = () => {
	return {
		onfetch: (req) => fetch(req).catch(() => fromCache(req))
	}
}

let CacheFirst = () => {
	return {
		onfetch: (req) => fromCache(req).catch(() => fetch(req).then(res => toCache(req, res)))
	}
}

let useFallback = (fn, fallback) => function Fallback() {
	let strategy = fn();
	let onfetch;
	if (strategy.onfetch) {
		onfetch = (req) => strategy.onfetch(req).catch(() => fallback(req))
	} else {
		onfetch = fallback;
	}
	return {
		onfetch,
		waitUntil: strategy.waitUntil
	}
}

let Offline = () => fromCache('/offline');
let useOffline = (fn) => useFallback(fn, Offline)

let otherSiteRegex = `^((?!${location.host}).)*$`

let Paths = {
	// requests to other sites
	[otherSiteRegex]: NetworkOnly,
	"googletagmanager": StaleWhileRevalidate,
	"sw\.js": NetworkOnly,
	"/favicon*": CacheFirst,
	"/offline": CacheOnly,
	"(\.css|\.js)$": CacheFirst,
	"\.*": useOffline(StaleWhileRevalidate),
}

addEventListener('activate', evt => 
	evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE) {
            return caches.delete(key);
          }
        })
      );
    })
))

addEventListener('install', evt => 
	evt.waitUntil(Precache([
		'/offline',
		'/',
	]))
);

// Fetch, timeout, load from cache or just load
addEventListener('fetch', async (evt) => {
	for (key in Paths) {
		if(evt.request.url.match(new RegExp(key))) {
			let handler = Paths[key]();
			let waitUntil = handler.waitUntil || (() => Promise.resolve("done"));
			console.debug('[SW]', 'Loading:  ', evt.request.url, 'with: ', Paths[key].name);
			evt.waitUntil(waitUntil(evt.request));
			evt.respondWith(handler.onfetch(evt.request))
			return;
		}
	}
});

// not useful
// let AddToIndex = (url, title, description, icon, category) => {
// 	if (new URL(url, location).origin != location.origin) return

// 	url = new URL(url, location)

// 	// Content indexing
// 	if ('index' in registration) {
// 		registration.index.add({
// 			id: url.pathname,
// 			url: url.pathname,
// 			launchUrl: url.pathname,
// 			title: title,
// 			description: description,
// 			icons: [{
// 				src: '/favicon/' + icon,
// 				sizes: '192x192',
// 				type: 'image/png',
// 			}],
// 			category: category
// 		})
// 	}
// }

// AddToIndex('/', 'vixalien.io', 'web site for vixalien', 'maskable.png', 'homepage')

// self.addEventListener('message', ({ data: { type, index } }) => {
// 	if (type != "addToIndex") return
// 	let { url, title, description, icon, category } = index
// 	AddToIndex(url, title, description, icon, category)
// })