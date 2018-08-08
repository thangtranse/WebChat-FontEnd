import _ from "lodash";
import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LensIcon from "@material-ui/icons/Lens";
import Avatar from "@material-ui/core/Avatar";
import Button from '@material-ui/core/Button';

import "../asset/css/style.css";
var api = require("../ctrl/useApi");

class cpmContainsRight_ListFriends extends React.Component {
    constructor(states) {
        super(states);
        this.state = {
            allUser: [],
            userInChannel: [],
            isAllUser: true
        };
        api.getAllUser(response => {
            this.setState({ allUser: response.data.result });
        });
    }

    async getUsers() {
        var con = await this.checklogin();
    }

    render() {
        const data =
            (this.state.isAllUser && this.state.allUser) ||
            _.get(this.props.userInChannel, "data.members") ||
            [];
        return (
            <div>
                <button onClick={() => this.setState({ isAllUser: true })}>
                    All User
                </button>
                <button onClick={() => this.setState({ isAllUser: false })}>
                    User in channel
                </button>
                <List component="nav">
                    {data.map(user => (
                        <ListItem button key={`section_${user._id}`}>
                            <ListItemIcon>
                                <Avatar>H</Avatar>
                            </ListItemIcon>
                            <ListItemText primary={user.username} />
                            <ListItemIcon>
                                {user.status == "online"
                                    ? <LensIcon color="secondary"/>
                                    : <LensIcon/>
                                }
                            </ListItemIcon>
                        </ListItem>
                    ))}
                </List>
            </div>
        );
    }
}

export default cpmContainsRight_ListFriends;
