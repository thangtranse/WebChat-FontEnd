import Request from './Request';

export default class Chat extends Request {

  delete(parameters) {
    return super.sendRequest('post', '/chat.delete', parameters);
  }

  postMessage(parameters) {
    return super.sendRequest('post', '/chat.postMessage', parameters);
  }

  update(parameters) {
    return super.sendRequest('post', '/chat.update', parameters);
  }

};
