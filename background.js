
chrome.commands.onCommand.addListener(function(command) {
	var mapURL = chrome.extension.getURL("tree.html");
	chrome.tabs.update({url: mapURL});
});

chrome.browserAction.onClicked.addListener(function(tab){
	var mapURL = chrome.extension.getURL("tree.html");
	chrome.tabs.update({url:mapURL});
})