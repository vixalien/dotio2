import hljs from 'highlight.js'
import { marked } from 'marked'

function highlight(code, language) {
	if (!language) return code;
	return hljs.highlight(code, {language}).value
};

const escapeTest = /[&<>"']/;
const escapeReplace = /[&<>"']/g;
const escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
const escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;
const escapeReplacements = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};
const getEscapeReplacement = (ch) => escapeReplacements[ch];
function escape(html, encode) {
  if (encode) {
    if (escapeTest.test(html)) {
      return html.replace(escapeReplace, getEscapeReplacement);
    }
  } else {
    if (escapeTestNoEncode.test(html)) {
      return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
    }
  }

  return html;
}

marked.use({
	renderer: {
		image: function (href, title, text) {
			return `<div class="block-image">
				<img src="${href}" alt="${title || text}" loading="lazy">
				${ text ? `<div class="text" aria-hidden="true"><small>${text} - <a href="${href}" target="_blank">View Image ↗</a></small></div>` : '' }
			</div>`;
		},
		code: function(code, infostring, escaped) {
			const lang = (infostring || '').match(/\S*/)[0];
	      const out = highlight(code, lang);
      if (out != null && out !== code) {
        escaped = true;
        code = out;
      }

	    code = code.replace(/\n$/, '') + '\n';

	    if (!lang) {
	      return '<pre class="block-code"><code>'
	        + (escaped ? code : escape(code, true))
	        + '</code></pre>\n';
	    }

	    return '<pre class="block-code"><code class="'
	      + this.options.langPrefix
	      + escape(lang, true)
	      + '">'
	      + (escaped ? code : escape(code, true))
	      + '</code></pre>\n';
		}
	}
});

export { marked }