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

import STATUS from "../constant/status";
var api = require("../ctrl/useApi");

class cpmContainsRight_ListFriends extends React.Component {
    constructor(states) {
        super(states);
        this.state = {
            allUser: [],
            userInChannel: [],
            isAllUser: true
        };
        this.fetchInterval = null; //Fetch user interval

        this.handleChange = this.handleChange.bind(this);
        this.showAllUser = this.showAllUser.bind(this);
        this.showChannelUser = this.showChannelUser.bind(this);
    }

    handleChange(event, value) {
        if (value === "all") {
            this.showAllUser();
        } else if (value === "room") {
            this.showChannelUser();
        }
    }

    showAllUser() {
        this.setState({ isAllUser: true });
        const fetch = () =>
            api.getAllUser(response => {
                console.log(response);
                this.setState({ allUser: response.data.users });
            });

        fetch();
        this.fetchInterval = setInterval(fetch, 5000);
    }

    showChannelUser() {
        this.setState({ isAllUser: false });
        this.fetchInterval && clearInterval(this.fetchInterval); //Clear
    }

    componentDidMount() {
        this.showAllUser();
    }

    render() {
        const data =
            (this.state.isAllUser && (this.state.allUser || [])) ||
            _.get(this.props.userInChannel, "data.members") ||
            [];
        return (
            <div>
                <BottomNavigation
                    onChange={this.handleChange}
                    showLabels
                    className="colorbackground_silver navColor"
                >
                    <BottomNavigationAction
                        label="All"
                        value="all"
                        icon={<RestoreIcon />}
                    />
                    <BottomNavigationAction
                        label="Room"
                        value="room"
                        icon={<FavoriteIcon />}
                    />
                </BottomNavigation>

                <List component="nav">
                    {data.map(user => (
                        <ListItem button key={`section_${user._id}`}>
                            <ListItemIcon>
                                <Avatar>H</Avatar>
                            </ListItemIcon>
                            <ListItemText primary={user.name} />
                            <ListItemIcon>
                                <LensIcon
                                    style={{ color: STATUS[user.status] }}
                                />
                            </ListItemIcon>
                        </ListItem>
                    ))}
                </List>
            </div>
        );
    }
}

export default cpmContainsRight_ListFriends;
