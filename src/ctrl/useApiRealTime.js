var DDPClient = require("ddp-client");
var configs = require("../config.json");
var ddpclient;

class useApiRealTime {

    /**
     * Khởi tạo kết nối với Server Rocket.Chat
     */
    constructor() {
        ddpclient = new DDPClient(configs.server);
        ddpclient.connect((error, wasReconnect) => {
            if (error) {
                console.log('DDP connection error!');
                return;
            }
            if (wasReconnect) {
                console.log('Reestablishment of a connection.');
            }
            console.log('connected!');
        });
    }

    /**
     * Đăng ký kết nối với Server
     * @param {*} _authToken : Token khi Login
     */
    login(_authToken, callback) {
        ddpclient.call('login', [{ "resume": _authToken }], (err, result) => callback(err, result));
    }


    /**
     * Sự kiện lắng nghe
     */
    subscribe(_name, _arrayParameter) {
        ddpclient.subscribe(_name, _arrayParameter);
    }
    /**
     * Lắng nghe Channel General    
     */
    subscribeGenaralRoom() {
        return ddpclient.subscribe("stream-room-messages", ['GENERAL', true]);

    }
    /**
     * Đăng ký lắng nghe ROOM
     */
    subscribelRoom(_roomID) {
        return ddpclient.subscribe("stream-room-messages", [_roomID, true]);
    }

    unSubscriptions(_id){
        ddpclient.subscribe("stream-room-messages", {"msg": "unsub","id": _id});
    }

    listen(callback) {
        ddpclient.on("message", (msg) => callback(msg))
    }

}

module.exports = useApiRealTime;