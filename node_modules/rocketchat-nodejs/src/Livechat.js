import Request from './Request';

export default class Livechat extends Request {

  getDepartment(_id = '') {
    return super.sendRequest('get', `/livechat/department/${_id}`);
  }

  registerDepartment(parameters) {
    return super.sendRequest('post', '/livechat/department', parameters);
  }

  updateDepartment(_id, parameters) {
    return super.sendRequest('put', `/livechat/department/${_id}`, parameters);
  }

  deleteDepartment(_id, parameters) {
    return super.sendRequest('delete', `/livechat/department/${_id}`, parameters);
  }

  smsIncoming(service, parameters) {
    return super.sendRequest('post', `/livechat/sms-incoming/${service}`, parameters);
  }

  getUsers(type, _id = '') {
    return super.sendRequest('get', `/livechat/users/${type}/${_id}`);
  }

  registerUser(type, parameters) {
    return super.sendRequest('post', `/livechat/users/${type}`, parameters);
  }

  deleteUser(type, _id, parameters) {
    return super.sendRequest('delete', `/livechat/users/${type}/${_id}`, parameters);
  }
}
