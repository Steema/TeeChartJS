var charts = {};
var selectedChart = null;
var selectedId = null;

function updateChart(tabId) {
  chrome.tabs.sendRequest(tabId, {}, function(chart) {
    charts[tabId] = chart;
    if (!chart) {
      chrome.pageAction.hide(tabId);
    } else {
      chrome.pageAction.show(tabId);
      if (selectedId == tabId) {
        updateSelected(tabId);
      }
    }
  });
}

function updateSelected(tabId) {
  selectedChart = charts[tabId];
  if (selectedChart)
    chrome.pageAction.setTitle({tabId:tabId, title:selectedChart});
}

chrome.tabs.onUpdated.addListener(function(tabId, change, tab) {
  if (change.status == "complete") {
    updateChart(tabId);
  }
});

chrome.tabs.onSelectionChanged.addListener(function(tabId, info) {
  selectedId = tabId;
  updateSelected(tabId);
});

// Ensure the current selected tab is set up.
chrome.tabs.getSelected(null, function(tab) {
  updateChart(tab.id);
});
