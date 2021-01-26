import Explosiv from 'explosiv';
import Container from '../container';

let Title = ({ heading, href, link }) => {
	return <div className="card-title">
			<h2>{heading}</h2>
			<span/>
			{link ? <a href={href}>{link} &rarr;</a> : null }
		</div>
}

let Card = ({ hr, title, href, link, column = '', children }) => {
	return <section className="card">
			<Container>
				<Title
					heading={title}
					href={href}
					link={link}
				/>
				<div className={'card-entities ' + (column && 'column')}>
					{children}
				</div>
			</Container>
			{hr ? <Container tb={false}><hr/></Container> : null}
		</section>
}

export default Card;