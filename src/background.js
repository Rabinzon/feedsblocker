import {find, equals} from 'ramda';
import data from './data.json';

localStorage.setItem('data', JSON.stringify(data));

const getData = () =>
	JSON.parse(localStorage.getItem('data'));

const redirect = (id, url) =>
	chrome.tabs.update(id, {url});

const findUrl = tab =>
	find(elem => find(equals(tab.url))(elem.url));

const checkTab = tab => {
	const site = findUrl(tab)(getData());
	if (site) {
		redirect(tab.id, site.redirect);
	}
};

chrome.tabs.onUpdated.addListener(() =>
	chrome.tabs.getSelected(null, checkTab));
