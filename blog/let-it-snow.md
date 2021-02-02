---
title: Let it snow!
description: Building an optimized snowing weather with the Web Animations API and Promises.
created: 1612108162776
---

> Easter egg: Run this page with `#snow` at the end

🌨⛄ Do you like snow? Does it snow in your region? Are we in December yet?

We are going to create virtual snow using the chilly _[Web Animations API][animation-mdn]_.

## A snowflake!

First and foremost, let's create a snowflake! Our snowflake will be loaded as an `.svg` file provided by the beautiful [Ionicons].

### Loading the snowflake

You can store it as a local file then load it as SVG, or use it from Ionicon's library, but we will be storing it as a string.

```js
let svg_str = `<!-- snowflake svg text here -->`;
```

### Parsing the string into a DOM element

Then we'll use `DOMParser` to parse the string into an actual DOM element.

```js
let snow = new DOMParser().parseFromString(svg_str, "text/xml").children[0];
```

> **Note:** Because `parseFromString` returns a `#document`, we used `.children[0]` to get the `<svg>` element instead. (`<svg>` is equivalent to `<html>`.)

### Setting the snowflake to float

Our snowflake is fixed (it doesn't scroll like other elements) and initially, it is placed just above the screen.

```js
snow.style.position = "fixed";
snow.style.top = "-24px";
```

## Creating a new snowflake

Because our page will have many snowflakes, we'll clone the snowflake we just created.

```js
let newSnow = () => {
	let clonedSnow = snow.cloneNode(true);
	// we pass true to clone the node deeply (that is, with all it's children).
};
```

> **Note:** from now on, our code will be in the `newSnow` function.

Next, we'll generate a random left position for that snowflake

```js
let left = Math.floor(document.body.offsetWidth * Math.random());
// we use Math.floor to ensure left is an integer
clonedSnow.style.left = left + "px";
```

Then we'll just add it to the DOM

```js
document.body.append(clonedSnow);
```

### Animating the snowflake

Here we'll just use _[Web Animations API][animation-mdn]_ to animate an element. To use the API, we run `element.animate(keyframes, options)`. You can read more in the [MDN Page][animation-mdn].

To make real snow effect, we will also generate a random speed (think the animation's duration)

```js
let time = Math.max(10 * Math.random(), 5) * 1000;
// Math.max choose the largest argument it was given. By using it here, we restrict time to be larger than 5.
```

We will animate the snow to change it's `top` CSS property gradually. At the end, the element will be placed just below the viewport, where you can't see it.

```js
let anim = clonedSnow.animate(
	{
		top: window.innerHeight + 24 + "px",
	},
	{ duration: time, fill: "forwards" }
);
```

One last thing, we'll do Garbage Collection. When the animation ends, delete that snowflake as it is no longer useful.

```js
// garbage collection
anim.onfinish = el => el.target.effect.target.remove()
```

Now go ahead, in your console, run `newSnow()`. You'll see a snowflake falling slowly.

## Snowing!!!

So far, we can only create snowflakes on demand by running `newSnow()` everytime we need it. What about we create a loop that create as many snowflakes as possible?

### The problem with native JS loops

If you use `for` loops or `while` or whatever, it won't work. Why? It will create many snowflakes at a time. Your browser will be filled with snowflakes and unless you are on a supercomputer, your browser will crash, badly. This creates a need for a custom loop!

### Looping asynchronously

#### Async Iterate

Here's an implementation of an async loop.

```js
let asyncIterate = async (start, iterations, fn) => {
	// initialize the iterator
	let i = start;
	let call = res => fn(res)
		// waits for the function to resolves before calling the next iteration
		.then(async result => {
			if (i >= iterations) return result;
			i++
			return await call(i)
		});
	return await call(i);
}
```

It accepts 3 parameters. `start` is what the iterator is initialized as. `iterations` is pretty self-explanatory. it is the number of times the function will run. then `fn` is the function to execute.

It is important to remember that this is an async loop. That means, it will run the function, _then waits that it resolves_. then execute the next iteration.

#### wait

Next is the `wait` function. This is a wrapper around `setTimeout`. It waits some time (in milliseconds), then execute a function. (It is available on the npm registry as [async-wait-then]).

```js
wait = time => new Promise(res => setTimeout(res, time))
```

Here is a simple example using `wait`.

```js
wait(1000)
	.then(() => console.log('This will be logged after one second!'));
```

#### Using `wait` and `asyncIterate` to snow

By combining `wait` and `asyncIterate`, we get a powerful function set that uses the Promises API.

So, to create realistic snow (and prevent browser crashes) we'll have to wait before we create a snow element

```js
asyncIterate(0, 10, async () => {
	await wait(1000)
	newSnow()
})
```

This will make it rain 10 snowflakes, but with an interval of 1 seconds between each snowflake

To make it look more realistic (and add some suspense), we will wait for a random amount of time instead of the static 1 second.

```js
asyncIterate(0, 10, async () => {
	await wait(Math.max(3 * Math.random(), 1) * 300)
	newSnow()
})
```

But then, this will only create 10 snowflakes. Let's make it rain forever.

```js
asyncIterate(0, Infinity, async () => {
	await wait(Math.max(3 * Math.random(), 1) * 300)
	newSnow()
})
```

The full code, complete with some optimizations is posted as [Github Gist][gist]

[gist]: https://gist.github.com/vixalien/4a9fb790036d01399186e7c3050c2560
[animation-mdn]: https://developer.mozilla.org/en-US/docs.Web/API/Web_Animations_API
[ionicons]: https://ionicons.com
[async-wait-then]: https://npmjs.com/package/async-wait-then