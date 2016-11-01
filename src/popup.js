import Vue from 'vue';
import {map} from 'ramda';
import validaUrl from 'valid-url';

const getStore = key =>
	JSON.parse(localStorage.getItem(key));

const check = elem => {
	if (elem.url instanceof Array) {
		elem.url = elem.url[0];
		return elem;
	}
	return elem;
};

const listify = (data) => data ? map(check)(data) : '';

const clearFormData = () =>
	localStorage.removeItem('formData');

const getFormState = () => {
	const formState = getStore('formState');

	if (formState) {
		return formState;
	}

	localStorage.setItem('formState', 'false');
	return false;
};

const getFormData = () => {
	const formData = getStore('formData');
	if (formData) {
		return formData;
	}
	return {url: '', redirect: ''};
};

const toggleError = function (mod) {
	this.error = mod;
};

const addUrls = function () {
	if (validaUrl.isUri(this.form.url) && validaUrl.isUri(this.form.redirect)) {
		const store = getStore('data');
		const newUrl = {
			url: [this.form.url],
			redirect: this.form.redirect
		};

		toggleError.apply(this, [false]);
		store.push(newUrl);

		localStorage.setItem('data', JSON.stringify(store));
		this.list = listify(getStore('data'));
		clearFormData.apply(this, []);
		toggleForm.apply(this, []);
		this.form = getFormData();
	}
	else {
		toggleError.apply(this, [true]);
		console.error('url is not falid');
	}

};

const updateFormData = function () {
	const formData = {
		url: this.form.url,
		redirect: this.form.redirect
	};

	localStorage.setItem('formData', JSON.stringify(formData));
};

const toggleForm = function () {
	const state = !getFormState();
	this.formActive = state;
	localStorage.setItem('formState', JSON.stringify(state));
};

const clearList = function () {
	localStorage.removeItem('formData');
	localStorage.setItem('data', JSON.stringify([]));
	this.form = getFormData();
};

export const app = new Vue({
	el: '.app',
	data: {
		list: listify(getStore('data')),
		form: getFormData(),
		error: false,
		formActive: getFormState()
	},
	methods: {
		addUrls,
		updateFormData,
		toggleForm,
		clearList
	}
});
