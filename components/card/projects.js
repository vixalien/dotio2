import Explosiv from "explosiv";

import projectsJSON from "../../src/projects";

let ProjectsCard = ({ ...props }) => {
	let projects = Object.entries(projectsJSON)

	return (
		<p>
			<h2>Projects</h2>
			<div className="projects">
				{projects.map(([slug, { link, title, description, date }]) => (
					<p>
						{link ?
							<a href={link} target="_blank" rel="noopener noreferrer">{title} ({new URL(link).host}) &rarr;</a> :
							<a href={"/project/" + slug}>{title} &rarr;</a>
						}<br/>
						<span>{description}</span>
					</p>
				))}
			</div>
		</p>
	);
};

export default ProjectsCard;
