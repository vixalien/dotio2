---
title: Hello Deno Blog!
description: "Converting my blog to Deno. Spoiler Alert: it's easy and fast!"
publish_date: 2022-08-20
banner: /images/posts/deno-blog/banner.webp
---

Hello! I'm back to blogging!

Today, I bring very exciting news!! I migrated my blog to [Deno] fully. And now
it runs on the EDGE.

## Preface

Deno is really a solid choice:

- Deno is much faster than Node in practice (think time to build)
- Deno is no longer a project in it's infancy
- Amazing community, packages & docs (seriously, everything is documented)
- [Deno Deploy][deploy]

I recommend you watch [Ryan Dahl's talk about his dream stack][dream-stack],
which inspired me to migrate my blog to Deno. Ryan is the creator of both Deno
and NodeJS. He created Deno to try and fix the mistakes and regrets that have
been made in NodeJS. Watch [10 Things I Regret About Node.js][mistakes] by Ryan
Dahl, which is his legendary talk about him explaining the mistakes he made with
NodeJS.

## Plot

I decided to use the [`deno_blog`][deno_blog] package as it seems too easy to
work with. It's also made by the Deno core team. For example, here is the entire
configuration of Ryan Dahl's blog. It's just a single Javascript file and the
other files are markdown and a few other static files such as images that all
live in `/posts`.

```js
import blog, { ga, redirects } from "https://deno.land/x/blog@0.3.3/blog.tsx";

blog({
  title: "Ryan Dahl",
  author: "Ryan Dahl",
  avatar: "./ry.jpg",
  avatarClass: "full",
  links: [
    { title: "Email", url: "mailto:ry@tinyclouds.org" },
    { title: "GitHub", url: "https://github.com/ry" },
  ],
  background: "#fff",
  middlewares: [
    ga("UA-91675022-1"),
    redirects({
      "iocp-links.html": "iocp_links",
      "rant.html": "rant",
    }),
  ],
});
```

In the beginning, I built the very same app using a similar configuration but I
soon realised I'm too stubborn and need something more custom. Mainly because I
had integrated too much with `marked` (which is a library that converts markdown
to HTML) and Deno Blog uses `gfm` (Github Flavored Markdown). I know it's bad
(fragmentation instead of contributing new features) but I forked `deno_blog`
and made downstream changes because I thought this might be overkill comparing
to the KISS nature of everything in Deno. I hence created [my fork][fork] so
that it can render my site exactly as it was before all while being open to
being extended. Success!

Here is my current script (Notice the different import URL):

```tsx
/** @jsx h */

import blog, {
  h,
  highlight,
  imageContainer,
} from "https://deno.land/x/vixalien_deno_blog@0.4.9/blog.tsx";

blog({
  author: "Angelo Verlain",
  title: "vixalien's blog",
  avatar: "favicon/maskable.webp",
  avatarClass: "border-none rounded-full",
  port: 3001,
  dateStyle: "medium",
  links: [
    { title: "Email", url: "mailto:hey@vixalien.com" },
    { title: "GitHub", url: "https://github.com/vixalien" },
    { title: "Twitter", url: "https://twitter.com/vixalientweets" },
    { title: "Resume.pdf", url: "/Resume.pdf", icon: <IconFile /> },
  ],
  canonicalUrl: Deno.env.get("URL"),
  description:
    `Hello! I'm Angelo Verlain, but you can call me vixalien. I am a web \
    developer. This is my website, a collection of projects and writings.`,
  middlewares: [await highlight(), await imageContainer()],
  headLinks: [
    {
      rel: "apple-touch-icon",
      sizes: "192x192",
      href: "/favicon/android-chrome-192x192.webp",
    },
    {
      rel: "icon",
      type: "image/webp",
      sizes: "192x192",
      href: "/favicon/android-chrome-192x192.webp",
    },
    {
      rel: "icon",
      type: "image/webp",
      sizes: "512x512",
      href: "/favicon/android-chrome-512x512.webp",
    },
    { rel: "manifest", href: "/manifest.json" },
    { rel: "shortcut icon", href: "/favicon.ico" },
    { href: "/css/app.css", rel: "stylesheet" },
  ],
  lang: "en-US",
});

function IconFile() {
  return (
    <svg
      width="1em"
      height="1em"
      stroke-width={2}
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M14 3v4a1 1 0 001 1h4" />
      <path d="M17 21H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2zM9 9h1M9 13h6M9 17h6" />
    </svg>
  );
}
```

And all I need to do is run a single commad, then the app is live (INSTANT: NO
COMPILATION).

```bash
deno run -A mod.tx
```

Then to push it to production, I just push to Github, at which point
[Deno Deploy][deploy] pushes my script to no less than 30 locations worldwide
(the real edge, 👀 Vercel) for free.

The source of my [new website is hosted on Github][source] on the deno branch.

## Aftermath

Pictures are work 100 words right?

### Layout

#### Before

![Old layout on Node](/images/posts/deno-blog/layout-before.webp)

#### After

![New layout on Deno](/images/posts/deno-blog/layout-after.webp)

> Comment: No visible changes, but under the hood, everything changed.

### Total Files

#### Before

![Total files in filesystem before](/images/posts/deno-blog/files-before.webp)

#### After

![Total files in filesystem using Deno](/images/posts/deno-blog/files-after.webp)

> Command: `tree .`
>
> Comment: Deno uses significantly less files per project as dependencies are
> stored in central cache (`~/.cache/deno`). Node's `node_modules` caused it's
> demise.

### Disk Usage

#### Before

![Disk usage on Node (~11 dependencies)](/images/posts/deno-blog/du-before.webp)

#### After

![Disk usage on Deno (source code, =1 dependency)](/images/posts/deno-blog/du-after.webp)

![Disk usage on Deno (in Deno cache)](/images/posts/deno-blog/du-after-cache.webp)

> Command: `du -h .`
>
> Comment: Deno caches every single URL (compressed). If you run an app once,
> it's dependencies will be cached for the next time. Cache is stored in a
> central location so that multiple projects can reuse the cache which is not
> the case for Node

### Performance

#### Before

![Performance on Node (Deployed to Vercel)](/images/posts/deno-blog/perf-before.webp)

#### After

![New layout on Deno (Deployed to Deno Deploy)](/images/posts/deno-blog/perf-after.webp)

> Measured using [Lighthouse](https://web.dev/measure).
>
> Comment: Deno is almost always 2 times faster because there is good management
> of code on Deno(on my part) which causes only 2 requests to be served, but
> nevertheless it's quite amazing to see Deno win because the app deployed to
> Vercel is a static app whereas on Deno some actual JS code runs everytime a
> user hits a route. This is because Deno Deploy pushes to more than 30
> locations for free so when you actually request a resource, it's fetched from
> the nearest data center unlike Vercel which routes all requests to Washington
> DC (in the free plan atleast).

Thanks for reading! Have a nice day!

[deno]: https://deno.land
[deploy]: https://deno.com/deploy
[dream-stack]: https://www.youtube.com/watch?v=3NR9Spj0DmQ
[deno_blog]: https://github.com/denoland/deno_blog
[mistakes]: https://www.youtube.com/watch?v=M3BM9TB-8yA
[fork]: https:/github.com/vixalien/vixalien_deno_blog/
[source]: https://github.com/vixalien/dotio2/tree/deno
