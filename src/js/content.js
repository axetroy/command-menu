let head = document.getElementsByTagName('head')[0];
let script = document.createElement('script');
script.id = 'chrome-command-menu';
script.type = 'text/javascript';
script.src = chrome.extension.getURL('app.bundle.js');
setTimeout(function() {
  head.appendChild(script);
}, 100);
