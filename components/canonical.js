import Explosiv from 'explosiv'

let Canonical = ({ path }) => {
	let origin;
	if (process.env.VERCEL) {
		origin = "https://" + process.env.VERCEL_URL
	} else {
		origin = process.env.URL
	}
	return <link rel="canonical" href={origin+path}/>
}

export default Canonical;