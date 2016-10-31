import Vue from 'vue';
import {map} from 'ramda';

const getStore = key =>
	JSON.parse(localStorage.getItem(key));

const check = elem => {
	if (elem.url instanceof Array) {
		elem.url = elem.url[0];
		return elem;
	}
	return elem;
};

const listify = map(check);

const clearFormData = () =>
	localStorage.removeItem('formData');

const getFormData = () => {
	const formData = getStore('formData');
	if (formData) {
		return formData;
	}
	return {url: '', redirect: ''};
};

const addUrls = function () {
	const store = getStore('data');
	const newUrl = {
		url: [this.form.url],
		redirect: this.form.redirect
	};

	store.push(newUrl);
	localStorage.setItem('data', JSON.stringify(store));
	this.list = listify(getStore('data'));
	clearFormData();
};

const updateFormData = function () {
	const formData = {
		url: this.form.url,
		redirect: this.form.redirect
	};

	localStorage.setItem('formData', JSON.stringify(formData));
};

export const app = new Vue({
	el: '.app',
	data: {
		list: listify(getStore('data')),
		form: getFormData()
	},
	methods: {
		addUrls,
		updateFormData
	}
});
