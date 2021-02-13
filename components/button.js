import External from "./icons/external";
import Github from "./icons/github";
import PayPal from "./icons/paypal";

let getIcon = (icon) => {
	if (icon=='github') {
		return <Github/>
	} else if (icon=='paypal') {
		return <PayPal/>
	} else {
		return icon;
	}
}

let Button = ({ text = "Button", icon=<span/>, href , ...props }) => {
	let Icon = getIcon(icon);
	// checking if link is external
	let external = true;
	let rel = {rel: null}
	if (new URL(href, process.env.URL).href.startsWith(process.env.URL)) external = false;
	if (external) rel.rel = "noopener noreferrer"
	return <>
		{href ? <a className="button" href={href} {...rel} target="_blank" {...props}>
			<span className="icon b">{getIcon(icon)}</span>
			<span>{text}</span>
			<span className="icon e"><External/></span>
		</a> :
		<button className="button" {...props}>
			<span>{text}</span>
		</button>}
	</>
}

export default Button;