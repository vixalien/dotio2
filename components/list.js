import Explosiv from 'explosiv';

let List = ({ links }) => {
	return <ul class="list">
		{Object.entries(links).map(([href, text]) => 
			<li><a href={href}>{text}</a></li>
		)}
	</ul>
}

export default List;