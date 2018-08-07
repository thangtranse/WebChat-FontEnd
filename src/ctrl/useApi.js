
{/*
    List api:
        1/ Authentication
            - Login
            - logout
            - register: mặc định là user
        2/ Rooms:
            - getRoom: lấy ra danh sách room đã được add

        3/ Channels:
            - creatChannel
            - getUserInChannel
            - getChannelMessHistory

        4/ Private Groups:


        5/ Messages:
            - sendMess
*/}

var axios = require('./request_api_rocket');

class useApi {

    // 1. Authentication
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

    logout() {
        axios({
            method: 'POST',
            url: '/logout',
            headers: {
                'X-Auth-Token': sessionStorage.getItem("authToken"),
                'X-User-Id': sessionStorage.getItem("userId")
            }
        }).then(response => {
            sessionStorage.clear();
            window.location.reload();
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
            return callback(response)
        }).catch(function (message) {
            console.log(message);
        })
    }


    // 2. Rooms
    getRoom(callback) {
        axios({
            method: 'GET',
            url: '/rooms.get',
            headers: {
                'X-Auth-Token': sessionStorage.getItem("authToken"),
                'X-User-Id': sessionStorage.getItem("userId")
            }
        }).then(response => {
            return callback(response.data.update)
        })
            .catch(function (message) {
                console.log(message);
            })
    }


    // 3. Channels
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
            return callback(response)
        }).catch(function (message) {
            console.log(message);
        })
    }

    getUserInChannel(roomID, callback) {
        axios({
            method: 'GET',
            url: '/channels.members?roomId=' + roomID,
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

    getAllUser(callback) {
        axios({
            method: 'GET',
            url: '/directory?query={"type": "users"}',
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

    getChannelMessHistory(roomID, callback) {
        axios({
            method: 'GET',
            url: '/channels.history?roomId=' + roomID,
            headers: {
                'X-Auth-Token': sessionStorage.getItem('authToken'),
                'X-User-Id': sessionStorage.getItem('userId')
            }
        }).then(response => {
            return callback(response)
        })
            .catch(function (message) {
                console.log(message);
            })
    }

    // 4. Private Groups

    getGroupMessHistory(roomID, callback) {
        axios({
            method: 'GET',
            url: '/groups.history?roomId=' + roomID,
            headers: {
                'X-Auth-Token': sessionStorage.getItem('authToken'),
                'X-User-Id': sessionStorage.getItem('userId')
            }
        }).then(response => {
            return callback(response)
        })
            .catch(function (message) {
                console.log(message);
            })
    }

    getUserInGroup(roomID, callback) {
        axios({
            method: 'GET',
            url: '/channels.members?roomId=' + roomID,
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

    // 5.  Messages
    sendMess(roomID, msg, callback) {
        axios({
            method: 'POST',
            url: '/chat.sendMessage',
            headers: {
                'X-Auth-Token': sessionStorage.getItem('authToken'),
                'X-User-Id': sessionStorage.getItem('userId')
            },
            data: {
                message: {
                    rid: roomID,
                    msg: msg
                }
            }
        }).then(response => {
            return callback(response)
        }).catch(function (message) {
            console.log(message);
        })
    }
}

module.exports = new useApi();
