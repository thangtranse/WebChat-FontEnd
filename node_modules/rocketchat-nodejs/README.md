# RocketChat REST API library for node.js


For more information about the API, check the official document [here](https://rocket.chat/docs/developer-guides/rest-api/).

Available functions:

- [Miscellaneous](#Miscellaneous)
  - info
- [Authentication](#Authentication)
  - logout
  - me
- [Users](#Users)
  - create
  - delete
  - getPresence
  - info
  - list
  - setAvatar
  - update
- [Channels](#Channels)
  - addAll
  - addModerator
  - addOwner
  - archive
  - cleanHistory
  - close
  - create
  - getIntegrations
  - history
  - info
  - invite
  - kick
  - leave
  - list.joined
  - list
  - open
  - removeModerator
  - removeOwner
  - rename
  - setDescription
  - setJoinCode
  - setPurpose
  - setReadOnly
  - setTopic
  - setType
  - unarchive
- [Groups](#Groups)
  - addAll
  - addModerator
  - addOwner
  - archive
  - close
  - create
  - getIntegrations
  - history
  - info
  - invite
  - kick
  - leave
  - list
  - open
  - removeModerator
  - removeOwner
  - rename
  - setDescription
  - setPurpose
  - setReadOnly
  - setTopic
  - setType
  - unarchive
- [Im](#Im)
  - close
  - history
  - list.everyone
  - list
  - messages.others
  - open
  - setTopic
- [Chat](#Chat)
  - delete
  - postMessage
  - update
- [Settings](#Settings)
  - get
  - update
- [Integration](#Integration)
  - create
  - list
  - remove
- [Livechat](#Livechat)
  - department
  - sms-incoming
  - users


  ## Installation

  Install with the node package manager [npm](http://npmjs.org/):

  ```
  $ npm install rocketchat-nodejs
  ```

  or install via git clone:

  ```
  $ git clone https://github.com/vitor-nagao/rocketchat-nodejs.git
  $ cd rocketchat-nodejs
  $ npm install
  ```

  ## Starting

  ```
  var RocketChat = require('rocketchat-nodejs).Client;

  var Client = new RocketChat({
    host: 'hostname.com',
    port: 80,
    scheme: 'http',
    username: 'rc_user',
    password: 'rc_password'
  });

  Client.login().then(() => {

    // write your API functions here
    // example
    Authentication.me().then((result) => {
      var me = result;
    });

  }).catch((error) => {
    console.log(error);
  });
  ```

  ### <a id="Miscellaneous"></a>Miscellaneous

  ```
  var Miscellaneous = Client.Miscellaneous();

  // /api/v1/info
  Miscellaneous.info().then((result) => {
    var info = result;
  }).catch((error) => {
    console.log(error)
  });
  ```

  ### <a id="Authentication"></a>Authentication

  ```
  var Authentication = Client.Authentication();

  // /api/v1/logout
  Authentication.logout().then((result) => {
    var info = result;
  });

  // /api/v1/me
  Authentication.me().then((result) => {
    var me = result;
  });
  ```

  ### <a id="Users"></a>Users

  ```
  var Users = Client.Users();

  // /api/v1/users.create
  Users.create({
    email: 'rocket@chat.com',
    name: 'Example Name',
    password: 'testpassword',
    username: 'test_user'
  }).then((result) => {
    var create = result;
  });

  // /api/v1/users.delete
  Users.delete({ userId: 'BsNr28znDkG8aeo7W' }).then((result) => {
    var delete = result
  });

  // /api/v1/users.getPresence
  Users.getPresence({ userId: 'BsNr28znDkG8aeo7W' }).then((result) => {
    var getPresence = result
  });


  // /api/v1/users.info
  Users.info({ userId: 'BsNr28znDkG8aeo7W' }).then((result) => {
    var info = result
  });


  // /api/v1/users.list
  Users.list({ userId: 'BsNr28znDkG8aeo7W' }).then((result) => {
    var list = result
  });


  // /api/v1/users.setAvatar
  Users.setAvatar({ avatarUrl: 'http://domain.tld/to/my/own/avatar.jpg' }).then((result) => {
    var setAvatar = result
  });


  // /api/v1/users.update
  Users.update({ userId: 'BsNr28znDkG8aeo7W', data: { name: 'new name', email: 'new@email.com'} }).then((result) => {
    var update = result
  });
  ```

  ### <a id="Channels"></a>Channels

  ```
  var Channels = Client.Channels();

  // /api/v1/channels.addAll
  Channels.addAll({ roomId: 'ByehQjC44FwMeiLbX' }).then((result) => {
    var addAll = result;
  });

  // /api/v1/channels.addModerator
  Channels.addModerator({ roomId: 'ByehQjC44FwMeiLbX', userId: 'nSYqWzZ4GsKTX4dyK' }).then((result) => {
    var addModerator = result;
  });

  // /api/v1/channels.addOwner
  Channels.addOwner({ roomId: 'ByehQjC44FwMeiLbX', userId: 'nSYqWzZ4GsKTX4dyK' }).then((result) => {
    var addOwner = result;
  });

  // /api/v1/channels.archive
  Channels.archive({ roomId: 'ByehQjC44FwMeiLbX' }).then((result) => {
    var archive = result;
  });

  // /api/v1/channels.cleanHistory
  Channels.cleanHistory({ roomId: 'ByehQjC44FwMeiLbX', latest: '2016-12-09T13:42:25.304Z', oldest: '2016-08-30T13:42:25.304Z' }).then((result) => {
    var cleanHistory = result;
  });

  // /api/v1/channels.close
  Channels.close({ roomId: 'ByehQjC44FwMeiLbX' }).then((result) => {
    var close = result;
  });

  // /api/v1/channels.create
  Channels.create({ name: 'channelName', members: ['member_one', 'member_two'] }).then((result) => {
    var create = result;
  });

  // /api/v1/channels.getIntegrations
  Channels.getIntegrations({ roomId: 'ByehQjC44FwMeiLbX' }).then((result) => {
    var getIntegrations = result;
  });

  // /api/v1/channels.history
  Channels.history({ roomId: 'ByehQjC44FwMeiLbX' }).then((result) => {
    var history = result;
  });

  // /api/v1/channels.info
  Channels.info({ roomId: 'ByehQjC44FwMeiLbX' }).then((result) => {
    var info = result;
  });

  // /api/v1/channels.invite
  Channels.invite({ roomId: 'ByehQjC44FwMeiLbX', userId: 'nSYqWzZ4GsKTX4dyK' }).then((result) => {
    var invite = result;
  });

  // /api/v1/channels.kick
  Channels.kick({ roomId: 'ByehQjC44FwMeiLbX', userId: 'nSYqWzZ4GsKTX4dyK' }).then((result) => {
    var kick = result;
  });

  // /api/v1/channels.leave
  Channels.leave({ roomId: 'ByehQjC44FwMeiLbX' }).then((result) => {
    var leave = result;
  });

  // /api/v1/channels.list.joined
  Channels.listJoined().then((result) => {
    var listJoined = result;
  });

  // /api/v1/channels.list
  Channels.list().then((result) => {
    var list = result;
  });

  // /api/v1/channels.open
  Channels.open({ roomId: 'ByehQjC44FwMeiLbX' }).then((result) => {
    var open = result;
  });

  // /api/v1/channels.removeModerator
  Channels.removeModerator({ roomId: 'ByehQjC44FwMeiLbX', userId: 'nSYqWzZ4GsKTX4dyK' }).then((result) => {
    var removeModerator = result;
  });

  // /api/v1/channels.removeOwner
  Channels.removeOwner({ roomId: 'ByehQjC44FwMeiLbX', userId: 'nSYqWzZ4GsKTX4dyK' }).then((result) => {
    var removeOwner = result;
  });

  // /api/v1/channels.rename
  Channels.rename({ roomId: 'ByehQjC44FwMeiLbX', name: 'new-name' }).then((result) => {
    var rename = result;
  });

  // /api/v1/channels.setDescription
  Channels.setDescription({ roomId: 'ByehQjC44FwMeiLbX', description: 'Some description' }).then((result) => {
    var setDescription = result;
  });

  // /api/v1/channels.setJoinCode
  Channels.setJoinCode({ roomId: 'ByehQjC44FwMeiLbX', joinCode: 'my-join-code' }).then((result) => {
    var setJoinCode = result;
  });

  // /api/v1/channels.setPurpose
  Channels.setPurpose({ roomId: 'ByehQjC44FwMeiLbX', purpose: 'Some purpose' }).then((result) => {
    var setPurpose = result;
  });

  // /api/v1/channels.setReadOnly
  Channels.setReadOnly({ roomId: 'ByehQjC44FwMeiLbX', readOnly: true }).then((result) => {
    var setReadOnly = result;
  });

  // /api/v1/channels.setTopic
  Channels.setTopic({ roomId: 'ByehQjC44FwMeiLbX', topic: 'some topic' }).then((result) => {
    var setTopic = result;
  });

  // /api/v1/channels.setType
  Channels.setType({ roomId: 'ByehQjC44FwMeiLbX', type: 'p' }).then((result) => {
    var setType = result;
  });

  // /api/v1/channels.unarchive
  Channels.unarchive({ roomId: 'ByehQjC44FwMeiLbX' }).then((result) => {
    var unarchive = result;
  });
  ```

  ### <a id="Groups"></a>Groups

  ```
  var Groups = Client.Channels();

  // /api/v1/groups.addAll
  Groups.addAll({ roomId: 'ByehQjC44FwMeiLbX' }).then((result) => {
    var addAll = result;
  });

  // /api/v1/groups.addModerator
  Groups.addModerator({ roomId: 'ByehQjC44FwMeiLbX', userId: 'nSYqWzZ4GsKTX4dyK' }).then((result) => {
    var addModerator = result;
  });

  // /api/v1/groups.addOwner
  Groups.addOwner({ roomId: 'ByehQjC44FwMeiLbX', userId: 'nSYqWzZ4GsKTX4dyK' }).then((result) => {
    var addOwner = result;
  });

  // /api/v1/groups.archive
  Groups.archive({ roomId: 'ByehQjC44FwMeiLbX' }).then((result) => {
    var archive = result;
  });

  // /api/v1/groups.close
  Groups.close({ roomId: 'ByehQjC44FwMeiLbX' }).then((result) => {
    var close = result;
  });

  // /api/v1/groups.create
  Groups.create({ name: 'channelName', members: ['member_one', 'member_two'] }).then((result) => {
    var create = result;
  });

  // /api/v1/groups.getIntegrations
  Groups.getIntegrations({ roomId: 'ByehQjC44FwMeiLbX' }).then((result) => {
    var getIntegrations = result;
  });

  // /api/v1/groups.history
  Groups.history({ roomId: 'ByehQjC44FwMeiLbX' }).then((result) => {
    var history = result;
  });

  // /api/v1/groups.info
  Groups.info({ roomId: 'ByehQjC44FwMeiLbX' }).then((result) => {
    var info = result;
  });

  // /api/v1/groups.invite
  Groups.invite({ roomId: 'ByehQjC44FwMeiLbX', userId: 'nSYqWzZ4GsKTX4dyK' }).then((result) => {
    var invite = result;
  });

  // /api/v1/groups.kick
  Groups.kick({ roomId: 'ByehQjC44FwMeiLbX', userId: 'nSYqWzZ4GsKTX4dyK' }).then((result) => {
    var kick = result;
  });

  // /api/v1/groups.leave
  Groups.leave({ roomId: 'ByehQjC44FwMeiLbX' }).then((result) => {
    var leave = result;
  });

  // /api/v1/groups.list
  Groups.list().then((result) => {
    var list = result;
  });

  // /api/v1/groups.open
  Groups.open({ roomId: 'ByehQjC44FwMeiLbX' }).then((result) => {
    var open = result;
  });

  // /api/v1/groups.removeModerator
  Groups.removeModerator({ roomId: 'ByehQjC44FwMeiLbX', userId: 'nSYqWzZ4GsKTX4dyK' }).then((result) => {
    var removeModerator = result;
  });

  // /api/v1/groups.removeOwner
  Groups.removeOwner({ roomId: 'ByehQjC44FwMeiLbX', userId: 'nSYqWzZ4GsKTX4dyK' }).then((result) => {
    var removeOwner = result;
  });

  // /api/v1/groups.rename
  Groups.rename({ roomId: 'ByehQjC44FwMeiLbX', name: 'new-name' }).then((result) => {
    var rename = result;
  });

  // /api/v1/groups.setDescription
  Groups.setDescription({ roomId: 'ByehQjC44FwMeiLbX', description: 'Some description' }).then((result) => {
    var setDescription = result;
  });

  // /api/v1/groups.setPurpose
  Groups.setPurpose({ roomId: 'ByehQjC44FwMeiLbX', purpose: 'Some purpose' }).then((result) => {
    var setPurpose = result;
  });

  // /api/v1/groups.setReadOnly
  Groups.setReadOnly({ roomId: 'ByehQjC44FwMeiLbX', readOnly: true }).then((result) => {
    var setReadOnly = result;
  });

  // /api/v1/groups.setTopic
  Groups.setTopic({ roomId: 'ByehQjC44FwMeiLbX', topic: 'some topic' }).then((result) => {
    var setTopic = result;
  });

  // /api/v1/groups.setType
  Groups.setType({ roomId: 'ByehQjC44FwMeiLbX', type: 'p' }).then((result) => {
    var setType = result;
  });

  // /api/v1/groups.unarchive
  Channels.unarchive({ roomId: 'ByehQjC44FwMeiLbX' }).then((result) => {
    var unarchive = result;
  });
  ```

  ### <a id="Im"></a>Im

  ```
  var Im = Client.Im();

  // /api/v1/im.close
  Im.close({ roomId: 'ByehQjC44FwMeiLbX' }).then((result) => {
    var close = result;
  });

  // /api/v1/im.history
  Im.history({ roomId: 'ByehQjC44FwMeiLbX' }).then((result) => {
    var history = result;
  });

  // /api/v1/im.list.everyone
  Im.listEveryone().then((result) => {
    var listEveryone = result;
  });

  // /api/v1/im.list
  Im.list().then((result) => {
    var me = result;
  });

  // /api/v1/im.messages.others
  Im.messagesOthers({ roomId: 'ByehQjC44FwMeiLbX' }).then((result) => {
    var messagesOthers = result;
  });

  // /api/v1/im.open
  Im.open({ roomId: 'ByehQjC44FwMeiLbX' }).then((result) => {
    var open = result;
  });

  // /api/v1/im.setTopic
  Im.setTopic({ roomId: 'ByehQjC44FwMeiLbX', topic: 'some random topic' }).then((result) => {
    var setTopic = result;
  });
  ```

  ### <a id="Chat"></a>Chat

  ```
  var Chat = Client.Chat();

  // /api/v1/chat.delete
  Chat.delete({ roomId: 'ByehQjC44FwMeiLbX', msgId: '7aDSXtjMA3KPLxLjt' }).then((result) => {
    var delete = result;
  });

  // /api/v1/chat.postMessage
  Chat.postMessage({ roomId: 'ByehQjC44FwMeiLbX', text: 'some message' }).then((result) => {
    var postMessage = result;
  });

  // /api/v1/chat.update
  Chat.update({ roomId: 'ByehQjC44FwMeiLbX', msgId: '7aDSXtjMA3KPLxLjt', text: 'some updated message' }).then((result) => {
    var update = result;
  });
  ```

  ### <a id="Settings"></a>Settings

  ```
  var Settings = Client.Settings();

  // /api/v1/settings/:_id
  Settings.get('Livechat_enabled').then((result) => {
    var get = result;
  });

  // /api/v1/settings/:_id
  Settings.update('Livechat_enabled', { value: true }).then((result) => {
    var update = result;
  });
  ```

  ### <a id="Integration"></a>Integration

  ```
  var Integration = Client.Integration();

  // /api/v1/integrations.create
  Integration.create({ type: 'webhook-outgoing', name: 'Testing via REST API', enabled: false, username: 'rocket.cat', urls: ['http://text2gif.guggy.com/guggify'], scriptEnabled: false}).then((result) => {
    var create = result;
  });

  // /api/v1/integrations.list
  Integration.list().then((result) => {
    var list = result;
  });

  // /api/v1/integrations.remove
  Integration.remove({  type: 'webhook-outgoing', integrationId: 'oNLthAt9RwMw39N2B'  }).then((result) => {
    var remove = result;
  });
  ```

  ### <a id="Livechat"></a>Livechat

  ```
  var Livechat = Client.Livechat();

  // /api/v1/livechat/department
  Livechat.getDepartment().then((result) => {
    var department = result;
  });

  // /api/v1/livechat/deparment/:_id
  Livechat.getDepartment('SQafHvoFPuB57NmBD').then((result) => {
    var department = result;
  });

  // /api/v1/livechat/department
  Livechat.registerDepartment().then((result) => {
    var department = result;
  });

  // /api/v1/livechat/deparment/:_id
  Livechat.updateDepartment('SQafHvoFPuB57NmBD', { deparment: { enabled: true, showOnRegistration: true, name: 'test department' } }).then((result) => {
    var department = result;
  });

  // /api/v1/livechat/deparment/:_id
  Livechat.deleteDepartment('SQafHvoFPuB57NmBD').then((result) => {
    var department = result;
  });

  // /api/v1/livechat/sms-incoming/:service
  Livechat.smsIncoming('twilio', { From: '5551123456789', To: '5551987654321', Body: 'SMS message', ToCountry: 'Brazil', ToState: 'RS', ToCity: 'Porto Alegre', ToZip: '', FromCountry: 'Brazil', FromState: 'RS', FromCity: 'Porto Alegre', FromZip': '' }).then((result) => {
    var smsIncoming = result;
  });

  // /api/v1/livechat/users
  Livechat.getUsers('agent').then((result) => {
    var user = result;
  });

  // /api/v1/livechat/users/:type
  Livechat.getUsers('agent' ,'SQafHvoFPuB57NmBD').then((result) => {
    var user = result;
  });

  // /api/v1/livechat/users/:type
  Livechat.registerUser('agent').then((result) => {
    var user = result;
  });

  // /api/v1/livechat/deparment/:_id
  Livechat.deleteUser('agent' ,'SQafHvoFPuB57NmBD').then((result) => {
    var user = result;
  });
  ```
