const experimentsDiv = document.getElementById("experiments");

const experiments = [
	{
		key: "theme",
		input: document.getElementById("theme-input"),
	},
	{
		key: "overflow",
		input: document.getElementById("overflow-input"),
	}
];

// experiments only show up when their value can be stored in localStorage
if (window.localStorage) {
	// since there is localStorage, we can show experiments
	experimentsDiv.style.display = "block";
	// initialize options
	experiments.map(({ key, input }) => {
		const keyString = `${key}-`;
		const value = getConfig(key);
		// for each experiment, change the input to show the selected (or default) value
		input.value = value;
		// track the input. when it changes, change the store
		input.addEventListener("change", event => {
			const selectedValue = event.target.value;
			// because the currently selected value is set on the classname of the page, find if it's there
			const valueInBody = Array.from(document.body.classList).reduce((curr,e) => curr ? curr : e.startsWith(`${key}-`) ? e : null, null);
			// remove it if present
			if (valueInBody) document.body.classList.remove(valueInBody);
			// set the new value
			document.body.classList.add(`${key}-${selectedValue}`);
			// store the new value in localStorage
			localStorage.setItem(key, selectedValue);
		})
	});
}