import hljs from 'highlight.js'
import { marked } from 'marked'

marked.use({
	renderer: {
		image: function (href, title, text) {
			return `<div class="image">
				<img src="${href}" alt="${title || text}" loading="lazy">
				${ text ? `<div class="text" aria-hidden="true"><small>${text} <a href="${href}" target="_blank">View Image ↗</a></small></div>` : '' }
			</div>`;
		},
	}
});

marked.setOptions({
	highlight: function (code, language) {
		if (!language) return code;
		return hljs.highlight(code, {language}).value
	},
})

export { marked }