import { getToken } from './clientUtils';

export const request = (url: string, options: RequestInit) => {
  return fetch(url, options)
    .then((response) => {
      if (response.status === 401) {
        throw new Error('Unauthorized');
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
};

export const API = {
  post: <T>(url: string, body = {}, options?: RequestInit) => {
    return request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      credentials: 'include',
      ...options,
      body: JSON.stringify(body),
    }) as Promise<T>;
  },
  get: <T>(url: string, options?: RequestInit) => {
    return request(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      credentials: 'include',
      ...options,
    }) as Promise<T>;
  },
  // ...
};
