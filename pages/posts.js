import Explosiv, { Head } from "explosiv";

import Header from "../components/header";
import Intro from "../components/intro";
import Container from "../components/container";
import Footer from "../components/footer";
import Posts from "../components/card/posts";

export default () => {
	return (<>
	<Head>
		<title>posts - vixalien</title>
		<link rel="canonical" href={process.env.URL+'/posts'}/>
		<meta name="description" content="posts written or stolen by vixalien"/>
	</Head>
	<Header/>
	<Intro
		title="Posts"
		description="Here are accumulated articles I have written."
	/>
	<Posts link={false}/>
	<Footer/>
	</>
	)
}