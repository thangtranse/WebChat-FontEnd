import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import FacebookButton from "./FacebookButton";

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.FB = window.FB;
        this.onLogin = this.onLogin.bind(this)
    }

    onLogin(response) {
        console.log(response);
        // this.FB.api('me', response => console.log(response))
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
                        style={{ paddingLeft: '15px', paddingRight: '15px' }}>
                        <h1> Đăng Nhập </h1>
                        <TextField
                            id="username"
                            label="Username"
                            margin="normal"
                            onChange={this.props.onChange}
                        />
                        <TextField
                            id="password"
                            label="Password"
                            onChange={this.props.onChange}
                            margin="normal"
                            type="password"
                            ref="password"
                        />
                        <DialogActions>
                            <FacebookButton onLogin={this.props.onFBLogin}/>
                            <Button onClick={this.props.onLogin} color="primary">
                                Đăng nhập
                            </Button>
                        </DialogActions>
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default Login;
