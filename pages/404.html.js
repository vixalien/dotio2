import Canonical from '../components/canonical';
import Header from '../components/header';
import Intro from '../components/intro';
import Container from '../components/container';

export default () => {
	return <>
		<Head>
			<title>404 - vixalien</title>
			<Canonical path='/404'/>
			<meta name="description" content="404 - page not found"/>
		</Head>
		<Container tag="main">
			<Header/>
			<Intro
				title="404 - page not found"
			/>
			<p>
				The page you were trying to reach caught <b>Coronavirus</b>. You can't see it right now.
			</p>
		</Container>
	</>
}