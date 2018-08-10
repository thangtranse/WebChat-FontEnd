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
    }

    handleChange = (event, value) => {
        this.setState({ value: value });
    };

    render() {
        const { value } = this.state.value;
        const data = (this.state.isAllUser && this.state.allUser) || _.get(this.props.userInChannel, "data.members") || [];
        return (
            <div>
                <BottomNavigation value={this.state.value} onChange={this.handleChange} showLabels
                                  className="colorbackground_silver navColor">
                    <BottomNavigationAction label="All" icon={<RestoreIcon/>}/>
                    <BottomNavigationAction label="Room" icon={<FavoriteIcon/>}/>
                </BottomNavigation>

                <List component="nav">
                    {data.map(user => (
                        <ListItem onClick={() => this.props.getDirectRoom(user._id)} button key={`section_${user._id}`}
                                  className="listfriends">
                            <ListItemIcon>
                                <Avatar className="avatart">H</Avatar>
                            </ListItemIcon>
                            <ListItemText primary={user.username} className="username"/>
                            <ListItemIcon className="status">
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
