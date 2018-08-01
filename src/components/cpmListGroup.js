import React from 'react';
import '../asset/css/style.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Grid from '@material-ui/core/Grid';

class cpmListGroup extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <List subheader={<li/>} className="cmpListGroup">
                        {this.props.listgroup.map(parent => (
                            <li key={`section-${parent.name}`}>
                                <ul>
                                    <ListSubheader>{parent.name}</ListSubheader>
                                    {parent.list.map(item => (
                                        <ListItem key={`item-${parent.name}-${item.name}`}>
                                            <ListItemText primary={`Item ${item.name}`}/>
                                        </ListItem>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </List>
                </Grid>
            </Grid>
        );
    }
}

export default cpmListGroup;