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
        }

        // this.showRoom(this.props.listgroup)
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
            <List subheader={<li />} className="cmpListGroup">
                <li key="channel">
                    <ul>
                        <ListSubheader>Channel</ListSubheader>
                        {
                            channel.map(item => (
                                <ListItem
                                    key={item._id}
                                    id={item._id}
                                    className="cursor group"
                                    onClick={() => this.props.getChannel(item._id, item.name)}
                                >
                                    <Avatar alt="Remy Sharp">T</Avatar>
                                    <ListItemText primary={item.name} id={item._id} />
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
            <Grid container spacing={0} className="scrollbar" >
                <Grid item xs={12}>
                    {this.showRoom(this.props.listgroup)}
                </Grid>
            </Grid>
        );
    }
}

export default cpmListGroup;
