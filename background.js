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

const onClickAction = () => {
  chrome.tabs.executeScript(null, { file: 'unscrobbler.js' });
  chrome.tabs.insertCSS(null, { file: 'unscrobbler.css' });
};

chrome.pageAction.onClicked.addListener(onClickAction);
browser.browserAction.onClicked.addListener(onClickAction);
