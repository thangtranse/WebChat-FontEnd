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
        this.state = {
            rid:'GENERAL'
        }
        
        this.showRoom(this.props.listgroup)
    }

    showRoom = (listRooms) => {
        let channel = [];
        let group = [];
        let messages = [];

        listRooms.forEach(item => {
            switch (item.t) {
                case 'd':
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
                                <ListItem 
                                    key={item._id} 
                                    id={item._id} 
                                    className="cursor" 
                                    onClick={() => this.props.getChannel(item._id)}
                                >
                                    <Avatar alt="Remy Sharp">T</Avatar>
                                    <ListItemText primary={item.name} id={item._id}/>
                                </ListItem>
                            ))
                        }
                    </ul>
                </li>
                <li key="group">
                    <ul>
                        <ListSubheader>Private Group</ListSubheader>
                        {
                            group.map(item => (
                                <ListItem key={item._id} 
                                className="cursor" 
                                onClick={() => this.props.getChannel(item._id)}
                            >
                                    <Avatar alt="Remy Sharp">T</Avatar>
                                    <ListItemText primary={item.name}/>
                                </ListItem>
                            ))
                        }
                    </ul>
                </li>
                <li key="messages">
                    <ul>
                        <ListSubheader className="textLabel">Direct Messages</ListSubheader>
                        {
                            messages.map(item => (
                                <ListItem 
                                    key={item._id} 
                                    className="cursor" 
                                    onClick={() => this.props.getChannel(item._id)}
                                >
                                    <Avatar alt="Remy Sharp">T</Avatar>
                                    <ListItemText primary={item.name}/>
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