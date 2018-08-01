import React from 'react';
import '../asset/css/style.css';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import NavigationIcon from '@material-ui/icons/Navigation';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';

var api = require('../ctrl/useApi');

class cpmBoxInfo extends React.Component {
    constructor() {
        super();
        this.state = {
            open: true,
            username: "",
            password: "",
            userId: "",
            authToken: "",
            isLogin: false
        }
        this.inputChange = this.inputChange.bind(this);
        this.login = this.login.bind(this);
    }

    login() {
        api.login(this.state.username, this.state.password, response => {
            this.setState({
                open: false,
                name: response.data.data.me.name,
                userId: response.data.data.userId,
                authToken: response.data.data.authToken,
                isLogin: true,
            });
        });
    }

    inputChange(event) {
        console.log(event.target.id)
        this.setState({
            username: event.target.id == 'username' ? event.target.value : this.state.username,
            password: event.target.id == 'password' ? event.target.value : this.state.password
        });
    }

    render() {
        return (
            <Grid container spacing={0} className="cpmBoxInfo">
                <Grid item xs={12}>
                    <Grid container>
                        <div className={this.state.open == true ? "disable" : "elemtfloat"}>
                            <Avatar className="imgBoxInfo">T</Avatar>
                            <label className="textUser">{this.state.name}</label>
                        </div>
                        <Button variant="extendedFab" aria-label="Delete"
                                className={this.state.open == false ? "disable" : ""}>
                            <NavigationIcon/>
                            Đăng Nhập
                        </Button>
                    </Grid>
                </Grid>
                <Dialog
                    open={this.state.open}
                    TransitionComponent={Transition}
                    keepMounted
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description">
                    <div className="boxLogin">
                        <DialogContentText style={{textAlign: 'center'}}
                                           id="alert-dialog-slide-description">
                            <h1>Đăng Nhập</h1>
                            <TextField
                                id="username"
                                label="Username"
                                margin="normal"
                                onChange={this.inputChange}/>
                            <TextField
                                onChange={this.inputChange}
                                id="password"
                                label="Password"
                                type="password"
                                margin="normal"/>
                        </DialogContentText>
                    </div>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Đăng ký
                        </Button>
                        <Button onClick={this.login} color="primary">
                            Đăng nhập
                        </Button>
                    </DialogActions>
                </Dialog>
                <Grid item xs={12}>
                    <IconButton aria-label="Delete">
                        <DeleteIcon/>
                    </IconButton>
                    <IconButton aria-label="Delete" disabled color="primary">
                        <DeleteIcon/>
                    </IconButton>
                    <IconButton color="secondary" aria-label="Add an alarm">
                        <Icon>alarm</Icon>
                    </IconButton>
                    <IconButton color="primary" aria-label="Add to shopping cart">
                        <AddShoppingCartIcon/>
                    </IconButton>
                </Grid>
            </Grid>
        );
    }
}

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

export default cpmBoxInfo;