import React from 'react';
import './asset/css/style.css';
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import firebase from "firebase";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import CpmBoxInfo from './components/cpmBoxInfo';
import CpmListGroup from './components/cpmListGroup';
import CpmContainsRight_ListFriends from './components/cpmContainsRight_ListFriends';
import CpmContainsMiddle_BoxChat from './components/cpmContainsMiddle_BoxChat';

var api = require('./ctrl/useApi');
var managerCache = require('./ctrl/managerCache');
var useApiRealTime = require('./ctrl/useApiRealTime');
var ddpclient;
const drawerWidth = 240;
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
    isConnect: false,
    mobileOpen_left: false,
    mobileOpen_right: false,
    allUser: []
}
// Test
var load = () => `<div>Load</div>`;

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: '100%',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    appBar: {
        marginLeft: drawerWidth,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',

    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.up('md')]: {
            position: 'relative',
        },
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default
    },
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
        this.getAllUser = this.getAllUser.bind(this);

        ddpclient = new useApiRealTime();
    }

    connectDDP = (callback) => {
        if (!this.state.isConnect) {
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

    handleDrawerToggle_left = () => {
        this.setState(state => ({mobileOpen_left: !state.mobileOpen_left}));
    };
    handleDrawerToggle_right = () => {
        this.setState(state => ({mobileOpen_right: !state.mobileOpen_right}));
    };

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
            this.getAllUser();
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
                if (resp.fields.eventName.length > 25) {
                    api.getImHistory(resp.fields.eventName, resp => {
                        this.setState({messHistory: resp})
                    })
                }
                // Channel
                else {
                    api.getChannelMessHistory(resp.fields.eventName, resp => {
                        this.setState({messHistory: resp})
                    })
                }
        }
    }

    getAllUser() {
        api.getAllUser(response => {
            this.setState({allUser: response.data.result});
        });
    }

    getChannel(roomId) {
        this.setState({roomId: roomId})
        this.setState({idApirealtime: newID});


        // Đăng ký Connect
        this.connectDDP(resp => {
            this.msgHandle(resp)
        })

        let newID = ddpclient.subscribelRoom(roomId)

        // Lấy data message
        api.getChannelMessHistory(roomId, resp => {
            console.log(resp)
            this.setState({messHistory: resp})
        })
        // list user trong room
        api.getUserInChannel(roomId, resp => {
            this.setState({userInChannel: resp})
        })
    }

    getDirectRoom = (partnerId) => {
        // Đăng ký Connect
        this.connectDDP(resp => {
            this.msgHandle(resp)
        })

        // tạo phòng chat Direct 
        api.createIM(partnerId, resp => {
            this.setState({roomId: resp.data.room._id})

            let newID = ddpclient.subscribelRoom(resp.data.room._id)
            this.setState({idApirealtime: newID});

            api.getImHistory(resp.data.room._id, resp => {
                this.setState({messHistory: resp})
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
        var uploadTask = storageRef.child(`images/${file.name}`).put(event.target.files[0]);
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
        }, function () {
            console.log("Upload File Error");
        }, () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
                // ddpclient.sendingFile(file.name, file.size, file.type, 'GENERAL', downloadURL, downloadURL);
                api.sendMess(this.state.roomId, downloadURL, resp => {
                    console.log("upload thành công", resp)
                    document.getElementById("textarea").value = ''
                })
            });
        });
    }

    testFunction() {
        ddpclient.subscribeNotifyRoom('GENERAL', sessionStorage.getItem("username"));
    }

    render() {
        const {classes, theme} = this.props;
        if (this.state.isLogin) {
            return (
                <div className={classes.root}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="inherit" aria-label="Open drawer" onClick={this.handleDrawerToggle_left}
                                        className={classes.navIconHide}>
                                <MenuIcon/>
                            </IconButton>
                        </Toolbar>
                        <Typography variant="title" color="inherit" noWrap>
                            Responsive drawer
                        </Typography>
                        <Toolbar>
                            <IconButton color="inherit" aria-label="Open drawer" onClick={this.handleDrawerToggle_right}
                                        className={classes.navIconHide}>
                                <MenuIcon/>
                            </IconButton>
                        </Toolbar>
                    </AppBar>

                    <Hidden mdUp>
                        <Drawer variant="temporary" anchor={'left'} open={this.state.mobileOpen_left}
                                onClose={this.handleDrawerToggle_left}
                                classes={{paper: classes.drawerPaper,}}
                                ModalProps={{keepMounted: true,}}>
                            <div className="colorbackground_blue leftBox">
                                <CpmBoxInfo infor={this.state}></CpmBoxInfo>
                                <CpmListGroup listgroup={this.state.listGroup}
                                              getChannel={this.getChannel}></CpmListGroup>
                            </div>
                        </Drawer>
                    </Hidden>
                    <Hidden smDown implementation="css">
                        <Drawer variant="permanent" open classes={{paper: classes.drawerPaper,}}>
                            <div className="colorbackground_blue leftBox">
                                <CpmBoxInfo infor={this.state}></CpmBoxInfo>
                                <CpmListGroup listgroup={this.state.listGroup}
                                              getChannel={this.getChannel}></CpmListGroup>
                            </div>
                        </Drawer>
                    </Hidden>

                    <main className={classes.content}>
                        <CpmContainsMiddle_BoxChat uploadFile={this.uploadFile} rid={this.state.roomId}
                                                   messHistory={this.state.messHistory}/>
                    </main>

                    <Hidden mdUp>
                        <Drawer
                            variant="temporary"
                            anchor={'right'}
                            open={this.state.mobileOpen_right}
                            onClose={this.handleDrawerToggle_right}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            <div className="colorbackground_silver">
                                <CpmContainsRight_ListFriends userInChannel={this.state.userInChannel}
                                                              allUser={this.state.allUser}/>
                            </div>
                        </Drawer>
                    </Hidden>
                    <Hidden smDown implementation="css">
                        <div className="colorbackground_silver">
                            <Drawer variant="permanent" open classes={{paper: classes.drawerPaper,}}>
                                <CpmContainsRight_ListFriends userInChannel={this.state.userInChannel}
                                                              allUser={this.state.allUser}/>
                            </Drawer>
                        </div>
                    </Hidden>

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
                                       onChange={this.inputChange}/>
                            <TextField onChange={this.inputChange}
                                       id="password"
                                       label="Password"
                                       type="password"
                                       ref="password"
                                       margin="normal"/>
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

App.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(App);
