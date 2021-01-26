import Explosiv from 'explosiv';

import Container from './container';

export default () => {
	return <footer>
			<Container tb={'50'} className="footer">
				<hr/>
				<a className="top" href="#top">↑ Top</a>
				<div><a href="/">vixalien.io</a></div>
			</Container>
		</footer>
}