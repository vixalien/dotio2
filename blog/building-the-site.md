---
title: Building the site
description: The perilous journey of building this site!
created: 1611671223822
---

Checks for the site:

- Simple
- Beautiful visually
- Custom-looking
- Up to today's standards

If you know about designing and developing, you noticed that many of those elements don't usually go together. For instance, A site can not usually be simple and good-looking. [Bellard's site](http://bellard.org) for example, is the simplest blog I've ever seen, yet it is by far not good looking as it is built with HTML only (no additional styles).

And also, usually, if you want to make a modern site, you must follow some certain boilerplate, whether you want it or not, that is, a UI library (speak of React, Angular or whatelse) is inevitable, while a UI library is certainly a facilitator to building your site, it will most certainly add weight to your application so it will no longer be simple. With UI libraries also comes transpilers which means that to host your site will take more time than it takes to fall asleep.

## Steps

1. [Go static](#go-static)
1. [UI library](#ui-library)
1. [Build tools](#build-tools)
1. [On PWA](#on-pwa)

## Go static!

Yes the first step to building a lightweight site is going static, that is serving mostly HTML and CSS code, with a minimum of Javascript. And, oh, that Javascript must not be necessary.

As an end-user I'm sure you hate a site that shows: _Loading..._ for like 3 seconds even if in the end a simple page will be shown.

Going static - 2 options:

- Server-side rendering (SSR)
- Static-site generation (SSG)

### Server-side rendering (SSR)

Let's take this scenario: You have built your site using [React](https://reactjs.org). React code is written in JSX, a superset of the beloved **X**HTML within Javascript.

Take this simple JSX component as an example:

```js
// JSX
let Hello = ({ name }) => {
	return <div>{name}</div>
}
```

Using SSR, every time your user requests a page, you would have to transpile the component, usually with [Babel](https://babeljs.io). This will produce valid JS (usually ES2015) which NodeJS can run natively.

```js
// native JS
import React from 'react'

let Hello = ({ name }) => {
	return React.createElement('div', null, name)
}
```

Then, you would run the code above to produce pure HTML.

```html
<div>vixalien</div>
```

SSR is cool but with not so elegant performance: Because the page is rendered at runtime, specifially, on request, the page will be usually slow, because of all the build steps, and will not be prepared for high traffic unless you invest more resources.

### Static-side generation (SSG)

SSG is when you build your site, whatever it is built in, into static HTML **at build time**. The site will now live on as static HTML ready to be served as-is.

SSG is not suitable for cases where Data is needed at runtime, but for a simple blog, it will do.

👑 Winner: **SSG**

## UI library

Ah, here we go. A UI library (not a component library) _―for me―_ is a library that provides means to use generate content _easily_. There are many many options, ranging from Ionic Framework to Backbone.JS, but for some reasons, I fell in love with React.

⚛ React winning features:

- Allow to reuse your Javascript tools (thru JSX)
- Doesn't feel like a template engine (allows fast and easy code prototyping, unlike Angular)
- May support SSR & SSG with some hacking
- Have a strangely large community

Drawbacks

- Requires 