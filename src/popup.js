import Vue from 'vue';
import {map} from 'ramda';
import validaUrl from 'valid-url';
import {
	clearFormData,
	getStore,
	setToStore,
	removeFromStore
} from './store';

const check = elem => {
	if (elem.url instanceof Array) {
		elem.url = elem.url[0];
		return elem;
	}
	return elem;
};

const listify = data => data ? map(check)(data) : '';

const getFormState = () => {
	const formState = getStore('formState');

	if (formState) {
		return formState;
	}

	setToStore('formState', 'false');
	return false;
};

const getFormData = () => {
	const formData = getStore('formData');
	if (formData) {
		return formData;
	}
	return {url: '', redirect: ''};
};

const toggleError = function (state) {
	this.error = state;
};

const toggleForm = function () {
	const state = !getFormState();
	this.formActive = state;
	setToStore('formState', JSON.stringify(state));
};

const addUrls = function () {
	if (validaUrl.isUri(this.form.url) && validaUrl.isUri(this.form.redirect)) {
		const store = getStore('data');
		const newUrl = {
			url: [this.form.url],
			redirect: this.form.redirect
		};

		toggleError.apply(this, [false]);
		setToStore('data', JSON.stringify([...store, newUrl]));
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

	setToStore('formData', JSON.stringify(formData));
};

const clearList = function () {
	removeFromStore('formData');
	setToStore('data', JSON.stringify([]));
	this.list = listify(getStore('data'));
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
