import Canonical from '../components/canonical';
import Header from '../components/header';
import Intro from '../components/intro';
import Container from '../components/container';

export default () => {
	return <>
		<Head>
			<title>date - vixalien</title>
			<Canonical path='/date'/>
			<meta name="description" content="date"/>
		</Head>
		<Container tag="main">
			<Header/>
			<Intro
				title="Date & Time now"
			/>
			<ul>
				<li><b>Local DateTime:</b> <span id="datetime"/> <button id="datetime-button">Copy</button></li>
				<li><b>Milliseconds after Unix Epoch:</b> <span id="ms"/> <button id="ms-button">Copy</button></li>
			</ul>
			<h3>Meta</h3>
			<ul>
				<li><b>This site was last built at:</b> <span id="build">{Date.now()}</span></li>
			</ul>
			<p>
				This page shows what time is it and milliseconds after the Unix Epoch <b>according to your device</b>.
			</p>
			<p>
				It uses <code>requestAnimationFrame</code> to update elements.
			</p>
		</Container>
		<script src="/js/date.js" defer="defer"/>
	</>
}