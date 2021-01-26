var udomdiff=function(e){"use strict";return e.default=function(e,r,i,f,l){for(var n=i.length,t=r.length,s=n,o=0,a=0,v=null;o<t||a<s;)if(t===o)for(var u=s<n?a?f(i[a-1],-0).nextSibling:f(i[s-a],0):l;a<s;)e.insertBefore(f(i[a++],1),u);else if(s===a)for(;o<t;)v&&v.has(r[o])||e.removeChild(f(r[o],-1)),o++;else if(r[o]===i[a])o++,a++;else if(r[t-1]===i[s-1])t--,s--;else if(r[o]===i[s-1]&&i[a]===r[t-1]){var g=f(r[--t],-1).nextSibling;e.insertBefore(f(i[a++],1),f(r[o++],-1).nextSibling),e.insertBefore(f(i[--s],1),g),r[t]=i[s]}else{if(!v){v=new Map;for(var h=a;h<s;)v.set(i[h],h++)}if(v.has(r[o])){var d=v.get(r[o]);if(a<d&&d<s){for(var c=o,B=1;++c<t&&c<s&&v.get(r[c])===d+B;)B++;if(d-a<B)for(var b=f(r[o],0);a<d;)e.insertBefore(f(i[a++],1),b);else e.replaceChild(f(i[a++],1),f(r[o++],-1))}else o++}else e.removeChild(f(r[o++],-1))}return i},e}({}).default;

function updateLinks() {
	document.querySelectorAll('a').forEach((link) => {
		if (link.host === window.location.host) {
			link.setAttribute('data-internal', true)

			link.addEventListener('click', async (e) => {
				e.preventDefault()
				const destination = link.getAttribute('href')
				await updateDom(destination)
					.then(() => history.pushState({route: destination}, destination, destination))
			})
		} else {
			link.setAttribute('data-external', true)
		}
	})
}

window.onload = function () {
	updateLinks()

	window.onpopstate = function (state) {
    updateDom(window.location.pathname);
  };
}

async function updateDom(path) {
	if (document.documentElement.hasAttribute("data-loading")) {
		document.documentElement.removeAttribute("data-loading");
		setTimeout(() => document.documentElement.setAttribute("data-loading", ""), 10)
	} else {
		document.documentElement.setAttribute("data-loading", "new")
	}
	
	try {
		const res = await fetch(path)
		const data = await res.text()
		
		const get = (o) => o; // Just returning the provided node back

	  const parent = document.querySelector("html");
	  const currentNodes = document.querySelector("html").childNodes;
	  const dataNodes = new DOMParser()
	    .parseFromString(data, "text/html")
	    .querySelector("html").childNodes;

	  udomdiff(
	    parent, // where changes happen
	    [...currentNodes], // Array of current items/nodes
	    [...dataNodes], // Array of future items/nodes (returned)
	    get // a callback to retrieve the node
	  );

		updateLinks()
		// window.scrollTo(scrollLeft, scrollTop)
	} finally {
		document.querySelector("html").removeAttribute("data-loading")
	}
}