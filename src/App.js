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

const initState = {
    open: true,
    username: "",
    password: "",
    name: "",
    userId: "",
    authToken: "",
    listGroup: [],
    isLogin: false
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


    render() {
        return (
            <div>
                <Grid container spacing={0}>
                    <Grid item xs={2} className="colorbackground_blue leftBox">
                        <CpmContainsLeft container={this.state} rooms={this.state.listGroup}/>
                    </Grid>
                    <Grid item xs={8}>
                        <CpmContainsMiddle_BoxChat/>
                    </Grid>
                    <Grid item xs={2} className="colorbackground_silver">
                        <CpmContainsRight_ListFriends/>
                    </Grid>
                </Grid>
                <Dialog open={this.state.open}
                        TransitionComponent={Transition}
                        keepMounted
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description">
                    <div className="boxLogin">
                        <DialogContentText style={{textAlign: 'center'}} id="alert-dialog-slide-description">
                            <h1> Đăng Nhập </h1>
                            <TextField id="username"
                                       label="Username"
                                       margin="normal"
                                       onChange={this.inputChange}/>
                            <TextField onChange={this.inputChange}
                                       id="password"
                                       label="Password"
                                       type="password"
                                       ref="password"
                                       margin="normal"/>
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
    return <Slide direction="up" {...props}/>;
}

export default App;
