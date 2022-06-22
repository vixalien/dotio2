import { promises } from 'fs'
let { readFile, readdir } = promises
import { join, resolve } from 'path'
import matter from 'front-matter'
import { marked } from '../../src/marked'

import Canonical from '../../components/canonical';
import Header from '../../components/header';
import Intro from '../../components/intro';
import Footer from '../../components/footer';
import Container from '../../components/container';

const resolveWidth = (path, width) => {
	return path.replace(/<!--width-->/g, width);
}

const ImageContainer = ({ top, bottom, image }) => (
	<div className="image-container">
		<Container className="inner-container" b={0}>
			<div className="top">{top}</div>
			<picture>
				<source srcset={resolveWidth(image, 600)} media="(max-width: 600px)" />
				<source srcset={resolveWidth(image, 1200)} media="(min-width: 600px) and (max-width: 1200px)" />
				<source srcset={resolveWidth(image, 3000)} media="(min-width: 1200px)" />
				<img src={resolveWidth(image, 1200)} />
			</picture>
			<div className="bottom">
				{bottom}
				<div className="stack">
					<p>
						<a href="#main" className="read-link">&darr; Read</a>
					</p>
					<hr />
				</div>
			</div>
		</Container>
	</div>
);

const Post = ({
	post: {
		content,
		slug,
		attributes: { title, created, description, banner },
	},
}) => (
	<>
		<Head>
			<title>{title} - vixalien</title>
			<Canonical path={'/post/' + slug} />
			<meta name="description" content={description} />
			<link rel="stylesheet" href="/css/highlight.css" />
			{ banner ? <link rel="stylesheet" href="/css/image-container.css" /> : null }
		</Head>
		{ banner ? <ImageContainer
			top={<Header />}
			image={`/.build/images/<!--width-->/posts/${slug}/banner.webp`}
			bottom={<>
				<Intro title={title} created={new Date(created).toDateString()} />
				<p>{description}</p>
			</>}
		/> : "" }
		<Container tag="main" id="main">
			{ !banner ? <>
				<Header/>
				<Intro title={title} created={new Date(created).toDateString()} />
				<p>{description}</p>
				<hr/>
			</> : null }
			<br />
			<article html={content} />
			<Footer />
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

	post.slug = slug
	post.content = marked(post.body)
	return { post }
}

export default Post;
