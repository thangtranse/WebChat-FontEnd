import Request from './Request';

export default class Groups extends Request {

  addAll(parameters) {
    return super.sendRequest('post', '/groups.addAll', parameters);
  }

  addModerator(parameters) {
    return super.sendRequest('post', '/groups.addModerator', parameters);
  }

  addOwner(parameters) {
    return super.sendRequest('post', '/groups.addOwner', parameters);
  }

  archive(parameters) {
    return super.sendRequest('post', '/groups.archive', parameters);
  }

  close(parameters) {
    return super.sendRequest('post', '/groups.close', parameters);
  }

  create(parameters) {
    return super.sendRequest('post', '/groups.create', parameters);
  }

  getIntegrations(parameters) {
    return super.sendRequest('get', '/groups.getIntegrations', parameters, { authenticate: true, requestType: 'queryString' });
  }

  history(parameters) {
    return super.sendRequest('get', '/groups.history', parameters, { authenticate: true, requestType: 'queryString' });
  }

  info(parameters) {
    return super.sendRequest('get', '/groups.info', parameters, { authenticate: true, requestType: 'queryString' });
  }

  invite(parameters) {
    return super.sendRequest('post', '/groups.invite', parameters);
  }

  kick(parameters) {
    return super.sendRequest('post', '/groups.kick', parameters);
  }

  leave(parameters) {
    return super.sendRequest('post', '/groups.leave', parameters);
  }

  list() {
    return super.sendRequest('get', '/groups.list');
  }

  open(parameters) {
    return super.sendRequest('post', '/groups.open', parameters);
  }

  removeModerator(parameters) {
    return super.sendRequest('post', '/groups.removeModerator', parameters);
  }

  removeOwner(parameters) {
    return super.sendRequest('post', '/groups.removeOwner', parameters);
  }

  rename(parameters) {
    return super.sendRequest('post', '/groups.rename', parameters);
  }

  setDescription(parameters) {
    return super.sendRequest('post', '/groups.setDescription', parameters);
  }

  setPurpose(parameters) {
    return super.sendRequest('post', '/groups.setPurpose', parameters);
  }

  setReadOnly(parameters) {
    return super.sendRequest('post', '/groups.setReadOnly', parameters);
  }

  setTopic(parameters) {
    return super.sendRequest('post', '/groups.setTopic', parameters);
  }

  setType(parameters) {
    return super.sendRequest('post', '/groups.setType', parameters);
  }

  unarchive(parameters) {
    return super.sendRequest('post', '/groups.unarchive', parameters);
  }
}
