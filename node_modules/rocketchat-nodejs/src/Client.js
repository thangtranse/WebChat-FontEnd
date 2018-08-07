import Authentication from './Authentication';
import Users from './Users';
import Channels from './Channels';
import Groups from './Groups';
import Im from './Im';
import Chat from './Chat';
import Settings from './Settings';
import Integration from './Integration';
import Livechat from './Livechat';
import Miscellaneous from './Miscellaneous';

export class Client {

  constructor(args) {
    this.setHost(args.host || 'localhost');
    this.setPort(args.port || 80);
    this.setScheme(args.scheme || 'http');
    this.setUserName(args.username || null);
    this.setPassword(args.password || null);
    this.setAuthToken(args.token || null);
    this.setUserId(args.userId || null);
  }

  setHost(host) {
    this.host = host;
  }

  getHost() {
    return this.host;
  }

  setPort(port) {
    this.port = port;
  }

  getPort() {
    return this.port;
  }

  setScheme(scheme) {
    this.scheme = scheme;
  }

  getScheme() {
    return this.scheme;
  }

  getApiUrl() {
    return `${this.getScheme()}://${this.getHost()}:${this.getPort()}/api/v1`;
  }

  setUserId(userId) {
    this.userId = userId;
  }

  getUserId() {
    return this.userId;
  }

  setUserName(username) {
    this.username = username;
  }

  getUsername() {
    return this.username;
  }

  setPassword(password) {
    this.password = password;
  }

  getPassword() {
    return this.password;
  }

  setAuthToken(authToken) {
    this.authToken = authToken;
  }

  getAuthToken() {
    return this.authToken;
  }

  login() {
    return new Promise((resolve, reject) => {
      this.Authentication().sendRequest('post', '/login',
        { username: this.getUsername(), password: this.getPassword() },
        { authenticate: false }
      ).then((result) => {
        this.setAuthToken(result.authToken);
        this.setUserId(result.userId);
        resolve(result);
      })
      .catch(error => reject(error));
    });
  }

  Authentication() {
    return new Authentication(this);
  }

  Users() {
    return new Users(this);
  }

  Channels() {
    return new Channels(this);
  }

  Groups() {
    return new Groups(this);
  }

  Im() {
    return new Im(this);
  }

  Chat() {
    return new Chat(this);
  }

  Settings() {
    return new Settings(this);
  }

  Integration() {
    return new Integration(this);
  }

  Livechat() {
    return new Livechat(this);
  }

  Miscellaneous() {
    return new Miscellaneous(this);
  }
};
