import Explosiv from 'explosiv';

let Container = ({ tag = 'div', className="", tb = null, rl, t, b, ...props }) => {
	if (tb != null) { t = t || tb; b = b || tb; };
	let pad = (param, variable) => {
		if (param) {
			if (parseInt(param)) {
				return parseInt(param) + 'px';
			} else {
				return '0';
			}
		} else {
			return 'var(--padding-' + variable + ')';
		}
	}
	let Tag = ({ children, ...props }) => Explosiv.el(tag, props, children)
	
	return <Tag
		style={{padding: ` ${pad(t, 'top')} ${pad(rl, 'right')} ${pad(b, 'bottom')} ${pad(rl, 'left')}`}}
		className={className + " container"}
		{...props}/>
}

export default Container;