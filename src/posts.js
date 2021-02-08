let path = require("path");
let fs = require("fs");
let fm = require("front-matter");

let resolve = (...link) => path.resolve(process.cwd(), ...link);

let blogsPath = resolve("blog");

let blogs = fs
	.readdirSync(blogsPath)
	.map((blog) => {
		let slug = blog.replace(/\.mdx?$/, "")
		return [
			slug,
			{ slug, ...fm(fs.readFileSync(resolve(blogsPath, blog), "utf8")).attributes },
		]
	})
	.sort(([_, a], [$, b]) => b.created - a.created);

module.exports = Object.fromEntries(blogs);
