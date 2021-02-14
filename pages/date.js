import CSS from '../components/CSS';
import Canonical from '../components/canonical';
import Header from '../components/header';
import Intro from '../components/intro';
import Container from '../components/container';

export default () => {
	return <>
		<Head>
			<CSS components={['container', 'intro', 'header']}/>
			<title>date - vixalien</title>
			<Canonical path='/date'/>
			<meta name="description" content="sorry but you are offline"/>
		</Head>
		<Container tag="main">
			<Header/>
			<Intro
				title="Date & Time now"
			/>
			<p>
				<span id="datestr"></span>
			</p>
			<p>
				<span id="datenow"></span>
			</p>
			<p>
				(updated after 10 seconds): <span id="dateten"></span>
			</p>
			<p>
				The Time this page was last built: <span id="datebuilt">{Date.now()}</span>
			</p>
			<p>
				This page shows what time is it and seconds after the Unix Epoch according to your device.
			</p>
			<p>
				It uses <code>requestIdleCallback</code>. Inspect (<kbd>Ctrl+Shift+I</kbd>) to view the source!
			</p>
		</Container>
		<script html={`
			const datestr = document.getElementById('datestr')
			const datenow = document.getElementById('datenow')
			const dateten = document.getElementById('dateten')
			let main = () => {
				datestr.innerHTML = new Date().toString();
				datenow.innerHTML = Date.now()
				requestIdleCallback(main)
			}
			requestIdleCallback(main);
			let ten = () => {
				dateten.innerHTML = Date.now()
				setTimeout(ten, 10000)
			}
			ten();
		`}/>
	</>
}