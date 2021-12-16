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
					Hi! I'm Shema Angelo Verlain, or vixalien. I'm a web developer and student from Kigali, Rwanda.
					I love to build random things that solve real world problems or just for fun.
					I write code in JavaScript, HTML, CSS and use frameworks like React, NextJS and Explosiv.
				</p>
				<p>
					This is a website where I will try to write posts about Web Development, Life and other experiences when I get free time from school.
					Thanks for coming here! Have a nice day.
				</p>
				<h2>Links</h2>
				<ul>
					<li>
						<a id="emailme">Loading Email (won't load if JavaScript is disabled)</a>
						<script html={`
							// foil spam bots
							var email = 'hey';
							email += '@vixalien.com';
							var emailme = document.getElementById('emailme')
							emailme.href = 'mailto:'+email;
							emailme.innerHTML = 'Email';
						`}/>
					</li>
					<li><ExternalLink href="https://www.github.com/vixalien" text="Github"/></li>
					<li><a href="/Resume.pdf">Resume.pdf</a></li>
				</ul>
				<h2>Experiments</h2>
				<h3>Web bundle</h3>
				<p>
					A Web Bundle is an experimental file format for encapsulating one or more HTTP resources in a single file. 
					This is a web bundle of this site, last built at around {new Date().toGMTString()}.
					Note that to use the web bundle you may need to enable some flags or config in your browser.
				</p>
				<ul>
					<li><a href="/vixalien.wbn">Download Web Bundle (vixalien.wbn)</a></li>
				</ul>
				<h2>Feeds</h2>
				<ul>
					<li><a href="/feed/feed.rss">RSS</a></li>
					<li><a href="/feed/feed.atom">Atom</a></li>
					<li><a href="/feed/feed.json">JSON1</a></li>
				</ul>
			</main>
		</Container>
	</>
}
