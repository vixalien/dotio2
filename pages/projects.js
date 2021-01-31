import Explosiv, { Head } from 'explosiv';

import Canonical from '../components/canonical';
import Header from '../components/header';
import Footer from '../components/footer';
import Intro from '../components/intro';
import Container from '../components/container';
import Projects from '../components/card/projects';

export default () => {
	return <>
		<Head>
			<title>projects by vixalien</title>
			<Canonical path='/projects'/>
			<meta name="description" content="projects by vixalien"/>
		</Head>
		<Container>
			<Intro title="Projects"/>
			<p>
				Beware of any funniness!
			</p>
			<Projects/>
		</Container>
	</>
}