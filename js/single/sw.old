var CACHE = 'cache-v1';

// Time limited network request.
function fromNetwork(request, timeout) {
  return new Promise(function (fulfill, reject) {
    // Reject in case of timeout.
    var timeoutId = setTimeout(reject, timeout);
    // Fulfill in case of success.
    fetch(request).then(function (response) {
      clearTimeout(timeoutId);
      fulfill(response);
    // Reject also if network fetch rejects.
    }, reject);
  });
}

// Open the cache where the assets were stored
fromCache = async (request) => {
  return await caches.open(CACHE).then(async (cache) => {
    let response = await cache.match(request);
    if(!response) throw "not present in cache";
    return response;
  });
}

// Open the cache where the assets were stored
offline = () => fromCache(new Request('/offline'))

// Update consists in opening the cache, performing a network request and
// storing the new response data.
function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
    	if (response.status < 200 || response.status > 299) return "not stored"
      return cache.put(request, response.clone()).then(function () {
        return response;
      });
    });
  });
}

// Sends a message to the clients.
function refresh(response) {
  return self.clients.matchAll().then(function (clients) {
    clients.forEach(function (client) {
      // Encode which resource has been updated. By including the
      // [ETag](https://en.wikipedia.org/wiki/HTTP_ETag) the client can
      // check if the content has changed.
      var message = {
        type: 'refresh',
        url: response.url,
        // Notice not all servers return the ETag header. If this is not
        // provided you should use other cache headers or rely on your own
        // means to check if the content has changed.
        // eTag: response.headers.get('ETag')
      };
      // Tell the client about the update.
      client.postMessage(JSON.stringify(message));
    });
  });
}



addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE).then((cache) => {
			return cache.addAll([
				'/lib/react.js',
				'/lib/react-dom.js',
				'/lib/hydrate.js',
				'/lib/wrapper.js',
				'/offline',
				'/views/views/default/offline.js'
			]);
		})
	);
});

addEventListener('install', (event) => {
	var cacheKeeplist = [CACHE];
	event.waitUntil(
		caches.keys().then((keyList) => {
			return Promise.all(keyList.map((key) => {
				if (cacheKeeplist.indexOf(key) === -1) {
					return caches.delete(key);
				}
			}));
		})
	);
});

onmessage = e => { console.log(e) }

let networkOrFallback = (evt) => {
	evt.respondWith(
	  fetch(evt.request)
  	.catch(() => offline())
  );

  evt.waitUntil(
    update(evt.request)
    .then(refresh)
  );
};

let networkThenCache = (evt) => {
	evt.respondWith(
  	fromNetwork(evt.request, 500)
  	.catch(() => fromCache(evt.request))
  	.catch(() => fetch(evt.request))
  );

  evt.waitUntil(
    update(evt.request)
    .then(refresh)
  );
};

let cacheAndUpdate = (evt) => {
	evt.respondWith(
  	fromCache(evt.request)
  	.catch(() => fetch(evt.request).then(() => update(evt.request)))
  );

  evt.waitUntil(
    update(evt.request)
    .then(refresh)
  );
};

let cache = (evt) => {
	evt.respondWith(
  	fromCache(evt.request)
  	.catch(() => fetch(evt.request).then(() => update(evt.request)))
  );
};

let network = (evt) => {
	evt.respondWith(fetch(evt.request));
};

let paths = {
	uncachable: ["sw.js"],
	json: [".json", "registerSW.js"],
	views: [/\/views.*.js/],
	images: [".png", ".svg", ".jpg", ".ico"],
	static: [".woff2"],
	staticLibs: ["lib/react.js", "lib/react-dom.js"],
	libs: [".js"],
	style: [".css"],
	default: [/.*/]
}

let functions = {
	uncachable: network,
	views: networkThenCache,
	json: cacheAndUpdate,
	images: cache,
	static: cache,
	staticLibs: cache,
	libs: cache,
	style: cache,
	default: networkOrFallback,
}

// Fetch, timeout, load from cache or just load
self.addEventListener('fetch', function(evt) {
	// Unlocal resources
  if (new URL(evt.request.url).host != self.location.host) {
		return network(evt);
	}

	let anyMatch = (text, list) => {
		let id = 0;
		let matched = false;
		while(!matched && (id != list.length)) {
			if (typeof list[id] == "string") list[id] = new RegExp(list[id] + "$")
			if(text.match(list[id])) matched = true;
			id++;
		};
		return matched;
	}

  for (key in paths) {
  	if(anyMatch(evt.request.url, paths[key])) {
  		console.debug('[SW]', 'Loading: ', evt.request.url, 'with: ', functions[key].name);
  		functions[key](evt);
  		return;
	  }
	}
});