import React from 'react';
import '../asset/css/style.css';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import CreateNewFolder from '@material-ui/icons/CreateNewFolder';

var api = require('../ctrl/useApi');

class cpmBoxInfo extends React.Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.getProp = this.getProp.bind(this);
        this.getProp();
        this.state = {
            anchorEl: null,
            message:'',
        };
    }

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };


    logout() {
        api.logout();
    }

    getProp() {
        console.log("thangse 2", this.props.infor);
    }

    render() {
        return (
            <Grid container spacing={0} className="cpmBoxInfo">
                <Grid item xs={12}>
                    <Grid container>
                        <div className="elemtfloat">
                            <Avatar className="imgBoxInfo"> T </Avatar>
                            <label className="textUser">
                                {this.props.infor.name}
                            </label>
                        </div>
                        <IconButton
                            aria-owns={this.state.anchorEl ? 'simple-menu' : null}
                            aria-haspopup="true"
                            onClick={this.handleClick}
                        >
                            <ArrowDropDown color="error"/>
                        </IconButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={this.state.anchorEl}
                            open={Boolean(this.state.anchorEl)}
                            onClose={this.handleClose}
                        >
                            <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                            <MenuItem onClick={this.handleClose}>My account</MenuItem>
                            <MenuItem onClick={this.logout}>Logout</MenuItem>
                        </Menu>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container>
                        <div>
                            <IconButton color="primary" aria-label="Add an alarm">
                                <CreateNewFolder></CreateNewFolder>
                            </IconButton>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default cpmBoxInfo;
