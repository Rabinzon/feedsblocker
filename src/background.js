import {find, equals, memoize} from 'ramda';
import data from './data.json';

(() =>
	localStorage.getItem('data') ? '' :
		localStorage.setItem('data', JSON.stringify(data))
)();

const getData = () =>
	JSON.parse(localStorage.getItem('data'));

const redirect = (id, url) =>
	chrome.tabs.update(id, {url});

const findUrl = memoize(tabUrl =>
	find(elem =>
		find(equals(tabUrl))(elem.url))(getData()));

const checkTab = tab => {
	const site = findUrl(tab.url);
	if (site) {
		redirect(tab.id, site.redirect);
	}
};

chrome.tabs.onUpdated.addListener(() =>
	chrome.tabs.getSelected(null, checkTab));
