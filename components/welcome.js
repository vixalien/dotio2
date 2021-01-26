import Container from './container';
import Explosiv from 'explosiv';

let Welcome = () => {
	return <section className="welcome">
			<Container>
				<h1>Welcome!</h1>
				<p className="description">
					Hello, my name is Shema Angelo, but you can call me vixalien.
					I am a web developer. This is my site, where you can find my
					posts and projects. For more info, and links, go to <a href="/about">/about</a>
				</p>
			</Container>
		</section>
}

export default Welcome;