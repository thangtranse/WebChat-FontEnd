import Request from './Request';

export default class Im extends Request {
  close(parameters) {
    return super.sendRequest('post', '/im.close', parameters);
  }

  history(parameters) {
    return super.sendRequest('get', '/im.history', parameters, { authenticate: true, requestType: 'queryString' });
  }

  listEveryone() {
    return super.sendRequest('get', '/im.list.everyone');
  }

  list() {
    return super.sendRequest('get', '/im.list');
  }

  messagesOthers(parameters) {
    return super.sendRequest('get', '/im.messages.others', parameters, { authenticate: true, requestType: 'queryString' });
  }

  open(parameters) {
    return super.sendRequest('post', '/im.open', parameters);
  }

  setTopic(parameters) {
    return super.sendRequest('post', '/im.setTopic', parameters);
  }
};
