/** @jsx h */

import blog, {
  h,
  highlight,
  imageContainer,
  redirects,
} from "https://deno.land/x/vixalien_deno_blog@0.4.13/blog.tsx";

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
  middlewares: [
    await highlight(),
    await imageContainer(),
    redirects({
      "/feed/feed.rss": "/feed",
      "/blog": "/",
    }),
  ],
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
