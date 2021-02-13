import Canonical from '../components/canonical';
import Header from '../components/header';
import Intro from '../components/intro';
import Container from '../components/container';

export default () => {
	return <>
		<Head>
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
				It uses <code>requestAnimationFrame</code>. Inspect (<kbd>Ctrl+Shift+I</kbd>) to view the source!
			</p>
		</Container>
		<script html={`
			const datestr = document.getElementById('datestr')
			const datenow = document.getElementById('datenow')
			let fn = () => {
				datestr.innerHTML = new Date().toString();
				datenow.innerHTML = Date.now()
			}
			let ten = () => {
				dateten.innerHTML = Date.now()
			}
			fn();
			ten();
			watchExec = fn => data => {
			  fn(data)
			  execed(data)
			}
			let watched = watchExec(fn);
			let execed = () => requestAnimationFrame(watched, 1000);
			execed()
			setTimeout(ten, 10000);
		`}/>
	</>
}