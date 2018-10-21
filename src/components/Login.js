import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import BtnFacebook from "./btnFacebook";
import BtnGoogle from "./btnGoogle";
import BtnTelegram from "./btnTelegram";
import Avatar from "@material-ui/core/Avatar";

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.FB = window.FB;
        this.onLogin = this.onLogin.bind(this)
        this.state = {
            username: "",
            password: ""
        }
    }

    onLogin(response) {
        console.log(response);
        // this.FB.api('me', response => console.log(response))
    }

    onKeyDown(key, e) {
        switch (e.keyCode) {
            case 13:
                if (key)
                    $('#password').focus()
                else
                    this.props.onLogin()
                break;
        }
    }

    render() {
        // this.FB.getLoginStatus(x => console.log("HERE", x));
        return (
            <div>
                <Dialog
                    keepMounted
                    open={this.props.open}
                    TransitionComponent={Transition}
                >
                    <div className="boxLogin"
                        style={{ minWidth: "350px", textAlign: 'center', paddingLeft: '30px', paddingRight: '30px' }}>
                        <Avatar alt="Remy Sharp" src="images/logo-fpt-cycle.png" style={{
                            width: "100px",
                            height: "100px",
                            margin: "0 auto"
                        }} />
                        <TextField
                            id="username"
                            label="Username"
                            margin="normal"
                            onChange={this.props.onChange}
                            onKeyDown={(e) => this.onKeyDown(true, e)}
                        />
                        <TextField
                            id="password"
                            label="Password"
                            onChange={this.props.onChange}
                            margin="normal"
                            type="password"
                            onKeyDown={(e) => this.onKeyDown(false, e)}
                        />
                        <DialogActions style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}>
                            <Button onClick={this.props.onLogin} color="primary" style={{
                                height: "50px",
                                textAign: "center",
                                minWidth:"50%"
                            }}>
                                Register
                            </Button>
                            <Button onClick={this.props.onLogin} color="primary" style={{
                                height: "50px",
                                textAign: "center",
                                minWidth:"50%"
                            }}>
                                Login
                            </Button>
                        </DialogActions>
                        <hr width="40%" style={{opacity: 0.2}}></hr>
                        <DialogActions style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center"
                        }}>
                            <BtnFacebook onLogin={this.props.onFBLogin} />
                            <BtnGoogle />
                        </DialogActions>
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default Login;
