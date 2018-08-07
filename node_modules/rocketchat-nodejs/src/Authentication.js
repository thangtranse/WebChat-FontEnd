import Request from './Request';

export default class Authentication extends Request {

  logout() {
    return super.sendRequest('get', '/logout');
  }

  me() {
    return super.sendRequest('get', '/me');
  }

}
