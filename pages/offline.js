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
		<Container tag="main">
			<Header/>
			<Intro
				title="You are offline"
			/>
			<p>
				Sorry, but you are offline, we'll try to reload the page once you are back online
			</p>
		</Container>
		<script html={`ononline = () => location.reload()`}/>
	</>
}