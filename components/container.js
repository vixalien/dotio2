function isSet(value) {
	return !(value === undefined || value === null);
}

let Container = ({ tag = 'div', className="", tb = null, rl, t, b, ...props }) => {

	// construct a custom padding if any of the `rl`, `t` or `b` parameters are set.
	let style = {};
	if (isSet(rl)) {
		style.paddingRight = rl;
		style.paddingLeft = rl;
	}
	if (isSet(t)) style.paddingTop = t;
	if (isSet(b)) style.paddingBottom = b;

	let Tag = ({ children, ...props }) => Explosiv.el(tag, props, children);

	return <Tag
		style={style}
		className={className + " container"}
		{...props}/>
}

export default Container;
