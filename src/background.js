var that = this;

var domens = [
	{
		url: [
			'https://www.youtube.com/',
			'https://www.youtube.com/?gl=RU&hl=ru',
			'https://www.youtube.com/?gl=RU&=ru'
		],
		rederect: 'https://www.youtube.com/feed/subscriptions'
	},
	{
		url: [
			'https://vk.com/feed',
			'https://new.vk.com/feed'
		],
		rederect: 'https://vk.com/id0',
	}
];

chrome.tabs.onUpdated.addListener(function(data) {
	chrome.tabs.getSelected(null, function(tab) {
		alert(tab);
	});
});

function find(tab) {
	return _.find(domens, function(obj) {
		if(index(obj, tab.url) > -1){
			return obj;
		}
	});
}
function index(obj, url){
	return _.findIndex(obj.url, function(s) {
		return s == url;
	})
}
