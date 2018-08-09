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
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
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
    isConnect: false
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
        this.uploadFile = this.uploadFile.bind(this);

        ddpclient = new useApiRealTime();
    }

    connectDDP = (callback) => {
        if (!this.state.isConnect){
            ddpclient.login(sessionStorage.getItem("authToken"), (err, result) => {
                if (err) {
                    console.log("Login Realtime Fail ", err);
                } else {
                    console.log("Realtime Direct running ", result);
                }
            });
            this.setState({isConnect: true})
            ddpclient.subscribeNotifyUser(sessionStorage.getItem("userId"));
            ddpclient.listen((resp) => {
                console.log(resp)
                let temp = JSON.parse(resp)
                return callback(temp)
            });
        }
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
                // Direct 
                if(resp.fields.eventName.length > 25){
                    api.getImHistory(resp.fields.eventName, resp => {
                        this.setState({ messHistory: resp })
                    })
                }
                // Channel
                else{
                    api.getChannelMessHistory(resp.fields.eventName, resp => {
                        this.setState({ messHistory: resp })
                    })
                }
        }
    }

    getChannel(roomId) {
        this.setState({ roomId: roomId })
        this.setState({ idApirealtime: newID });
        
        // Đăng ký Connect
        this.connectDDP(resp => {
            this.msgHandle(resp)
        })        
        
        let newID = ddpclient.subscribelRoom(roomId)

        // Lấy data message
        api.getChannelMessHistory(roomId, resp => {
            console.log(resp)
            this.setState({ messHistory: resp })
        })
        // list user trong room
        api.getUserInChannel(roomId, resp => {
            this.setState({ userInChannel: resp })
        })
    }

    getDirectRoom = (partnerId) => {
        // Đăng ký Connect
        this.connectDDP(resp => {
            this.msgHandle(resp)
        }) 

        // tạo phòng chat Direct 
        api.createIM(partnerId, resp => {
            this.setState({ roomId: resp.data.room._id })

            let newID = ddpclient.subscribelRoom(resp.data.room._id)
            this.setState({ idApirealtime: newID });

            api.getImHistory(resp.data.room._id, resp=>{
                this.setState({ messHistory: resp })
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

    uploadFile(event) {
        console.log(event.target.files[0]);
        var file = event.target.files[0];
        var storageRef = firebase.storage().ref();
        var uploadTask = storageRef.child('images/rivers.jpg').put(event.target.files[0]);
        uploadTask.on('state_changed', (snapshot) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING:
                    console.log('Upload is running');
                    break;
            }
        }, function (error) {
            console.log("Upload File Error");
        }, () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                // console.log('File available at', downloadURL);
                // ddpclient.sendingFile(file.name, file.size, file.type, 'GENERAL', downloadURL, downloadURL);
                api.sendMess(this.state.roomId, downloadURL, resp => {
                    console.log(resp)
                    document.getElementById("textarea").value = ''
                })
            });
        });
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
                            <CpmContainsMiddle_BoxChat uploadFile={this.uploadFile} rid={this.state.roomId} messHistory={this.state.messHistory} />
                        </Grid>
                        <Grid item xs={2} className="colorbackground_silver">
                        <CpmContainsRight_ListFriends userInChannel={this.state.userInChannel} allUser={this.state.allUser} getDirectRoom={this.getDirectRoom}/>
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
