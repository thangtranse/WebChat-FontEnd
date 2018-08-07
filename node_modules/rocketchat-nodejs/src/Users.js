import Request from './Request';

export default class Users extends Request {

  create(parameters) {
    return super.sendRequest('post', '/users.create', parameters);
  }

  delete(parameters) {
    return super.sendRequest('post', '/users.delete', parameters);
  }

  getPresence(parameters = {}) {
    return super.sendRequest('get', '/users.getPresence', parameters, { authenticate: true, requestType: 'queryString' });
  }

  info(parameters) {
    return super.sendRequest('get', '/users.info', parameters, { authenticate: true, requestType: 'queryString' });
  }

  list() {
    return super.sendRequest('get', '/users.list', {});
  }

  setAvatar(parameters) {
    let options = { authenticate: true };
    if (parameters.filepath) {
      options.requestType = 'file';
    }
    return super.sendRequest('post', '/users.setAvatar', parameters, options);
  }

  update(parameters) {
    return super.sendRequest('post', '/users.update', parameters);
  }

}
