import React from 'react';
import './asset/css/style.css';
import Grid from '@material-ui/core/Grid';
import CpmContainsLeft from './components/cpmContainsLeft';
import CpmContainsMiddle_BoxChat from './components/cpmContainsMiddle_BoxChat';
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import Loadable from 'react-loadable';

var api = require('./ctrl/useApi');
var managerCache = require('./ctrl/managerCache');

var DDPClient = require("ddp-client");
var ddpclient;

const initState = {
    open: true,
    username: "",
    password: "",
    name: "",
    userId: "",
    authToken: "",
    listGroup: [],
    isLogin: false,
    realtime: {}
}
// Test
var load = () => `<div>Load</div>`;

const CpmContainsRight_ListFriends = Loadable({
    loader: () => import('./components/cpmContainsRight_ListFriends'),
    loading: load,
    timeout: 500000
});

class App extends React.Component {

    constructor() {
        super();
        this.state = initState;
        this.inputChange = this.inputChange.bind(this);
        this.login = this.login.bind(this);
        this.getRoom = this.getRoom.bind(this);
        this.btnThu = this.btnThu.bind(this);

        ddpclient = new DDPClient({
            // All properties optional, defaults shown
            host: "https://ten-lua.herokuapp.com",
            port: 7677,
            ssl: false,
            autoReconnect: true,
            autoReconnectTimer: 500,
            maintainCollections: true,
            ddpVersion: '1',  // ['1', 'pre2', 'pre1'] available
            // uses the SockJs protocol to create the connection
            // this still uses websockets, but allows to get the benefits
            // from projects like meteorhacks:cluster
            // (for load balancing and service discovery)
            // do not use `path` option when you are using useSockJs
            useSockJs: true,
            // Use a full url instead of a set of `host`, `port` and `ssl`
            // do not set `useSockJs` option if `url` is used
            url: 'wss://ten-lua.herokuapp.com/websocket'
        });

        ddpclient.connect((error, wasReconnect) => {
            // If autoReconnect is true, this callback will be invoked each time
            // a server connection is re-established
            if (error) {
                console.log('DDP connection error!');
                return;
            }

            if (wasReconnect) {
                console.log('Reestablishment of a connection.');
            }

            console.log('connected!');

        }); // Clone connects
    }

    // Nhận sự kiện onChange
    inputChange(event) {
        console.log(event.target.id)
        this.setState({
            username: event.target.id == 'username' ? event.target.value : this.state.username,
            password: event.target.id == 'password' ? event.target.value : this.state.password
        });
    }

    login() {
        api.login(document.getElementById("username").value, document.getElementById("password").value, response => {
            ddpclient.call(
                'login',             // name of Meteor Method being called
                [
                    { "resume": response.data.data.authToken }
                ],            // parameters to send to Meteor Method
                (err, result) => {   // callback which returns the method call results
                    if (err) {
                        console.log("Looix ow day: ", err);
                    } else {
                        this.setState({
                            realtime: result
                        });
                        console.log('Regiter Comple: ', result);

                        ddpclient.subscribe(
                            'posts',                  // name of Meteor Publish function to subscribe to
                            [
                                {
                                    "msg": "sub",
                                    "id": result.id,
                                    "name": "onpoen",
                                    "params": ["event", false]
                                }
                            ],                       // any parameters used by the Publish function
                            function () {             // callback when the subscription is complete
                                console.log('1122 posts complete:');
                            }
                        );

                    }
                },
                () => {              // callback which fires when server has finished
                    console.log('updated');  // sending any updated documents as a result of
                    console.log('chajy ngay di: ', ddpclient.host);  // calling this method
                }
            );
            this.setState({
                open: false,
                name: response.data.data.me.name,
                userId: response.data.data.userId,
                authToken: response.data.data.authToken,
                isLogin: true
            });
            sessionStorage.setItem('authToken', response.data.data.authToken);
            sessionStorage.setItem('userId', response.data.data.userId);
            sessionStorage.setItem('username', response.data.data.me.username);
            sessionStorage.setItem('name', response.data.data.me.name);
            // Lấy danh sách phòng
            this.getRoom();

        });
    }

    getRoom() {
        api.getRoom(request => {
            this.setState({
                listGroup: request
            })
        })
    }

    componentWillMount() {
        if (managerCache.checkSession()) {
            this.setState({
                open: false,
                username: sessionStorage.getItem("username"),
                password: "",
                name: sessionStorage.getItem("name"),
                userId: sessionStorage.getItem("userId"),
                authToken: sessionStorage.getItem("authToken"),
                isLogin: true
            })
            this.getRoom();
        }
    }

    btnThu() {
        console.log(this.state._id);
        // ddpclient.subscribe("stream-room-messages",
        //     [{
        //         "msg": "method",
        //         "id": "42",
        //         "method": "createPrivateGroup",
        //         "params": ["example-private-room", [], false]
        //     }],
        //     function () {
        //         console.log(ddpclient.collections);
        //         console.log("Subscription Complete.\n");
        //         // Display the stream on console so we can see its working
        //         console.log("\nStarting live-stream of messages.:\n");
        //         ddpclient.on("message", function (msg) {
        //             console.log("Subscription Msg 12 : " + msg);
        //         });

        //     }
        // )

        ddpclient.subscribe("stream-room-messages",
            [
                
                        "BuNa5dsqtTehuNErR",
                        false
                
            ],
            function () {
                console.log(ddpclient.collections);
                console.log("Subscription Complete.\n");
                // Display the stream on console so we can see its working
                console.log("\nStarting live-stream of messages.:\n");

                ddpclient.on("message", function (msg) {
                    console.log("Subscription Msg 12 : " + msg);
                });

            }
        )
    }



    render() {
        var observer = ddpclient.observe("posts");
        observer.onpoen = function (id) {
            console.log("[ADDED] to " + observer.name + ":  " + id);
        };
        return (
            <div>
                <Grid>
                    <Button onClick={this.btnThu}>RUN websocket</Button>
                </Grid>
                <Grid container spacing={0}>
                    <Grid item xs={2} className="colorbackground_blue leftBox">
                        <CpmContainsLeft container={this.state} rooms={this.state.listGroup} />
                    </Grid>
                    <Grid item xs={8}>
                        <CpmContainsMiddle_BoxChat />
                    </Grid>
                    <Grid item xs={2} className="colorbackground_silver">
                        <CpmContainsRight_ListFriends />
                    </Grid>
                </Grid>
                <Dialog open={this.state.open}
                    TransitionComponent={Transition}
                    keepMounted
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description">
                    <div className="boxLogin">
                        <DialogContentText style={{ textAlign: 'center' }} id="alert-dialog-slide-description">
                            <h1> Đăng Nhập </h1>
                            <TextField id="username"
                                label="Username"
                                margin="normal"
                                onChange={this.inputChange} />
                            <TextField onChange={this.inputChange}
                                id="password"
                                label="Password"
                                type="password"
                                ref="password"
                                margin="normal" />
                        </DialogContentText>
                    </div>
                    <DialogActions>
                        <Button onClick={this.handleClose}
                            color="primary"> Facebook </Button>
                        <Button onClick={this.handleClose} color="primary">Đăng ký </Button>
                        <Button onClick={this.login} color="primary"> Đăng nhập </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

export default App;
