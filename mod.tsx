/** @jsx h */

import blog, {
  h,
  highlight,
  imageContainer,
  redirects,
} from "https://deno.land/x/vixalien_deno_blog@0.6.0/blog.tsx";

const DocumentIcon = () => {
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
};

const MastodonIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="ionicon"
      viewBox="0 0 512 512"
      width="1em"
      height="1em"
      stroke="currentColor"
      fill="currentColor"
    >
      <title>Logo Mastodon</title>
      <path d="M480 173.59c0-104.13-68.26-134.65-68.26-134.65C377.3 23.15 318.2 16.5 256.8 16h-1.51c-61.4.5-120.46 7.15-154.88 22.94 0 0-68.27 30.52-68.27 134.65 0 23.85-.46 52.35.29 82.59C34.91 358 51.11 458.37 145.32 483.29c43.43 11.49 80.73 13.89 110.76 12.24 54.47-3 85-19.42 85-19.42l-1.79-39.5s-38.93 12.27-82.64 10.77c-43.31-1.48-89-4.67-96-57.81a108.44 108.44 0 01-1-14.9 558.91 558.91 0 0096.39 12.85c32.95 1.51 63.84-1.93 95.22-5.67 60.18-7.18 112.58-44.24 119.16-78.09 10.42-53.34 9.58-130.17 9.58-130.17zm-80.54 134.16h-50V185.38c0-25.8-10.86-38.89-32.58-38.89-24 0-36.06 15.53-36.06 46.24v67h-49.66v-67c0-30.71-12-46.24-36.06-46.24-21.72 0-32.58 13.09-32.58 38.89v122.37h-50V181.67q0-38.65 19.75-61.39c13.6-15.15 31.4-22.92 53.51-22.92 25.58 0 44.95 9.82 57.75 29.48L256 147.69l12.45-20.85c12.81-19.66 32.17-29.48 57.75-29.48 22.11 0 39.91 7.77 53.51 22.92q19.79 22.72 19.75 61.39z" />
    </svg>
  );
};

const CoffeeIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 512"
      width="1em"
      height="1em"
      stroke="currentColor"
      fill="currentColor"
    >
      <path d="M96 64c0-17.7 14.3-32 32-32H448h64c70.7 0 128 57.3 128 128s-57.3 128-128 128H480c0 53-43 96-96 96H192c-53 0-96-43-96-96V64zM480 224h32c35.3 0 64-28.7 64-64s-28.7-64-64-64H480V224zM32 416H544c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32z" />
    </svg>
  );
};

blog({
  author: "Angelo Verlain",
  title: "vixalien's blog",
  avatar: "favicon/maskable.webp",
  avatarClass: "border-none rounded-full",
  port: 3001,
  dateFormat: (date) =>
    new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(date),
  links: [
    {
      title: "GitHub",
      url: "https://github.com/vixalien",
    },
    {
      title: "Donate",
      url: "https://buymeacoffee.com/vixalien",
      icon: <CoffeeIcon />,
    },
    {
      title: "Email",
      url: "mailto:hey@vixalien.com",
    },
    {
      title: "Mastodon",
      url: "https://mas.to/@vixalientoots",
      rel: "me",
      icon: <MastodonIcon />,
    },
    {
      title: "Resume.pdf",
      url: "/Resume.pdf",
      icon: <DocumentIcon />,
    },
  ],
  canonicalUrl: Deno.env.get("URL"),
  description:
    `Hello! I'm Angelo Verlain, but you can call me vixalien. I am a web and \
    GTK developer and this is my website, a collection of projects and writings.`,
  middlewares: [
    highlight(),
    imageContainer({ mediumZoom: true }),
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
    {
      rel: "manifest",
      href: "/manifest.json",
    },
    {
      rel: "shortcut icon",
      href: "/favicon.ico",
    },
    {
      href: "/css/app.css",
      rel: "stylesheet",
    },
  ],
  lang: "en-US",
});
