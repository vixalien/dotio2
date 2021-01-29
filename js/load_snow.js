if (location.hash.includes("snow")) fetch('/snow.js')
	.then(lib => lib.text())
	.then(text => {
		lib = new Function(text)
		lib()
	})