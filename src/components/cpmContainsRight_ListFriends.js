import _ from "lodash";
import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LensIcon from "@material-ui/icons/Lens";
import Avatar from "@material-ui/core/Avatar";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ListSubheader from '@material-ui/core/ListSubheader';
import "../asset/css/style.css";

var api = require("../ctrl/useApi");

class cpmContainsRight_ListFriends extends React.Component {
    constructor(states) {
        super(states);
        this.state = {
            allUser: [],
            userInChannel: [],
            isAllUser: true,
            value: 0
        };
        api.getAllUser(response => {
            this.setState({ allUser: response.data.result });
        });
    }

    async getUsers() {
        // var con = await this.checklogin();
    }

    handleChange = () => {
        this.setState({ value: this.state.value == 1 ? 0 : 1 });
    };

    render() {
        const data = (this.state.isAllUser && this.state.allUser) || _.get(this.props.userInChannel, "data.members") || [];
        return (
            <div>
                <List component="nav">
                    <ListSubheader> <BottomNavigation value={this.state.value} onChange={this.handleChange} showLabels className="colorbackground_silver navColor">
                        <BottomNavigationAction label="All" icon={<RestoreIcon />} onClick={() => this.setState({ isAllUser: true })} />
                        <BottomNavigationAction label="Room" icon={<FavoriteIcon />} onClick={() => this.setState({ isAllUser: false })} />
                    </BottomNavigation></ListSubheader>
                    {data.map(user => (
                        <ListItem onClick={()=>this.props.getDirectRoom(user._id)} button key={`section_${user._id}`} className="listfriends">
                            <ListItemIcon>
                                <Avatar className="avatart">H</Avatar>
                            </ListItemIcon>
                            <ListItemText primary={user.username} className="username" />
                            <ListItemIcon className="status">
                                {user.status == "online"
                                    ? <LensIcon color="secondary" />
                                    : <LensIcon />
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
