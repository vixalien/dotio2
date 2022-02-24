const datetime = document.getElementById('datetime')
const ms = document.getElementById('ms');
const datetimebutton = document.getElementById('datetime-button');
const msbutton = document.getElementById('ms-button');
datetimebutton.addEventListener("click", event => copyButton(event, new Date().toString()));
msbutton.addEventListener("click", event => copyButton(event, Date.now()));
function updateTime () {
	datetime.innerHTML = new Date().toString();
	ms.innerHTML = Date.now();
	requestAnimationFrame(updateTime);
}
updateTime();

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  
  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
    throw err;
  }

  document.body.removeChild(textArea);
}

function copy(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text);
}

async function copyButton(event, value) {
  let beforeText = event.target.innerHTML;
  event.preventDefault();
  try {
    copy(value);
    event.target.innerHTML = "Copied!"
  } catch (err) {
    event.target.innerHTML = "Couldn't copy content!"
    console.log("Couldn't copy to clipboard: " + err)
  } finally {
    setTimeout(() => {
      event.target.innerHTML = beforeText;
    }, 2000);
  }
}