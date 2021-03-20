import Intro from './intro';
import Container from './container';

let Welcome = () => {
	return <div className="welcome">
				<p className="description">
					Hello! I'm Angelo Verlain, but you can call me vixalien.
					I am a web developer. This is my website, a collection of projects and writings.<br/>
					For more info, links and feeds go to <a href="/about">/about</a>
				</p>
				<p>
					You can also view a <a href="/projects">list of my projects</a>
				</p>
		</div>
}

export default Welcome;