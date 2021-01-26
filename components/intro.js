import Explosiv from 'explosiv';

import Container from './container';

let Intro = ({ title, description, created }) => {
	return <Container tag='section' className="intro" tb={30} b={50}>
			<div className={created ? "blog" : ""}>
				<h1>{title}</h1>
				{created && <p><small>Created {created}</small></p>}
				{description && <p className="description">{description}</p>}
			</div>
			<hr/>
		</Container>
}

export default Intro;