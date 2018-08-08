import React from 'react';
import '../asset/css/style.css'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import LensIcon from '@material-ui/icons/Lens'
import Avatar from "@material-ui/core/Avatar";
import Button from '@material-ui/core/Button';

var api = require('../ctrl/useApi');

class cpmContainsRight_ListFriends extends React.Component {
    constructor(states) {
        super(states);
        this.state = {
            allUser: [],
            userInChannel: [],
            isAllUser: true
        }
        api.getAllUser(response => {
            this.setState({allUser: response.data.result})
        })
    }

    async getUsers() {
        var con = await this.checklogin();

    }

    render() {
        if(this.state.isAllUser){
            return (
                <div>
                    <Button variant="contained" color="primary" onClick={() => this.setState({isAllUser: true })}> All User </Button>
                    <Button variant="contained" color="primary" onClick={() => this.setState({isAllUser: false})}> User in channel </Button>
                    <List component="nav">
                        {this.state.allUser.map(user => (
                            <ListItem button key={`section_${user._id}`}>
                                <ListItemIcon>
                                    <Avatar>H</Avatar>
                                </ListItemIcon>
                                <ListItemText primary={user.username}/>
                                <ListItemIcon>
                                    {user.status == 'online' ? <LensIcon color="secondary"/> : <LensIcon/>}
                                </ListItemIcon>
                            </ListItem>
                        ))}
                    </List>
                </div>
            );
        }
        else{
            if(this.props.userInChannel){
                return (
                    <div>
                        <Button variant="contained" color="primary" onClick={() => this.setState({isAllUser: true })}> All User </Button>
                        <Button variant="contained" color="primary" onClick={() => this.setState({isAllUser: false})}> User in channel </Button>
                        <List component="nav">
                            {this.props.userInChannel.data.members.map(user => (
                                <ListItem button key={`section_${user._id}`}>
                                    <ListItemIcon>
                                        <Avatar>H</Avatar>
                                    </ListItemIcon>
                                    <ListItemText primary={user.username}/>
                                    <ListItemIcon>
                                        {user.status == 'online' ? <LensIcon color="secondary"/> : <LensIcon/>}
                                    </ListItemIcon>
                                </ListItem>
                            ))}
                        </List>
                    </div>
                );
            }
            else{
                return(
                    <div>
                        <Button variant="contained" color="primary" onClick={() => this.setState({isAllUser: true })}> All User </Button>
                        <Button variant="contained" color="primary" onClick={() => this.setState({isAllUser: false})}> User in channel </Button>
                        <List component="nav"/>
                    </div>
                )
            }         
        }
    }
}

export default cpmContainsRight_ListFriends;
