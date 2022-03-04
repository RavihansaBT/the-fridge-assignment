import axios from 'axios';

const baseURL = 'https://thefridge-api.karapincha.io/fridge';

/**
 * Get all Items in fridge
 * @returns all items in fridge
 */
export function getAllItems() {
  return axios.get(baseURL);
}

/**
 * Add new item to fridge
 * @param { "title", "expiry""} data
 * @returns
 */
export function createNewItem(data) {
  return axios.post(baseURL, data);
}

/**
 * Get individuwal item
 * @param {*} id
 * @returns
 */
export function getItemById(id) {
  return axios.get(`${baseURL}/${id}`);
}

/**
 * Update item on fridge
 * @param {*} id
 * @param {*} data
 * @returns
 */
export function updateItem(id, data) {
  return axios.put(`${baseURL}/${id}`, data);
}

/**
 * Delete item on fridge
 * @param {*} id
 * @returns
 */
export function deleteItem(id) {
  return axios.delete(`${baseURL}/${id}`);
}
