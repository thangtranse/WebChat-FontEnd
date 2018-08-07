import unirest from 'unirest';

export default class Request {
  constructor(client) {
    this.Client = client;
  }

  sendRequest(method, resource, parameters, options = { authenticate: true }) {
    return new Promise((resolve, reject) => {
      const resourceUrl = this.Client.getApiUrl() + resource;
      const request = this.setMethod(method, resourceUrl);
      if (request === Error()) {
        reject(request);
      }

      let header = {};
      if (options.authenticate === true) {
        if (this.Client.getAuthToken() === null || this.Client.getUserId() === null) {
          reject('You will need to provide the authToken and userId for any of the authenticated methods.');
        }

        header = {
          'X-Auth-Token': this.Client.getAuthToken(),
          'X-User-Id': this.Client.getUserId(),
        };
      }

      switch (options.requestType) {
        case 'queryString':
          request.headers(header);
          request.query(parameters);
          break;
        case 'file':
          request.headers(header);
          request.attach(parameters.filename, parameters.filepath);
          break;
        default:
          header['Content-type'] = 'application/json';
          request.headers(header);
          request.send(parameters);
      }

      request.end((response) => {
        if (response.error) {
          reject('Rocket Chat API error: ' + response.error);
        }
        if (response.statusCode === 200) {
          if (response.body.data) {
            resolve(response.body.data);
          } else {
            resolve(response.body);
          }
        }
        if (response.body) {
          if (response.body.error) {
            reject(`Rocket Chat API response Status Code ${response.statusCode}: ${response.body.error}`);
          }
          if(response.body.status === 'error') {
            reject('Rocket Chat API error: ' + response.body.message);
          }
        }
      });
    });
  }

  setMethod(method, url) {
    switch (method) {
      case 'get':
        return unirest.get(url);
      case 'post':
        return unirest.post(url);
      case 'put':
        return unirest.put(url);
      case 'delete':
        return unirest.delete(url);
      case 'patch':
        return unirest.patch(url);
      case 'head':
        return unirest.head(url);
      default:
        return new Error('Method doesn\'t exist');
    }
  }

}
