export const clearFormData = () =>
	localStorage.removeItem('formData');

export const getStore = key =>
	JSON.parse(localStorage.getItem(key));

export const setToStore = (key, value) =>
	localStorage.setItem(key, value);

export const removeFromStore = key =>
	localStorage.removeItem(key);
