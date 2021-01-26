import Explosiv from 'explosiv';

import Card from './index';
import Line from './line';

import postsJSON from '../../src/posts'

let Posts = ({ max = Infinity }) => {
	let posts = Object.entries(postsJSON)
		.filter((_, id) => id < max)
		.sort((a, b) => a.created - b.created)

	return posts.map(([slug, {title, description, created}]) => <Line
		title={title}
		date={new Date(created).toDateString()}
		text={description}
		href={"/post/"+slug}
	/>)
}

let PostsCard = ({ title = "Recent Posts", link = "View All" ,max = Infinity ,...props }) => {
	return <Card
		title={title}
		link={link}
		href="/posts"
		column
	>
		<Posts max={max} {...props}/>
	</Card>
}

export default PostsCard;