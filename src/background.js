import {
	find,
	equals
} from 'ramda';

import {
	getStore,
	setToStore
} from './store';

import data from './data.json';

(() =>
		getStore('data') ? '' :
			setToStore('data', JSON.stringify(data))
)();

const getData = () => getStore('data');

const redirect = (id, url) =>
	chrome.tabs.update(id, {url});

const findUrl = tabUrl => find(elem =>
		find(equals(tabUrl))(elem.url))(getData());

const checkTab = tab => {
	const site = findUrl(tab.url);
	if (site) {
		redirect(tab.id, site.redirect);
	}
};

chrome.tabs.onUpdated.addListener(() =>
	chrome.tabs.getSelected(null, checkTab));
