import Request from './Request';

export default class Channels extends Request {

  addAll(parameters) {
    return super.sendRequest('post', '/channels.addAll', parameters);
  }

  addModerator(parameters) {
    return super.sendRequest('post', '/channels.addModerator', parameters);
  }

  addOwner(parameters) {
    return super.sendRequest('post', '/channels.addOwner', parameters);
  }

  archive(parameters) {
    return super.sendRequest('post', '/channels.archive', parameters);
  }

  cleanHistory(parameters) {
    return super.sendRequest('post', '/channels.cleanHistory', parameters);
  }

  close(parameters) {
    return super.sendRequest('post', '/channels.close', parameters);
  }

  create(parameters) {
    return super.sendRequest('post', '/channels.create', parameters);
  }

  getIntegrations(parameters) {
    return super.sendRequest('get', '/channels.getIntegrations', parameters, { authenticate: true, requestType: 'queryString' });
  }

  history(parameters) {
    return super.sendRequest('get', '/channels.history', parameters, { authenticate: true, requestType: 'queryString' });
  }

  info(parameters) {
    return super.sendRequest('get', '/channels.info', parameters, { authenticate: true, requestType: 'queryString' });
  }

  invite(parameters) {
    return super.sendRequest('post', '/channels.invite', parameters);
  }

  kick(parameters) {
    return super.sendRequest('post', '/channels.kick', parameters);
  }

  leave(parameters) {
    return super.sendRequest('post', '/channels.leave', parameters);
  }

  listJoined() {
    return super.sendRequest('get', '/channels.list.joined');
  }

  list() {
    return super.sendRequest('get', '/channels.list');
  }

  open(parameters) {
    return super.sendRequest('post', '/channels.open', parameters);
  }

  removeModerator(parameters) {
    return super.sendRequest('post', '/channels.removeModerator', parameters);
  }

  removeOwner(parameters) {
    return super.sendRequest('post', '/channels.removeOwner', parameters);
  }

  rename(parameters) {
    return super.sendRequest('post', '/channels.rename', parameters);
  }

  setDescription(parameters) {
    return super.sendRequest('post', '/channels.setDescription', parameters);
  }

  setJoinCode(parameters) {
    return super.sendRequest('post', '/channels.setJoinCode', parameters);
  }

  setPurpose(parameters) {
    return super.sendRequest('post', '/channels.setPurpose', parameters);
  }

  setReadOnly(parameters) {
    return super.sendRequest('post', '/channels.setReadOnly', parameters);
  }

  setTopic(parameters) {
    return super.sendRequest('post', '/channels.setTopic', parameters);
  }

  setType(parameters) {
    return super.sendRequest('post', '/channels.setType', parameters);
  }

  unarchive(parameters) {
    return super.sendRequest('post', '/channels.unarchive', parameters);
  }
}
