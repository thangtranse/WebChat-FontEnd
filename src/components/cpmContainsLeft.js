import React from 'react';
import '../asset/css/style.css'
import CpmListGroup from './cpmListGroup';
import CpmBoxInfo from "./cpmBoxInfo";

var api = require('../ctrl/useApi');
var managerCache = require('../ctrl/managerCache');

class cpmContainsLeft extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listGroup: []
        }
        this.checkLogin = this.checkLogin.bind(this);
        this.checkLogin();
    }

    async checkLogin() {
        var bool = await managerCache.checkSession();
        if (bool) {
            api.getRoom(request => {
                this.setState({
                    listGroup: request
                })
            })
        }
    }

    render() {
        return (
            <div>
                <CpmBoxInfo infor={this.props.container}></CpmBoxInfo>
                <CpmListGroup listgroup={this.state.listGroup}></CpmListGroup>
            </div>
        );
    }
}

export default cpmContainsLeft;
