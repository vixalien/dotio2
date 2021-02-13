let Entity = ({ title, date, text, href }) => {
	return <a className="card-entity" href={href}>
			<h3>{title} &rarr;</h3>
			<h4>{date}</h4>
			<p>{text}</p>
		</a>
}

export default Entity;