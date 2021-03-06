import { promises } from 'fs'
let { readFile, readdir } = promises
import { join , resolve } from 'path'
import matter from 'front-matter'
import marked from 'marked'
import prism from 'prismjs'

import Canonical from '../../components/canonical';
import Header from '../../components/header';
import Intro from '../../components/intro';
import Footer from '../../components/footer';
import Container from '../../components/container';

const Projects = ({
	projects: {
		content,
		slug,
		attributes: { title, created, description },
	},
}) => (
	<>
		<Head>
			<title>{title} - vixalien</title>
			<Canonical path={'/project/'+slug}/>
			<meta name="description" content={description} />
			<link rel="stylesheet" href="/css/code.css"/>
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
	const files = await readdir(resolve('projects'))
	return files.map((path) => path.slice(0, path.length - 3))
}

export const getProps = async (slug) => {
	let projects = await readFile(join('./projects', `${slug}.md`), 'utf-8')
	projects = matter(projects)

	const renderer = new marked.Renderer()

	marked.setOptions({
		renderer,
		highlight: function (code, lang) {
			if (prism.languages[lang]) {
				return prism.highlight(code, prism.languages[lang], lang)
			} else {
				return code
			}
		},
	})

	projects.slug = slug
	projects.content = marked(projects.body)
	return { projects }
}

export default Projects;