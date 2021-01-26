import Explosiv, { Head } from 'explosiv';

import Header from '../components/header';
import Footer from '../components/footer';
import Welcome from '../components/welcome';
import Posts from '../components/card/posts';
import Projects from '../components/card/projects';

export default () => {
	return <>
		<Head>
			<title>vixalien</title>
			<link rel="canonical" href={process.env.URL+'/'}/>
			<meta name="description" content="homepage of vixalien's site"/>
		</Head>
		<Header/>
		<Welcome/>
		<Posts max={4}/>
		<Projects max={4}/>
		<Footer/>
	</>
}