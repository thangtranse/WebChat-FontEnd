import React from 'react';

import '../asset/css/style.css'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Upload from '@material-ui/icons/AddToPhotos';

const api = require('./../ctrl/useApi')

class cpmInputMessage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
        };
    }

    sendMessage = (message) => {
        if (message != '') {
            api.sendMess(this.props.rid, message, resp => {
                console.log(resp)
                document.getElementById("textarea").value = ''
                this.setState({message: ''})
            })
        }
    }

    messageInput = (event) => {
        this.setState({message: event.target.value})
    }

    render() {
        return (
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <div className="boxInputChat">
                        <div className="inputTextField">
                            <TextField
                                id="textarea"
                                placeholder="Nhập tin nhắn"
                                multiline
                                margin="normal"
                                rows="4"
                                fullWidth
                                onChange={this.messageInput}
                            />

                        </div>
                        <div className="boxBtnSendMessage cursor"  onClick={() => this.sendMessage(this.state.message)}>
                            <Icon>send</Icon>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div>
                        <input
                            onChange={this.props.uploadFile}
                            accept="image/*"
                            id="contained-button-file"
                            multiple
                            type="file"
                            className="hidden"
                        />
                        <label htmlFor="contained-button-file">
                            <Upload className="cursor iconUp" color="primary"></Upload>
                        </label>
                    </div>
                </Grid>
            </Grid>
        )
    }
}

export default cpmInputMessage;