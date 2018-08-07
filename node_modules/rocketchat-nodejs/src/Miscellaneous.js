import Request from './Request';

export default class Miscellaneous extends Request {

  constructor(client) {
    super(client);
  }

  info() {
    return super.sendRequest('get', '/info', {}, { authenticate: false });
  }

}
