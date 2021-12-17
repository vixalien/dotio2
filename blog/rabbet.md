---
title: How Rabbet Works
description: "A lightweight site that allow you to build pages from  links."
created: 1639767430259
---

**Rabbet** is a very small and minimal app that allows users to create pages on the Internet with a set of URLs.

I will try my best to share how Rabbet works in this short write-up. You can try to browse the source to follow along the explanations.

Useful links:

- [Rabbet dashboard ↗][rabbet]
- [Github ↗][github]
- [Test Page ↗][test]

# Rabbet is a monorepo

Rabbet is built as a monorepo. That is, it is one repository (folder) but it contain other packages inside of it. The monorepo doesn't use any repo manager like Lerna or Yarn workspaces as the packages are not tightly coupled. The different packages are for different uses:

- **render:** a simple library that consume pages as JSON and return rendered HTML ready to be used in `pages` or `dash` to preview pages.
- **db:** a library that allows other packages to access the database where the users and pages are stored.
- **pages:** the express app that serves the rabbet pages at [username].rabbet.me/[page-slug].
- **dash:** a NextJS app that renders the [Rabbet dashboard ↗][rabbet] that serves as a front end that allows users to sign in and create pages.

## Render

`render` was one of the hardest packages to create. The hardest part is that it has different templates so that a user can choose a template they choose. 

### Templates

TODO: Allow user to select template in Dashboard UI

Templates reside in the `/templates` directory. The default template is called **Lnks.** Templates favorably use **React** and **Stylus** to render HTML and CSS respectively. Because the `render` package is meant to be run in the browser, Templates can't access the filesystem. So the template is split into 2 files:

#### `metadata.js`

This file is run at build time and is used to get all files necessary using `require` statements. For example, **Lnks** use `metadata.js` to load it's JSX file (the one that will be used to render the page into HTML.) And the CSS file that will be used to style the rendered page.

```js
const jsFn = require("./page.jsx").default;
const cssString = require('./style.css');

module.exports = async () => {
	return { cssString, jsFn };
}
```

#### `page.js`

This file is used to provide info about the template itself. It exports a JSON object with the following properties and a render function.

```js
{
	"label": "lnks",
	"settings": [
		{
			"key": "show_rabbet",
			"label": "Show Powered by Rabbet",
			"description": "Show the text 'Powered by Rabbet' at the end of the page.",
			"type": "boolean", // can be boolean, number, string
			"default": true,
		}
	],
	render,
};
```

The settings property affect Settings related to the template itself.

The render function is a function that is fed the Page JSON and a meta attribute (which is the data returned from `metadata.json`.) The `render` function returns an object with properties that will be converted into HTML.

```js
let render = (page, meta) => {
  return {
    title: "Sample page",
    about: "A sample page",
    scripts: [
      { src: "https://uri", type: "module" },
      { html: "console.log(\"Hello\")" },
      "https://uri",
      "console.log(\"Hello\")"
    ],
    links: [
      { href: "https://uri", rel: "stylesheet" },
      "https://uri"
    ],
    styles: [
      { html: 'body { color: "red" }' },
      'body { color: "red" } '
    ],
    html: "HTML"
  }
}
```

The `html` attribute is what will be in the body of the rendered page. The reason for `styles`, `links` and `scripts` is that the template may or may not need some scripts. For example, **Lnks** only use Lite Youtube scripts and external CSSs when the page's hero is a YouTube Embed.

## DB

> **Note:** All DB functions are expected to be promises.

This is the most trivial package of all. It provides an `/init` script that is called before any database operation (may be called multiple times.)  It's main export is a file that provide a set of trivial operations such as:

### DB operations.

- **get(COLLECTION, id):** Get an item with given `id` from `collection`.
- **set(COLLECTION, id, data, merge = false):** Update `data` for an item with given `id` from `collection` and whether to `merge` the new data with already exisiting data.
- **add(COLLECTION, data):** Add an item with given `data` to `collection`. The `id` is inferred automatically.
- **query(COLLECTION, ...queries):** Perform a set of `queries` on given `collection`.
- **deleteAll(COLLECTION, ...queries):** Delete all records that match a set of `queries` on given `collection`.

A query is built with the exported `where` property. For example, to get all users who have the given username use:

```js
import db from "@rabbet/db";

db.get("users", db.where("username", "==", "exampleusername"));
```

### Account operations

> In the future, all account operations will be moved to `/account` instead of the current default export.

- **getCurrentUser():** Get the logged in user or null.
- **getRealUser({ uid }):** Get the real user's info (from the database) based on the `uid` returned from login.
- **onCurrentUserChange(callback):** Calls the given `callback` when the current user changes (logged out, logged in, loaded, logged out remotely)

> **Note:** Firebase take a while to initialize so when yu call `getCurrentUser` for the first time it will always return null. Rabbet doesn't use `getCurrentUser` but instead listen to the `onCurrentUserChange` to get a real result when the user has changed.

Example:

```js
import db from "@rabbet/db";

let user = await dbgetCurrentUser();
```

### Optimized Account operations

Optimized account operations are located at `/account`.

- **login {}:** Currently an object with `{ withGoogle }` that launchs a login dialog.
- **logout():** Logout from the current device.

Example:

```js
import account from "@rabbet/db/account";

loginWithGoogleButton.addEventListener("click", account.login.withGoogle);
logoutButton.addEventListener("click", logout);
```

## Pages

`pages` is a small Express app that resides at `https://rabbet.me`. It renders a page from the given url. You can always visit a [test rabbet page ↗][test].

Assuming the root URL is `rabbet.me`, the pages app routes using the following rules:

- **[username].rabbet.me/[slug]:** Return the page with given `slug` created by user with given `username`.
- **rabbet.me/:** Redirects to Rabbet dashboard.
- A 404 page with a link to the Rabbet dashboard when a resource isn't found.

> **Note:** Pages doesn't currently use the `db` package but use a custom implementation that access the firebase API using URLs instead of a native driver (library) because it was thought to be faster. TODO: fix this.

## Dash

This is the dashboard that appears to all visitors of the service. It allows users to log in and create accounts, create, modify and delete pages. It is a NextJS app.

The package has the following directory structure:

<div style="white-space: break-spaces; font-family: monospace;">

  **dash**
  ├─ **components**: Components used throughout the app.
  ├─ **lib**: Useful libraries and tools.
  │  ├─ **constants**: Holds app constants.
  ├─ **pages**: Contains JSX files for the project.
  │  ├─ **account**: Pages related to user accounts'
  │  ├─ **pages**: Pages related to linkpages created by users
  │  ├─ **home**: Homepage: the site which the users see when not logged in.
  ├─ **public**: Static files
  ├─ **partials**: Reused high-level components
  ├─ **schemas**: Validation schemas for different objects
  ├─ **stores**: Zustand stores for different objects like user, pages etc.
  ├─ **stylus**: Stylus for the site that will be transcribed into CSS

</div>

---
<br/>

If you've read this much, you might as well create a PR for a template. Inspirations: [Orcd ↗](https://skepta.orcd.co/all-in) [Linkfire ↗](https://ada.lnk.to/Intro) [Dev.page ↗](https://dev.page/vixalien)

[rabbet]: https://dash.rabbet.me/account
[github]: https://github.com/vixalien/rabbet3
[test]: https://vixalien.rabbet.me/test