(() => {

let prefetched = [];

let normalize = (url) => {
  url = new URL(url);
  return url.origin + url.pathname;
}

prefetched.push(normalize(window.location))

let observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const url = normalize(entry.target.href);
    	if (prefetched.includes(url)) return;
    	if (new URL(url, location).origin != location.origin) return;
    	prefetched.push(url);
    	prefetch(url)
    		.catch(err => {})
    }
  })
});

// observe when Idle
requestIdleCallback(() => 
	Array.from(document.querySelectorAll('a:not([prefetch="false"])'))
		.forEach(link => 
			requestIdleCallback(() => observer.observe(link))
		)	
)

let xhrPrefetch = url => {
	return new Promise((resolve, reject) => {
		const req = new XMLHttpRequest();

		req.open('GET', url, true);

		req.onload = () => {
			(req.status == 200) ?
				resolve(req) :
				reject(req)
		}

		req.onerror = err => reject(err);

		req.send()
	})
}

let linkPrefetch = url => {
	return new Promise((resolve, reject) => {
		const link = document.createElement('link');

		link.rel = 'prefetch';
		link.href = url;
		link.onload = resolve;
		link.onerror = reject;

		document.head.appendChild(link);
	})
}

let supportLinkPrefetch = () => {
  let link = document.createElement('link');
  return (link.relList || {}).supports && link.relList.supports('prefetch');
}

let doPrefetch = url => supportLinkPrefetch() ? linkPrefetch(url) : xhrPrefetch(url);

let prefetch = url => {
	if (navigator.connection) {
		let conn = navigator.connection;
		if (conn.effectiveType.includes('2g') || conn.saveData) return;
		return doPrefetch(url);
	} else {
		return doPrefetch(url);
	}
}})/*()*/;
// Disable prefetch for now