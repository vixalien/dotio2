import Explosiv from "explosiv";

import projectsJSON from "../../src/projects";

let ProjectsCard = ({ ...props }) => {
	let projects = Object.entries(projectsJSON)

	return (
		<p>
			<h2>Projects</h2>
			<div className="projects">
				{projects.map(([slug, { title, description, created }]) => (
					<p>
						<a href={"/project/" + slug}>{title} &rarr;</a><br/>
						<span>{new Date(created).toDateString()} - {description}</span>
					</p>
				))}
			</div>
		</p>
	);
};

export default ProjectsCard;
