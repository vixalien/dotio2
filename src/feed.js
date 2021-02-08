let { readFileSync, writeFileSync } = require('fs')
let { resolve } = require('path')
let Feed = require('feed').Feed
let posts = require('./posts')

const feed = new Feed({
  title: "vixalien.io",
  description: "Feed for my personal website!",
  id: "http://vixalien.ga/",
  link: "http://vixalien.ga/",
  language: "en",
  image: "http://vixalien.ga/favicon/maskable.png",
  favicon: "http://vixalien.ga/favicon.ico",
  copyright: "All rights reserved, 2021 - Angelo Verlain",
  generator: "awesome", // optional, default = 'Feed for Node.js'
  feedLinks: {
    json: "https://vixalien.ga/feed/feed.json",
    atom: "https://vixalien.ga/feed/feed.atom",
    rss: "https://vixalien.ga/feed/feed.rss"
  },
  author: {
    name: "Angelo Verlain",
    email: "hey@vixalien.ga",
    link: "https://vixalien.ga"
  }
});

Object.values(posts).forEach(post => {
  feed.addItem({
    title: post.title,
    id: post.slug,
    link: "https://vixalien.ga/post/" + post.slug,
    description: post.description,
    content: readFileSync(resolve('out/post', post.slug, 'index.html'), 'utf8'),
    author: [
      {
        name: "Angelo Verlain",
        email: "hey@vixalien.ga",
        link: "https://vixalien.ga"
      }
    ],
    date: new Date(post.created),
  });
});

writeFileSync(resolve('out/feed/feed.rss'), feed.rss2())
// Output: RSS 2.0

writeFileSync(resolve('out/feed/feed.atom'), feed.atom1())
// Output: Atom 1.0

writeFileSync(resolve('out/feed/feed.json'), feed.json1())
// Output: JSON Feed 1.0