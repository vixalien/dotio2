import Explosiv, { Head } from 'explosiv';

import Header from '../components/header';
import Footer from '../components/footer';
import Container from '../components/container';
import Intro from '../components/intro';
import Button from '../components/button';

export default () => {
	return <>
		<Head>
			<title>about - vixalien</title>
			<link rel="canonical" href={process.env.URL+'/about'}/>
			<meta name="description" content="vixalien is a merry web developer"/>
		</Head>
		<Header/>
		<Intro
			title="About vixalien"
			description="Stuff related to vixalien"
		/>
		<Container tag="main">
			<p>
				Hi! I'm Shema Angelo, or vixalien. I'm a web developer and (designer? maybe).
				I love to build things from scratch while I can. Here you can find my projects,
				posts and whatever. Stay tuned!
			</p>
			<h2>Links</h2>
			<p>
				<Button text="Github" icon="github" href="https://www.github.com/vixalien"/>
				<Button text="Donate" icon="paypal" href="https://www.paypal.com"/>
			</p>
		</Container>
		<Footer/>
	</>
}