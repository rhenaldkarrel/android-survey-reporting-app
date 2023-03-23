import resource from '.';

export function login({ email, password }) {
  return resource.post('/users/login', {email, password});
}