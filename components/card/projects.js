import Explosiv from 'explosiv';

import Card from './index';
import Line from './line';

import projectsJSON from '../../src/projects'

let Projects = ({ max = Infinity }) => {
	let projects = Object.entries(projectsJSON)
		.filter((_, id) => id < max)
		.sort((a, b) => a.created - b.created)

	return projects.map(([slug, {title, description, created}]) => <Line
		title={title}
		date={new Date(created).toDateString()}
		text={description}
		href={"/project/"+slug}
	/>)
}

let ProjectsCard = ({ title = "Recent Projects", link = "View All" ,max = Infinity ,...props }) => {
	return <Card
		title={title}
		link={link}
		href="/projects"
		column
	>
		<Projects max={max} {...props}/>
	</Card>
}

export default ProjectsCard;