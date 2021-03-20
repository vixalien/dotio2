import Intro from '../components/intro';
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
			<Canonical path='/'/>
			<meta name="description" content="homepage of vixalien's site"/>
		</Head>
		<Container>
			<Intro title="vixalien's blog"/>
			<Welcome/>
			<Posts/>
		</Container>
	</>
}