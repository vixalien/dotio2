window.loadJS = (src) => fetch(src)
	.then(lib => lib.text())
	.then(text => {
		lib = new Function(text)
		lib()
	})