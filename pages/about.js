import Explosiv, { Head } from 'explosiv';

import Canonical from '../components/canonical';
import Header from '../components/header';
import Footer from '../components/footer';
import Container from '../components/container';
import Intro from '../components/intro';

export default () => {
	return <>
		<Head>
			<title>about - vixalien</title>
			<Canonical path='/about'/>
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
						Email: <a id="emailme">Loading (requires JavaScript btw, to foil spam bots)</a>
						<script type='text/javascript' html={`
							// foil spam bots
							var email = 'hey';
							email += '@vixalien.ga';
							var emailme = document.getElementById('emailme')
							emailme.href = 'mailto:'+email;
							emailme.innerHTML = email;
						`}/>
					</li>
					<li>Github repo for this site: <a href="https://www.github.com/vixalien">vixalien/dotio</a></li>
					<li>Github username: <a href="https://www.github.com/vixalien">@vixalien</a></li>
					<li>Donate: <a href="https://www.paypal.com/donate?hosted_button_id=EL2MFRU4YE3RN">Paypal</a></li>
				</ul>
				<h2>Feeds</h2>
				<ul>
					<li><a href="https://vixalien.ga/feed/feed.rss">RSS</a></li>
					<li><a href="https://vixalien.ga/feed/feed.atom">Atom</a></li>
					<li><a href="https://vixalien.ga/feed/feed.json">JSON1</a></li>
				</ul>
			</main>
		</Container>
	</>
}