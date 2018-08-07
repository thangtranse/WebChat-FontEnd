import React from 'react';
import './asset/css/style.css';
import Grid from '@material-ui/core/Grid';
import CpmContainsMiddle_BoxChat from './components/cpmContainsMiddle_BoxChat';
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import Loadable from 'react-loadable';

import CpmListGroup from './components/cpmListGroup';
import CpmBoxInfo from "./components/cpmBoxInfo";
var api = require('./ctrl/useApi');
var managerCache = require('./ctrl/managerCache');
var useApiRealTime = require('./ctrl/useApiRealTime');
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
    messHistory: null,
    userInChannel: null,
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
        this.getChannel = this.getChannel.bind(this);

        ddpclient = new useApiRealTime();
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

            // // Đăng ký Connect
            // ddpclient.login(sessionStorage.getItem('authToken'), (err, result) => {
            //     if (err) {
            //         console.log("Login Realtime Fail ", err);
            //     } else {
            //         console.log("Realtime running ", result);
            //     }
            // });

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

    msgHandle = (resp) => {
        switch (resp.msg) {
            case "changed":
                api.getChannelMessHistory(resp.fields.eventName, resp => {
                    this.setState({ messHistory: resp })
                })
        }
    }

    getChannel(roomId) {
        this.setState({ roomId: roomId })

        let newID = ddpclient.subscribelRoom(roomId)

        this.setState({ idApirealtime: newID });

        // Đăng ký Connect
        ddpclient.login(sessionStorage.getItem('authToken'), (err, result) => {
            if (err) {
                console.log("Login Realtime Fail ", err);
            } else {
                console.log("Realtime running ", result);
            }
        });

        ddpclient.listen((resp) => {
            console.log(resp)
            let temp = JSON.parse(resp)
            this.msgHandle(temp)
        });

        // Lấy data message
        api.getChannelMessHistory(roomId, resp => {
            this.setState({ messHistory: resp })
        })
        // list user trong room
        api.getUserInChannel(roomId, resp => {
            this.setState({ userInChannel: resp })
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

    render() {

        if (this.state.isLogin) {
            return (
                <div>
                    <Grid container spacing={0}>
                        <Grid item xs={2} className="colorbackground_blue leftBox">

                            <CpmBoxInfo infor={this.state} ></CpmBoxInfo>
                            <CpmListGroup listgroup={this.state.listGroup} getChannel={this.getChannel}></CpmListGroup>
                        </Grid>
                        <Grid item xs={8}>
                            <CpmContainsMiddle_BoxChat rid={this.state.roomId} messHistory={this.state.messHistory} />
                        </Grid>
                        <Grid item xs={2} className="colorbackground_silver">
                            <CpmContainsRight_ListFriends userInChannel={this.state.userInChannel} allUser={this.state.allUser} />
                        </Grid>
                    </Grid>
                </div>
            )
        }
        else {
            return (
                <div>
                    <Dialog open={this.state.open}
                        TransitionComponent={Transition}
                        keepMounted>
                        <div className="boxLogin">
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
                        </div>
                        <DialogActions>
                            <Button onClick={this.login} color="primary"> Đăng nhập </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            )
        }
    }
}

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

export default App;
