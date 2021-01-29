import Explosiv, { Head } from 'explosiv';

import Header from '../components/header';
import Footer from '../components/footer';
import Container from '../components/container';
import Intro from '../components/intro';

export default () => {
	return <>
		<Head>
			<title>about - vixalien</title>
			<link rel="canonical" href={process.env.URL+'/about'}/>
			<meta name="description" content="vixalien is a merry web developer"/>
		</Head>
		<Container>
			<Header/>
			<main>
				<Intro title="About vixalien"/>
				<p>
					Hi! I'm Shema Angelo, or vixalien. I'm a web developer and (designer? maybe).
					I love to build things from scratch while I can. Here you can find my projects,
					posts and whatever. Stay tuned!
				</p>
				<h2>Links</h2>
				<ul>
					<li>
						Email: <a id="emailme">Loading</a>
						<script type='text/javascript' html={`
							// foil spam bots
							var email = 'geoangercola';
							email += '@gmail.com';
							var emailme = document.getElementById('emailme')
							emailme.href = 'mailto:'+email;
							emailme.innerHTML = email;
						`}/>
					</li>
					<li>Github: <a href="https://www.github.com/vixalien">@vixalien</a></li>
					<li>Paypal: <a href="https://www.paypal.com">Click here</a></li>
				</ul>
			</main>
		</Container>
	</>
}