import React from 'react';
import '../asset/css/style.css'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import LensIcon from '@material-ui/icons/Lens'
import Avatar from "@material-ui/core/Avatar";

var api = require('../ctrl/useApi');

class cpmContainsRight_ListFriends extends React.Component {
    constructor(states) {
        super(states);
        this.state = {
            listFriends: [
                {name: 'Thắng', status: 'online', id: '1'},
                {name: 'Đẹp', status: 'offline', id: '2'},
                {name: 'vl', status: 'busy', id: '3'}
            ]
        }
    }

    checklogin() {
        api.getAllUser(response => {
            console.log("oke", response);
            return response;
        })
    }

    async getUsers() {
        var con = await this.checklogin();

    }

    render() {
        return (
            <List component="nav">
                {this.state.listFriends.map(infoFriend => (
                    <ListItem button key={`section_${infoFriend.id}`}>
                        <ListItemIcon>
                            <Avatar>H</Avatar>
                        </ListItemIcon>
                        <ListItemText primary={infoFriend.name}/>
                        <ListItemIcon>
                            {infoFriend.name == 'online' ? <LensIcon color="secondary"/> : <LensIcon/>}
                        </ListItemIcon>
                    </ListItem>
                ))}
            </List>
        );
    }
}

export default cpmContainsRight_ListFriends;
