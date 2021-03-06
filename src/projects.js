let path = require("path");
let fs = require("fs");
let fm = require("front-matter");

let resolve = (...link) => path.resolve(process.cwd(), ...link);

let projectsPath = resolve("projects");

let projects = fs
	.readdirSync(projectsPath)
	.map((project) => {
		let slug = project.replace(/\.mdx?$/, "")
		return [
			slug,
			{ slug, ...fm(fs.readFileSync(resolve(projectsPath, project), "utf8")).attributes },
		]
	})
	.sort(([_, a], [$, b]) => b.created - a.created);

module.exports = Object.fromEntries(projects);
