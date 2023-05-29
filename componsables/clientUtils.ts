// you can customize this function to get the token from another source
export const getToken = () =>
  process.client ? localStorage.getItem('token') : '';
