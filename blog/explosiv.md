---
title: Explosiv
description: "The most lightweight, yet fully featured static-site generator you'll see."
created: 1611854623290
---

While I was creating this blog, I thought.

About all the front-end options I had. Because, I was not going to write static HTML for a fully featured site! While I had already met [stylus] for all my CSS needs, I was still looking for an option to write my markup seamlessly.

## React

TBH, I love [React]. It's syntax, it's community, it's everything really. Yet, React also put so much overhead on your site, like Build times, Babel, Webpack, hydrating or rendering etc. After some digging, I found out the foundation behind React was [JSX][jsx-intro], dubbed as XHTML within Javascript.

```js
// JSX syntax is coool!
let Site = (data) => {
	return <div>Hello {data.name}!</div>
}
```

Well because JSX is tightly coupled with React, I kinda thought it would not work on it's own, but yet [kartiknair] made [Dhow], which proved me otherwise.

## Dhow

[Dhow], is a static site generator, that uses JSX to render static HTML at build time, ready to be served as is. It is quick, _very fast_ and still uses JSX, so migrating my app from React was _a breeeeze_.  Until I encountered the severe limitations of Dhow.

Dhow was very young. That means It just implemented JSX, nothing else. Many features were lacking. While creating this site, I cloned Dhow. I found myself adding many features as I wanted. I saw it was incredible. I decided to push it to My Github as [Explosiv]

## Explosiv

[Explosiv], being a clone of [Dhow], inherits all it's current features. Here is a simple example.

First, add `explosiv` to your site's dependencies.

```bash
npm i explosiv
```

And install explosiv globally, so that you can use the CLI wherever you are...

```bash
npm i explosiv
```

To make an Explosiv site, just create a folder and generate a `pages/` directory. Add a simple `index.js` file to get started.

```js
// pages/index.js
import Explosiv from 'explosiv'

export default () => (
	<main>
		<h1>Hello there!</h1>
		<p>
			This is a super simple example of generating static files using Explosiv.
			You can learn more at{' '}
			<a href="https://github.com/vixalien/explosiv">here</a>
		</p>
	</main>
)
```

To build, and serve, the site use:

```bash
explosiv build
explosiv serve
```

Et voìla! A static site was generated in your `/out` directory. Magic right!

### How it works

You can learn how JSX works by [this article][jsx-intro] from the React team.

You can read a very nice article by kartiknair, the creator of Dhow [about converting JSX into HTML][jsx-post] **without React**.

TL;DR: We use a _pragma_ function that generate real DOM elements using a minimal DOM implementation, [min-document].

```js
// A general overview of how it works.
// !! Not real code
const document = require('min-document');

const createElement = (tag, props, ...children) => {
	const element = document.createElement(tag)

	children.forEach((child) => {
		element.appendChild(child)
	})

	return element
}
```

We transpile Javascript using [ESBuild], a verrry fast, yet fully featured transpiler. We transpile the code in the pages directory  from JSX into pure, native Javascript, while replacing all instances of JSX with our _pragma_ function.

The transpiled file will look like this

```js
// transpiled/index.js
let { createElement } = require('explosiv')

export default () => (
	createElement('main', null, 
		createElement('h1', null, 'Hello there!'),
		createElement('p', null, 
			'This is a super simple example of generating static files using Explosiv.',
			'You can learn more', ' ',
			createElement('a', {
				href: "https://github.com/vixalien/explosiv"
			}, 'here'
		),
	)
)
```

At the end we render our DOM into static HTML by using `document.toString()` and piping the output into the relevant output directory.

### Impovements over Dhow

Explosiv, is a personal project. It is not a competitor, or even an alternative to Dhow, yet all current improvements are listed for anyone interested. Many of these can also be implemented in Dhow if worth it.

- Provide an `explosiv serve` command that serve a static directory on a specified port (defaults to  3000).
- `Head` elements are added on top of `document.head` instead of the bottom (allowing overriding existing tags)
- Rewritten for `build` code to be independent and ease debugging
- Does not use `polka` but the more minimal `connect`.
- Use middleware deemed as useful like `morgan` which log all requests and `compression` which compress resources on HTTP.
- Fixed bugs on edge cases like rendering `<>` (aka Fragment tags) as root elements and rendering empty children.
- Added support for `className` HTML attribute.
- Fixed bug where self-closing (like `<img src="/path/to.img">`) elements doesn't render correctly.
- Use tabs instead of 4 spaces lol!
- And other many but subtle changes.


[react]: https://reactjs.org
[stylus]: https://google.com?q=stylus+css
[kartiknair]: https://www.github.com/kartiknair
[dhow]: https://www.github.com/kartiknair
[explosiv]: https://www.github.com/vixalien/explosiv
[jsx-post]: https://kartikn.me/writing/jsx-without-react
[min-document]: https://npmjs.com/package/min-document
[esbuild]: https://esbuild.github.io
[jsx-intro]: https://reactjs.org/docs/introducting-jsx.html