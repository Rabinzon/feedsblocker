chrome.tabs.onUpdated.addListener(() => {
	chrome.tabs.getSelected(null, () => {
	});
});

