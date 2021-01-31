import Explosiv, { Head } from 'explosiv';

import Canonical from '../components/canonical';
import Header from '../components/header';
import Footer from '../components/footer';
import Welcome from '../components/welcome';
import Container from '../components/container';
import Posts from '../components/card/posts';
import Projects from '../components/card/projects';

export default () => {
	return <>
		<Head>
			<title>vixalien</title>
			<link rel="canonical" href={process.env.URL+'/'}/>
			<Canonical path='/'/>
			<meta name="description" content="homepage of vixalien's site"/>
		</Head>
		<Container>
			<Welcome/>
			<Posts/>
		</Container>
	</>
}