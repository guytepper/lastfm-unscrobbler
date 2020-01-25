// Make the extension icon turn on when visiting Last.FM
chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: 'www.last.fm' }
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});

chrome.pageAction.onClicked.addListener(() => {
  chrome.tabs.executeScript(null, { file: 'unscrobbler.js' });
  chrome.tabs.insertCSS(null, { file: 'unscrobbler.css' });
});

browser.browserAction.onClicked.addListener(() => {
  chrome.tabs.executeScript(null, { file: 'unscrobbler.js' });
  chrome.tabs.insertCSS(null, { file: 'unscrobbler.css' });
});
