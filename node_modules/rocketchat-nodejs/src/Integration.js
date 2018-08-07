import Request from './Request';

export default class Integration extends Request {

  create(parameters) {
    return super.sendRequest('post', '/integrations.create', parameters);
  }

  list() {
    return super.sendRequest('get', '/integrations.list');
  }

  remove(parameters) {
    return super.sendRequest('post', '/integrations.remove', parameters);
  }

}
