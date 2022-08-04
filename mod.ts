import blog from "https://deno.land/x/blog@0.4.2/blog.tsx";

import "https://esm.sh/prismjs@1.28.0/components/prism-yaml";
import "https://esm.sh/prismjs@1.28.0/components/prism-typescript";
import "https://esm.sh/prismjs@1.28.0/components/prism-javascript";
import "https://esm.sh/prismjs@1.28.0/components/prism-jsx";
import "https://esm.sh/prismjs@1.28.0/components/prism-tsx";
import "https://esm.sh/prismjs@1.28.0/components/prism-bash";
import "https://esm.sh/prismjs@1.28.0/components/prism-markdown";

const style = await Deno.readTextFile("./style.css");

blog({
  author: 'Angelo Verlain',
  title: 'vixalien\'s blog',
  description: `I'm Angelo Verlain or vixalien, a web developer.`,
  avatar: 'favicon/maskable.png',
  avatarClass: 'border-none rounded-full',
  port: 3001,
  dateStyle: "medium",
  links: [
    { title: "Email", url: "mailto:hey@vixalien.com" },
    { title: "GitHub", url: "https://github.com/vixalien" },
    { title: "Twitter", url: "https://twitter.com/angeloverlain2" },
  ],
  style,
  canonicalUrl: Deno.env.get("URL"),
});
