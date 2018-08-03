var axios = require('./request_api_rocket');

class useApi {

    login(username, password, callback) {
        axios.post('/login', {
            username: username,
            password: password,
        }).then(response => {
            console.log(response)
            return callback(response)
        }).catch(function (message) {
            console.log(message);
        })
    }

    logout(callback) {
        axios({
            method: 'POST',
            url: '/logout',
            headers: {
                'X-Auth-Token': sessionStorage.getItem("authToken"),
                'X-User-Id': sessionStorage.getItem("userId")
            }
        }).then(response => {
            return callback(response);
        }).catch(function (message) {
            console.log(message);
        })
    }

    register(username, password, name, email, callback) {
        axios({
            method: 'POST',
            url: '/users.register',
            data: {
                username: username,
                pass: password,
                name: name,
                email: email
            }
        }).then(response => {
            console.log(response)
            return callback(response)
        }).catch(function (message) {
            console.log(message);
        })
    }

    getRoom(callback) {
        axios({
            method: 'GET',
            url: '/rooms.get',
            headers: {
                'X-Auth-Token': sessionStorage.getItem("authToken"),
                'X-User-Id': sessionStorage.getItem("userId")
            }
        }).then(response => {
            console.log(response.data.update)
            return callback(response.data.update)
        })
            .catch(function (message) {
                console.log(message);
            })
    }

    sendMess(authToken, userID, roomID, msg, callback) {
        axios({
            method: 'POST',
            url: '/chat.sendMessage',
            headers: {
                'X-Auth-Token': authToken,
                'X-User-Id': userID
            },
            data: {
                message: {
                    rid: roomID,
                    msg: msg
                }
            }
        }).then(response => {
            console.log(response)
            return callback(response)
        }).catch(function (message) {
            console.log(message);
        })
    }

    createChannel(authToken, userID, channelName, callback) {
        axios({
            method: 'POST',
            url: '/channels.create',
            headers: {
                'X-Auth-Token': authToken,
                'X-User-Id': userID
            },
            data: {
                name: channelName
            }
        }).then(response => {
            console.log(response)
            return callback(response)
        }).catch(function (message) {
            console.log(message);
        })
    }

    getAllUser(callback) {
        axios({
            method: 'GET',
            url: '/users.list',
            headers: {
                'X-Auth-Token': sessionStorage.getItem('authToken'),
                'X-User-Id': sessionStorage.getItem('userId')
            }
        }).then(response => {
            return callback(response);
        }).catch(function (message) {
            console.log(message);
        })
    }

}

module.exports = new useApi();
