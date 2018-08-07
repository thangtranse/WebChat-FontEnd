import Request from './Request';

export default class Settings extends Request {

  get(_id) {
    return super.sendRequest('get', `/settings/${_id}`);
  }

  update(_id, parameters) {
    return super.sendRequest('post', `/settings/${_id}`, parameters);
  }

}
