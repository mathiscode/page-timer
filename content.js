chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  console.log(msg)
  let invert = (msg.cmd === 'invert') ? 'invert(1)' : 'invert(0)'
  document.querySelector('html').style.filter = invert
})
