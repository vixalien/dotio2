import Explosiv from 'explosiv';

import List from './list';
import Container from './container';

export default () => {
	return (
		<header>
			<Container tag='nav' tb={'15'}>
				<span><a href="/">vixalien.io</a></span>
				<List
					links={{
						'/projects': 'Projects',
						'/posts': 'Posts',
						'/about': 'About'
					}}
				/>
			</Container>
		</header>
	)
}