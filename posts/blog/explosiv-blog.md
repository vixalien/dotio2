---
title: Building a blog with Explosiv
description: "Building a static lightweight and fast blog with Explosiv."
publish_date: 2021-12-19
tags: [code, tutorial]
---

Earlier this year, I created [Explosiv ↗][explosiv], a lightweight & fast static site generator that allows pages to be built with JSX. This is a tutorial on how to build a functional blog with Explosiv.

# Terminology

We'll first talk about how the blog will be built. You can directly [jump to the programming part](#code) or directly view [the source code of the final blog on Github][explosiv-blog-source].

## What's in *this blog*?

The blog will be a simple one with room for improvement (I invite you to be creative.) It will simply render a homepage, an about page and a group of posts. That's it. We'll not be using any heavy styling or custom components library. Of course we'll use **Explosiv** to build the blog and we'll write the blog posts themselves in **Markdown**.

## Explosiv?

[Explosiv ↗][explosiv] is a NodeJS framework that uses JSX to render pages. It transforms `.jsx` files into `.html` files. That is: you write code that uses components, run js etc and Explosiv convert them into native HTML ready to be displayed to your favorite web browser.

## JSX?

[JSX ↗][jsx] stands for **XHTML in JSX** and it allows you to write HTML inside JS files simplifying data binding. JSX was created by the React team and is famously used within React so if you come from React, Explosiv will be easy for you to understand because it uses that same loved JSX syntax. Here is an example of JSX syntax.

```jsx
// JSX syntax is coool!
let Site = (data) => {
	return <div>Hello {data.name}!</div>
}
```

<details><summary>Why not use React instead? or NextJS? or Gatsby? - Rant</summary>

&nbsp;

## Why not use React instead? or NextJS? or Gatsby?

React is only a library. React is in the core of NextJS or Gatsby and they all use it to create their own opinionated way of rendering React pages into HTML pages.

[NextJS ↗][nextjs] is a framework created by Vercel and it provides many features to build very complex web apps: API Routes, Internationalisation, Analytics, Typescript, Image Optimization. It's many features means you can use it to create any type of website, from TikTok to Twitch to [others ↗][nextjs-showcase]. However this means that it's also pretty bloated for simple websites like blogs where you end up not using much of the features. And the site ends up containing many and many JS files you'll not use and takes some time to load.

![NextJS waterfall][nextjs-waterfall]

As you can see in the above screenshot from https://www.joshwcomeau.com/blog/how-i-built-my-blog. NextJS served more than 120 requests weighing 6 MBs in 13 seconds. Hmm??

[Gatsby ↗][gatsby] touts itself as a fast static site generator that also uses React. [It is NOT fast ↗][gatsby-hn]. It takes about 30 seconds to make a production build. Imagine what would happen if you customize your site. Plus there are also some features that I think are overkill like GraphQL integrations. I mean I get it, but I would like to install GraphQL as a plugin, not baked into my static site that won't use it

<hr></details><br><br>


## Markdown?

[Markdown][markdown] is a lightweight language that will convert plain text to formatted text. It's the language we'll use to write our own blog posts. It is used by bloggers, software developers and documentation writers. All those `README.md` files on GitHub are Markdown!. You can view the simple syntax of Markdown here:

```md
# This is a heading

This is a paragraph wil _emphasized_ and **strongly emphasized** text. And this is [a link to Google](https://google.com)

1. This is an ordered list
2. Another list item
3. - A nested unordered list
   - Another list item.
```

This blog post you are reading is written in markdown too! You can [view the source code here ↗][post-source].

# Code

Explosiv is a NodeJS framework. That means you'll need to have NodeJS installed first. NodeJS comes with a package manager called `npm` and we'll use it to install Explosiv.

## 1. Install Explosiv

The first step is creating a folder for your blog. I used `explosiv-blog` for mine. Open the folder in your favorite shell (or command prompt or command line interface). You'll first need to initialize the folder as a NodeJS project.

```bash
npm init -y
```

NPM will generate a `package.json` that will be used to identify your app and manage your dependencies. The next step is to install Explosiv.

```bash
npm install explosiv
```

You're now ready to start building with Explosiv.

## 2. Create homepage and about page.

Now go ahead and create a folder called `pages` at the root of your project. This folder will hold all Explosiv pages.

### Homepage

Create a file called `index.js` for our homepage. `index` is a special name as it denotes that this file will be the first one that the user sees when they visit our site for the first time. Add some simple JSX to our index page to show a warm welcome message to visitors of the blog.

```jsx
// index.js
let Homepage = () => {
	return <>
		<Head>
			<title>my blog</title>
			<meta name="description" content="This is my own blog"/>
		</Head>
		<main>
    		<h1>Welcome to my blog</h1>
    		<p>This is my cool new blog built with Explosiv. <a href="/about">About Me</a></p>
    	</main>
	</>
};

export default Homepage;
```

We can now see how our site will look in the browser. Switch to your shell and run the following command.

### Explosiv Development mode

```bash
npx explosiv dev
```

This will start Explosiv in Development Mode, build the app then serve it locally at http://localhost:3000. Visit the URL to view the homepage.

![Blog homepage][blog-homepage]

### About Page

Create a file called `about.js`. This will be our about page and it will be accessible at `/about` on our website.  Add some JSX for the about page as well.

```jsx
// about.js
let About = () => {
	return <>
		<Head>
			<title>about my blog</title>
			<meta name="description" content="About my blog"/>
		</Head>
		<main>
    		<h1>About my blog</h1>
    		<p>Hey there! Welcome to my new blog built with Explosiv. Here you can find all my blog posts. <a href="/">Go back to homepage</a></p>
    	</main>
	</>
};

export default About;
```

Now go to http://localhost:3000/about to view the about page. Note that Explosiv automatically rebuilt the app because we started explosiv in development mode.

> **ProTip:** Creating a page at `pages/about.js` is equivalent to creating one at `pages/about/index.js`.

## 3. Styling

Now the page looks a little bit ugly doesn't it? We can add CSS styles to make our site look nicer. We'll create a folder called `public/` and create a stylesheet at `public/app.css`. Files in the `public/` folder will be publicly accessible so you can visit http://localhost:3000/app.css to view the stylesheet.

```css
/* public/app.css */
body {
  max-width: 600px;
  padding: 0 20px;
  margin: 0 auto;
  font-family: system-ui, -apple-system, "Segoe UI", "Roboto", "Ubuntu", "Cantarell", "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
}
```

Now to allow Explosiv to include the above CSS, create a document file at `pages/_document.js` to customize the overall behavior of the blog.

```jsx
// pages/_document.js
let Document = () => {
	return (<html lang="en">
		<head>
			<meta charset="utf-8"/>
			<meta name="viewport" content="width=device-width,initial-scale=1"/>
			<link rel="stylesheet" href="/app.css"/>
		</head>
		<body>
			<div class="root"></div>
		</body>
	</html>)
}

export default Document;
```

The `_document.js` file is a special one because it provides a wrapper to the whole site, hence it can be used to customize the site. Let's explain the components of this `_document.js`:

- `<html lang="en">` specify the language of our site.
- `<meta charset="utf-8"/>` to specify the character set of our site to prevent incorrect renderings of our site's text.
- `<meta name="viewport">` to correctly scale the site for mobile users.
- `<link rel="stylesheet">` to allow web browsers to fetch our stylesheet.
- `<div class="root"></div>` where the main page's content will be rendered.

You can now refresh http://localhost:3000 in your browser to see the updated page.

![Looks better already][styled-blog-homepage]

Now you know how to add custom styles, the limit is the sky. You can start to style your app this way. You can even use PostCSS or Stylus to build stylesheets faster.

## 4. Blog Posts

### Writing the first blog post

Off to writing the real posts now. Create a blog post at `blog/first-post.md`:

```markdown
---
title: My First Blog Post
description: "The first blog post to be created on this site."
created: 1639915508100
---

Hello people, a warm welcome to you. This is the first blog post on this site.

```

> **Note:** Notice the block at the beginning of the file that starts and ends with `---`. This is called Front Matter and is used to describe the blog posts like who wrote it, the title, when was it written etc. Also, be sure to update the `created` field to show the real time you created it. [View time in terms of milliseconds after the UNIX epoch][vixalien-date].

### Showing the blog posts on the homepage

Now comes the part that requires us to be a little bit ingenious. We are going to show all the blog posts on the homepage and provide links to them.

First of all, we'll be installing 2 other dependencies to allow us deal with Markdown files.

```bash
npm install front-matter marked
```

- `front- matter`: Allows use to parse page's front matter.
- `marked`: Allows use to parse Markdown files into HTML.

 We are going to write a script at `src/posts.js` that loads all blog posts then give us info about them.

```js
// src/posts.js

// Import dependencies
let path = require("path");
let fs = require("fs");
let fm = require("front-matter");

// This function resolves where files or folders are relative to the `cwd` or current working directory.
let resolve = (...link) => path.resolve(process.cwd(), ...link);

// Where all our blog posts are stored
let blogsPath = resolve("blog");

let blogs = fs
    // Get all blog posts in the `blogsPath` folder.
	.readdirSync(blogsPath)
	.map((blog) => {
     	// Get the slug. i.e `first-post` from `first-post.md`
		let slug = blog.replace(/\.md$/, "");
		// And return an array of posts and their front matter
		// Example: [ "first-post", { title: "My First Blog Post", created: 1639915508100, description: "..." } ]
		return [
			slug,
			{ slug, ...fm(fs.readFileSync(resolve(blogsPath, blog), "utf8")).attributes },
		]
	})
	// Sort the blog posts by date created
	.sort(([_, a], [$, b]) => b.created - a.created);

// Export the posts as an object
module.exports = Object.fromEntries(blogs);

```

We are then going to display all blog posts on the homepage. To do this, we'll create a component at `components/posts.js` that uses the post data to display a list of info about posts.

```jsx
// components/posts.js
// Load the posts as an object.
import postsJSON from "../src/posts";

let PostsCard = ({ ...props }) => {
    // Convert the posts object into an array.
	let posts = Object.entries(postsJSON)

	return (
		<p>
			<h2>Posts</h2>
			<div className="posts">
     			{/* Display the posts one by one */}
     			{/* Display each post's title, date of creation and description with a link to read the post */}
				{posts.map(([slug, { title, description, created }]) => (
					<p>
						<a href={"/post/" + slug}>{title} &rarr;</a><br/>
						<small>{new Date(created).toDateString()}</small><br/>
						<span>{description}</span>
					</p>
				))}
			</div>
		</p>
	);
};

export default PostsCard;

```

We'll then modify `pages/index.js` to show blog posts using the newly created component on the homepage.

```jsx
// index.js
import PostsCard from "../components/posts.js";

let Homepage = () => {
	return <>
		<Head>
			<title>my blog</title>
			<meta name="description" content="This is my own blog"/>
		</Head>
		<main>
    		<h1>Welcome to my blog</h1>
    		<p>This is my cool new blog built with Explosiv. <a href="/about">About Me</a></p>
    		<PostsCard/>
    	</main>
	</>
};

export default Homepage;
```

At this point you can visit http://localhost:3000 to view the site in a web browser. Notice the list of posts

![Blog Homepage with Posts][blog-homepage-with-posts]

### Showing the blog posts on their URLs

Yay!! Our blog can now show posts. But if you click on the link to read the blog post, you'll reach a 404 page. We are going to create a page that will render each blog post to allow readers to read it.

#### Meet dynamic pages

We would need to write each blog's page like `/pages/post/first-blog.js` and `/pages/post/second-blog.js` etc. However, there is a feature called **Dynamic Pages** that simplify the development of related pages. We will be creating one single dynamic page at `/pages/post/[slug].js` that will render each post according to the `[slug]` provided. For example, visiting `/post/first-blog` will render `/pages/post/[slug].js` with a `slug` that is equal to `first-blog`.

> **Note:** You can change `[slug]` to any other name you like. For example `[id]` or `[post]`. However, it is important to enclose the slug in brackets (`[]`).

```jsx
// pages/post/[slug].js

// Import dependencies, will be used later
import { promises as fs } from 'fs'
import path from 'path'
import matter from 'front-matter'
import { marked } from 'marked'

// The Post component will be used to render each post
const Post = ({ post }) => (
	<>
		{/* Add a HEAD that shows the title of the page and expose the description of the post */}
		<Head>
			<title>{post.attributes.title} - vixalien</title>
			<meta name="description" content={post.attributes.description} />
		</Head>
		<main>
			{/* Show a link to the homepage */}
			<div style={{marginTop:"20px"}}><a href="/">Homepage</a><br/><br/></div>
			<small>{new Date(post.attributes.created).toDateString()}</small>
			<h1>{post.attributes.title}</h1>
			<p>{post.attributes.description}</p>
			<div>===</div>
			<br/>
			{/* Render the post's content as HTML in an `article` tag */}
			<article html={post.content}/>
		</main>
	</>
)

export default Post;
```

#### `getPaths` and `getProps`

However, the above content is not enough for a dynamic page to work. For it to work correctly, we need to export 2 other functions beside the default export which is the main page JSX.

The first needed export is `getPaths` and it is used to determine the number of all acceptable paths (or slugs). For example, it can be used to allow `/post/first-blog` to be rendered and `/post/unknown-post` to return a 404 page (Not Found). In our case, it's pretty straightforward to know the range of acceptable slugs. We just read the `blog` folder and see which blog posts are there:


```jsx
// Append to the end of `pages/post/[slug].js`
export const getPaths = async () => {
	// Read all files in the `blog` folder.
	const files = await fs.readdir(path.resolve('blog'))
	// Remove the training extensions like `.md` (remove the 3 last characters of filename)
	return files.map((filename) => filename.slice(0, filename.length - 3))
}
```

Now that we know what posts are there, we'll use `getProps` to read info about the post themselves given the slug. The `getProps` function is provided with a `slug` and use it to get information that will be passed to default export of the function (as props.)


```jsx
// Append to the end of `pages/post/[slug].js`
export const getProps = async (slug) => {
	// Read the file named `slug`+.md in the `blog` directory with the utf-8 format.
	let post = await fs.readFile(path.join('blog', `${slug}.md`), 'utf-8')
	// uses the `front-matter` package to get the post's attributes.
	post = matter(post)

	// parse the post's body to get the raw HTML content.
	post.content = marked(post.body)
	// Return an object that will be passed onto the default page export.
	return { post }
}

```

Now visit http://localhost:3000/post/first-blog to read `first-blog`.

![First Blog][blog-post]

## Final Steps

Now that you are done, here are a list of things you should do next.

- Visit [Explosiv][explosiv] on Github for docs, stars etc.
- Host your site on [Vercel][vercel]
- Provide feedback in Github Issues
- View the [source of this site][dotio2], which is written with Explosiv as well.

[explosiv]: https://github.com/vixalien/explosiv
[jsx]: https://reactjs.org/docs/introducting-jsx.html
[nextjs]: https://nextjs.org
[nextjs-showcase]: https://nextjs.org/showcase
[gatsby]: https://www.gatsbyjs.com/
[gatsby-hn]: https://news.ycombinator.com/item?id=24670252
[markdown]: https://www.markdownguide.org/getting-started/
[post-source]: https://github.com/vixalien/dotio2/blob/main/blog/explosiv-blog.md
[vixalien-date]: https://vixalien.com/date
[vercel]: https://vercel.com
[dotio2]: https://github.com/vixalien/dotio2
[explosiv-blog-source]: https://github.com/vixalien/explosiv-blog

[nextjs-waterfall]: /images/posts/explosiv-blog/nextjs-waterfall.webp
[blog-homepage]: /images/posts/explosiv-blog/blog-homepage.webp
[styled-blog-homepage]: /images/posts/explosiv-blog/styled-blog-homepage.webp
[blog-homepage-with-posts]: /images/posts/explosiv-blog/blog-homepage-with-posts.webp
[blog-post]: /images/posts/explosiv-blog/blog-post.webp
