const Client = require('../build/Client.compiled.js').Client;
console.log(Client);

const client = new Client({
  host: 'localhost',
  port: 80,
  username: 'user',
  password: 'password',
});

client.login().then((result) => {
  const channels = client.Miscellaneous();

  channels.info()
  .then((data) => { console.log('rename'); console.log(data); })
  .catch((error) => { console.log('rename'); console.log(error); });

}).catch((err) => {
  console.log(err);
});
