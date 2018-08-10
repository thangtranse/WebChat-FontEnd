import React from 'react';
import '../asset/css/style.css';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import CreateNewFolder from '@material-ui/icons/CreateNewFolder';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

var api = require('../ctrl/useApi');

class cpmBoxInfo extends React.Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.getProp = this.getProp.bind(this);
        this.getProp();
        this.state = {
            anchorEl: null,
            message: '',
            open: false
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

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    CreateGroup() {
        return (
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Tạo Cờ Rúp</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ahihi
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleClose} color="primary">
                        Subscribe
                    </Button>
                </DialogActions>
            </Dialog>
        )
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
                            <IconButton color="primary" aria-label="Add an alarm" onClick={this.handleClickOpen}>
                                <CreateNewFolder></CreateNewFolder>
                            </IconButton>
                            {this.CreateGroup()}
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
export default cpmBoxInfo;
