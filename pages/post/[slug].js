import { promises } from 'fs'
let { readFile, readdir } = promises
import { join , resolve } from 'path'
import matter from 'front-matter'
import { marked } from 'marked'
import hljs from 'highlight.js'

import Canonical from '../../components/canonical';
import Header from '../../components/header';
import Intro from '../../components/intro';
import Footer from '../../components/footer';
import Container from '../../components/container';

const Post = ({
	post: {
		content,
		slug,
		attributes: { title, created, description },
	},
}) => (
	<>
		<Head>
			<title>{title} - vixalien</title>
			<Canonical path={'/post/'+slug}/>
			<meta name="description" content={description} />
			<link rel="stylesheet" href="/css/highlight-dark.css" media="(prefers-color-scheme: dark)" />
			<link rel="stylesheet" href="/css/highlight-light.css" media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)" />
		</Head>
		<Container tag="main">
			<Header/>
			<Intro title={title} created={new Date(created).toDateString()}/>
			<p>{description}</p>
			<hr/>
			<br/>
			<article html={content}/>
			<Footer/>
		</Container>
	</>
)

export const getPaths = async () => {
	const files = await readdir(resolve('blog'))
	return files.map((path) => path.slice(0, path.length - 3))
}

export const getProps = async (slug) => {
	let post = await readFile(join('./blog', `${slug}.md`), 'utf-8')
	post = matter(post)

	const renderer = new marked.Renderer()

	marked.setOptions({
		renderer,
		highlight: function (code, language) {
			if (!language) return code;
			return hljs.highlight(code, {language}).value
		},
	})

	post.slug = slug
	post.content = marked(post.body)
	return { post }
}

export default Post;