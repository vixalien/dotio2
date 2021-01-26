import Explosiv, { Head } from "explosiv";

import Header from "../components/header";
import Intro from "../components/intro";
import Container from "../components/container";
import Footer from "../components/footer";
import Projects from "../components/card/projects";

export default () => {
	return (<>
	<Head>
		<title>projects - vixalien</title>
		<link rel="canonical" href={process.env.URL+'/projects'}/>
		<meta name="description" content="projects engineered by vixalien"/>
	</Head>
	<Header/>
	<Intro
		title="Projects"
		description="Articles about my different projects."
	/>
	<Projects link={false}/>
	<Footer/>
	</>
	)
}