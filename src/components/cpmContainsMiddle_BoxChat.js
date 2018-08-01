import React from 'react';
import Grid from '@material-ui/core/Grid';
import '../asset/css/style.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Mood from '@material-ui/icons/Mood';
import CpmBoxMyMessage from './cpmBoxMyMessage';
import CpmBoxReceiveMessage from './cpmBoxReceiveMessage';

class cpmContainsMiddle_BoxChat extends React.Component {

    constructor() {
        super();
        this.state = {
            anchorEl: null,
        };
    }

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    render() {
        return (
            <div>
                <Grid container spacing={0} className="cpmContainsMiddle_BoxChat">
                    <div className="boxContainsMessages">
                        <CpmBoxMyMessage/>
                        <CpmBoxReceiveMessage/>
                    </div>
                    <div className="boxInputChat">
                        <div className="inputTextField">
                            <TextField
                                id="textarea"
                                placeholder="Nhập tin nhắn"
                                multiline
                                margin="normal"
                                rows="4"
                                fullWidth
                            />
                        </div>
                        <div className="boxBtnSendMessage">
                            <Button variant="contained" color="primary">
                                Send
                                <Icon>send</Icon>
                            </Button>
                        </div>
                    </div>
                </Grid>
                <Grid>
                    <div>
                        <Button
                            aria-owns={this.state.anchorEl ? 'simple-menu' : null}
                            aria-haspopup="true"
                            onClick={this.handleClick}
                        >
                            <Mood/>
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={this.state.anchorEl}
                            open={Boolean(this.state.anchorEl)}
                            onClose={this.handleClose}
                        >
                            <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                            <MenuItem onClick={this.handleClose}>My account</MenuItem>
                            <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Grid>
            </div>
        );
    }
}

export default cpmContainsMiddle_BoxChat;