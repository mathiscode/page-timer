chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  console.log(msg)
  if (msg.from === 'background') {
    let invert = (msg.subject === 'invert') ? 'invert(1)' : 'invert(0)'
    console.log(invert)
    document.querySelector('html').style.filter = invert
  }
})
