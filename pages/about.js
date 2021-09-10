import Canonical from '../components/canonical';
import Header from '../components/header';
import Footer from '../components/footer';
import Container from '../components/container';
import Intro from '../components/intro';

const ExternalLink = ({ href, text, ...props }) => {
	return <a href={href} rel="noopener noreferrer" target="_blank">{text}</a>
}

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
						<a id="emailme">Loading (requires JavaScript btw, to foil spam bots)</a>
						<script html={`
							// foil spam bots
							var email = 'hey';
							email += '@vixalien.ga';
							var emailme = document.getElementById('emailme')
							emailme.href = 'mailto:'+email;
							emailme.innerHTML = 'Email';
						`}/>
					</li>
					<li><ExternalLink href="https://www.github.com/vixalien" text="Github"/></li>
					<li><ExternalLink href="https://www.paypal.com/donate?hosted_button_id=SAAEAPL2GLXZS" text="Donate at Paypal"/></li>
					<li><a href="/Resume.pdf">Resume.pdf</a></li>
				</ul>
				<h2>Experiments</h2>
				<h3>Web bundle</h3>
				<p>
					A Web Bundle is a file format for encapsulating one or more HTTP resources in a single file. 
					It can include one or more HTML files, JavaScript files, images, or stylesheets. 
					Web Bundles, more formally known as Bundled HTTP Exchanges, are part of the Web Packaging proposal.
					This is a web bundle of this site, last built at {new Date().toGMTString()}
				</p>
				<ul>
					<li><a href="/vixalien.wbn">Download Web Bundle (vixalien.wbn)</a></li>
				</ul>
				<p>
					Note that to use the web bundle you may need to enable some flags or config in your browser.
					For Chrome go to <b>chrome://flags</b> and enable <b>Web Bundles</b>.
					For Edge do the same thing at <b>edge://flags</b>. Firefox does not support web bundles AFAIK.
				</p>
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