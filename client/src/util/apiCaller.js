import fetch from 'isomorphic-fetch';

export const API_URL = 'http://localhost:3000/api';

export default async (endpoint, method = 'get', headerOptions = {}, body, file=null) => {
  let headers = {
    'content-type': 'application/json'
  };
  // make itself build multipart/form-data  + boundary for files
  if (file) delete headers['content-type'];
  if (headerOptions === null) {
    headers = {};
  } else { Object.assign(headers, headerOptions); }

  return fetch(`${API_URL}/${endpoint}`, {
    headers,
    method,
    body: body,
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
