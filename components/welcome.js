import Intro from './intro';
import Container from './container';

let Welcome = () => {
	return <section className="welcome">
				<Intro title="vixalien's blog"/>
				<p className="description">
					Hello, my name is Shema Angelo, but you can call me vixalien.
					I am a web developer. This is my site, where you can find my
					posts and projects. For more info links and feeds, go to <a href="/about">/about</a>
				</p>
				<p>
					You can also view a <a href="/projects">list of my projects</a>
				</p>
		</section>
}

export default Welcome;