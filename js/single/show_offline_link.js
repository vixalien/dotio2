const offline = document.createElement('aside')
offline.style.padding = 'var(--padding-top) var(--padding-right) var(--padding-bottom) var(--padding-left)'
offline.className = "container";
const text = document.createElement('p');

const link = document.createElement('a');
link.innerHTML = link.href = '/offline';

if (!document.querySelector('meta[name="offline"]')) text.appendChild(document.createTextNode('Seems like you are offline. '));
text.appendChild(document.createTextNode('Visit '));
text.appendChild(link);
text.appendChild(document.createTextNode(' to view cached pages offline.'));

offline.appendChild(text);
document.body.appendChild(offline);