import Container from './container';

let Intro = ({ title, created }) => {
	return <div className="intro">
			{ created ? <><small>{new Date(created).toDateString()}</small><br/></> : null }
			<h1>{title}</h1>
		</div>
}

export default Intro;