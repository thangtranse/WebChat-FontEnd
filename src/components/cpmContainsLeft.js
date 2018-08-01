import React from 'react';
import '../asset/css/style.css'
import Grid from '@material-ui/core/Grid';
import CpmListGroup from './cpmListGroup';
import CpmBoxInfo from "./cpmBoxInfo";

class cpmContainsLeft extends React.Component {
    constructor() {
        super();
        this.state = {
            listGroup: [
                {name: "channel", list: [{name: "channel_1", _id: "123", ts: "thời gian tạo", usernames: ['']}]},
                {name: "groups", list: [{name: "group_1", _id: "123", ts: "thời gian tạo", usernames: ['']}]},
                {name: "messages", list: [{name: "messages_1", _id: "123", ts: "thời gian tạo", usernames: ['']}]}
            ]
        }
    }

    render() {
        return (
            <div>
                <CpmBoxInfo></CpmBoxInfo>
                <CpmListGroup listgroup={this.state.listGroup}></CpmListGroup>
            </div>
        );
    }
}

export default cpmContainsLeft;