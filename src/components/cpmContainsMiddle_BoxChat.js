import React from 'react';
import Grid from '@material-ui/core/Grid';
import '../asset/css/style.css'
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CpmBoxMyMessage from './cpmBoxMyMessage';
import CpmBoxReceiveMessage from './cpmBoxReceiveMessage';
import CpmInputMessages from './cpmInputMessages';

class cpmContainsMiddle_BoxChat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            message: '',
            avatar: "",
            isUploading: false,
            progress: 0,
            avatarURL: ""
        };
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    showMessage = (messHistory) => {
        if (messHistory) {
            return (
                messHistory.data.messages.reverse().map(mess => (this.messageHandle(mess)))
            )
        }
    }

    messageHandle = (message) => {
        if (message.u._id === sessionStorage.getItem('userId')) {
            return (
                <CpmBoxMyMessage key={message._id} user={message.u.username} message={message.msg} />
            )
        }
        else {
            return (
                <CpmBoxReceiveMessage key={message._id} user={message.u.username} message={message.msg} />
            )
        }
    }

    render() {
        return (
            <div>
                <Grid container spacing={0} className="cpmContainsMiddle_BoxChat">
                    <div className="boxContainsMessages">
                        {this.showMessage(this.props.messHistory)}
                    </div>
                    <CpmInputMessages rid={this.props.rid} />
                </Grid>
                <Grid>
                    <div>
                        <input
                            className="hidden"
                            accept="image/*"
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={this.props.uploadFile}
                        />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" component="span">
                                Upload
                            <CloudUploadIcon />
                            </Button>
                        </label>
                    </div>
                </Grid>
            </div>
        );
    }
}

export default cpmContainsMiddle_BoxChat;