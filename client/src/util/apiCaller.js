import fetch from 'isomorphic-fetch';

export const API_URL = 'http://localhost:3000/api';

export default async (endpoint, method = 'get', body) => {
  return fetch(`${API_URL}/${endpoint}`, {
    headers: { 'content-type': 'application/json' },
    method,
    body: JSON.stringify(body),
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    const data = Object.assign(json, { status: response.status });
    if (!response.ok) {
      return Promise.reject(data);
    }

    return data;
  })
  .then(
    response => response,
    error => error
  );
}
