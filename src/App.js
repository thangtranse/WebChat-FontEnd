import React from 'react';
import './asset/css/style.css'
import Grid from '@material-ui/core/Grid';
import CpmContainsLeft from './components/cpmContainsLeft'
import CpmContainsRight_ListFriends from './components/cpmContainsRight_ListFriends'
import CpmContainsMiddle_BoxChat from './components/cpmContainsMiddle_BoxChat'

var api = require('./ctrl/useApi');

class App extends React.Component {


    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            name: '',
            userId: '',
            authToken: '',
            isLogin: false,
            isRegister: false,
            email:'',
            messages: []
        }
    }

    // render login form or user info
    loginForm = () => {
        if(this.state.isLogin){
            return(
                <div>
                    <p>{this.state.name}</p>
                    <p>Auth Token: {this.state.authToken}</p>
                    <p>User Id: {this.state.userId}</p>
                    <button onClick={this.logout}> Logout </button>
                </div>
            )
        }
        else{
            return(
                <form>
                    <input type="text" name="username" placeholder="Your ID" value={this.state.username} onChange={this.actionChangeText}/>
                    <input type="password" name="password" placeholder="Your Password" value={this.state.password} onChange={this.actionChangeText}/>
                    <button type="button" onClick={this.login}> Login </button>
                    <button type="button" onClick={() => this.setState({isRegister: true})} style={{marginLeft: 20}}> Register </button>
                </form>
            )
        }
    }

    // Function login use login api
    login = () => {
        api.login(this.state.username, this.state.password, response => {
            this.setState({
                name: response.data.data.me.name,
                userId: response.data.data.userId,
                authToken: response.data.data.authToken,
                isLogin: true,
                isRegister: false
            });
        });
    }

    // Function logout use logout api
    logout = () => {
        api.logout(this.state.userId, this.state.authToken, response => {
            this.setState({
                username: '',
                name: '',
                userId: '',
                authToken: '',
                password:'',
                isLogin:false
            })
        });
    }


    // Register if success call login
    register = () => {
        api.register(this.state.username, this.state.password, this.state.name, this.state.email, resp => {
            if(resp.status === 200){
                this.login()
            }
        })
    }

    // get data from form
    actionChangeText = (event) => {
        switch (event.target.name) {
            case 'username':
                this.setState({
                    username: event.target.value
                });
                break;
            case 'password':
                this.setState({
                    password: event.target.value
                });
                break;
            case 'name':
                this.setState({
                    name: event.target.value
                });
                break;
            case 'email':
                this.setState({
                    email: event.target.value
                });
                break;
        }
    }

    // render login form or register form
    authForm = () => {
        if(this.state.isRegister){
            return (
                <div>
                    <form>
                        <label style={{marginRight: 20}}>Username</label>
                        <input type="text" name="username" placeholder="Your ID" value={this.state.username} onChange={this.actionChangeText}/><br/><br/>

                        <label style={{marginRight: 20}}>Password</label>
                        <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.actionChangeText}/><br/><br/>

                        <label style={{marginRight: 20}}>Full Name</label>
                        <input type="text" name="name" placeholder="Full Name" value={this.state.name} onChange={this.actionChangeText}/><br/><br/>

                        <label style={{marginRight: 20}}>Email</label>
                        <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.actionChangeText}/><br/><br/>
                        <button type="button" onClick={this.register}> Register </button>
                    </form>
                </div>
            )
        }
        else{
            return(
                <div>
                    {this.loginForm()}
                </div>
            )
        }
    }


    render() {
        return (
            <div>
                <div>
                    {this.authForm()}
                </div>
                <Grid container spacing={0}>
                    <Grid item xs={2} className="colorbackground_blue leftBox">
                        <CpmContainsLeft/>
                    </Grid>
                    <Grid item xs={8}>
                        <CpmContainsMiddle_BoxChat/>
                    </Grid>
                    <Grid item xs={2} className="colorbackground_silver">
                        <CpmContainsRight_ListFriends/>
                    </Grid>
                </Grid>
            </div>
        );
    }



}

export default App;
