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

// Manifest V3
const onClickAction = () => {
  chrome.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    const tabId = tabs[0].id;
    chrome.scripting.executeScript({ target: { tabId }, files: ['unscrobbler.js'] });
    chrome.scripting.insertCSS({ target: { tabId }, files: ['unscrobbler.css'] });
  });
};

chrome.action.onClicked.addListener(onClickAction);

// Manifest V2
/** 
const onClickAction = () => {
  chrome.tabs.executeScript(null, { file: 'unscrobbler.js' });
  chrome.tabs.insertCSS(null, { file: 'unscrobbler.css' });
}

chrome.pageAction.onClicked.addListener(onClickAction);
browser.browserAction.onClicked.addListener(onClickAction);
*/
