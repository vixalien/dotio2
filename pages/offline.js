import Explosiv, { Head } from 'explosiv';

import Header from '../components/header';
import Intro from '../components/intro';
import Container from '../components/container';

export default () => {
	return <>
		<Head>
			<title>offline - vixalien</title>
			<link rel="canonical" href={process.env.URL+'/offline'}/>
			<meta name="description" content="sorry but you are offline"/>
		</Head>
		<Header/>
		<Intro
			title="You are offline"
		/>
		<Container tag="main">
			<p>
				Sorry, but you are offline, we'll try to reload the page once you are back online
			</p>
		</Container>
	</>
}