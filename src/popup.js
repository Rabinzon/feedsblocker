import Vue from 'vue';
import {map} from 'ramda';

const getStore = () =>
	JSON.parse(localStorage.getItem('data'));

const check = elem => {
	if (elem.url instanceof Array) {
		elem.url = elem.url[0];
		return elem;
	}
	return elem;
};

const listify = map(check);

const addUrls = function () {
	const store = getStore();
	const newUrl = {
		url: [this.form.url],
		redirect: this.form.redirect
	};

	store.push(newUrl);
	localStorage.setItem('data', JSON.stringify(store));
	this.list = listify(getStore());
};

export const app = new Vue({
	el: '.app',
	data: {
		list: listify(getStore()),
		form: {
			url: '',
			redirect: ''
		}
	},
	methods: {addUrls}
});
