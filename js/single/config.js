const config = {
	overflow: {
		values: [
			"yes",
			"no",
		],
		default: "no",
	}
}
const getConfig = (key) => {
	const data = config[key];
	if(!data) return;
	let storedValue = localStorage.getItem(key);
	if (!storedValue || !data.values.includes(storedValue)) {
		localStorage.setItem(key, data.default);
		storedValue = data.default;
	};
	return storedValue;
}
const initConfig = () => {
	if(!window.localStorage) return;
	Object.entries(config).forEach(([key, data]) => {
		const value = getConfig(key);
		document.body.classList.add(`${key}-${value}`);
	});
}
initConfig();