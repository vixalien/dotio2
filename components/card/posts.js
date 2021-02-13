import postsJSON from "../../src/posts";

let PostsCard = ({ ...props }) => {
	let posts = Object.entries(postsJSON)

	return (
		<p>
			<h2>Posts</h2>
			<div className="posts">
				{posts.map(([slug, { title, description, created }]) => (
					<p>
						<a href={"/post/" + slug}>{title} &rarr;</a><br/>
						<span>{new Date(created).toDateString()} - {description}</span>
					</p>
				))}
			</div>
		</p>
	);
};

export default PostsCard;
