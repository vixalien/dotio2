import { readFileSync } from 'fs'
import { resolve } from 'path'

let default_css = ['variables', 'base']

let CSS = ({ css = [], components = [], code = false }) => {
	let styles = default_css;
	styles.push(...css);
	styles.push(...components.map(component => 'components/' + component));
	if (code) styles.push('prism');
	return <style id="_optimizedCSS">
		{styles.map(style => readFileSync(resolve('public', 'css', style + '.css')))}
	</style>
}

export default CSS;