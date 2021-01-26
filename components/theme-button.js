import { useState, useEffect } from "react";

import Button from "components/button";

let ThemeButton = () => {
	var theme = 'light';
	if (process.browser) {
		var [theme, setTheme] = useState(THEME.getTheme());
		useEffect(() => {
			THEME.setTheme(theme)
		}, [theme])
	}
	let invertTheme = theme => theme == 'dark' ? 'light' : 'dark';

	return <Button text={"Set theme to: "+invertTheme(theme)} onClick={() => setTheme(invertTheme(theme))}/>
}

export default ThemeButton;