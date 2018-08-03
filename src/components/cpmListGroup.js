import React from 'react';
import '../asset/css/style.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

class cpmListGroup extends React.Component {
    constructor(props) {
        super(props);
        this.clickRoom = this.clickRoom.bind(this);
    }

    clickRoom(event) {
        console.log(event.target)
    }

    showRoom = (listRooms) => {
        let channel = [];
        let group = [];
        let messages = [];

        listRooms.forEach(item => {
            switch (item.t) {
                case 'd':
                    console.log(item);
                    messages.push(item);
                    break;
                case 'c':
                    channel.push(item);
                    break;
                case 'p':
                    group.push(item);
                    break;
            }
        })

        return (
            <List subheader={<li/>} className="cmpListGroup">
                <li key="channel">
                    <ul>
                        <ListSubheader>Channel</ListSubheader>
                        {
                            channel.map(item => (
                                <ListItem key={item._id} id={item._id} onClick={this.clickRoom} className="cursor">
                                    {console.log(item)}
                                    <Avatar alt="Remy Sharp">T</Avatar>
                                    <ListItemText primary={item.name} id={item._id}/>
                                </ListItem>
                            ))
                        }
                    </ul>
                </li>
                <li key="group">
                    <ul>
                        <ListSubheader>Group</ListSubheader>
                        {
                            group.map(item => (
                                <ListItem key={item._id} className="cursor">
                                    <Avatar alt="Remy Sharp">T</Avatar>
                                    <ListItemText primary={item.name}/>
                                </ListItem>
                            ))
                        }
                    </ul>
                </li>
                <li key="messages">
                    <ul>
                        <ListSubheader className="textLabel">Messages</ListSubheader>
                        {
                            messages.map(item => (
                                <ListItem key={item.lastMessage.u._id} className="cursor">
                                    <Avatar alt="Remy Sharp">T</Avatar>
                                    <ListItemText primary={item.lastMessage.u.name}/>
                                </ListItem>
                            ))
                        }
                    </ul>
                </li>
            </List>
        )
    }

    render() {
        return (
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    {this.showRoom(this.props.listgroup)}
                </Grid>
            </Grid>
        );
    }
}

export default cpmListGroup;