import React from "react";
import Grid from "@material-ui/core/Grid";
import "../asset/css/style.css";
import CpmInputMessages from "./cpmInputMessages";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import BorderColor from '@material-ui/icons/BorderColor';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

var api = require('./../ctrl/useApi');

class cpmContainsMiddle_BoxChat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            deleteOpen: false,
            editOpen:false,
            msg: ''
        };
    }

    // Mở hộp thoại Delete
    handleClickDeleteOpen = () => {
        this.setState({ deleteOpen: true });
    };

    // Mở hộp thoại Edit
    handleClickEditOpen = (msg) => {
        this.setState({ 
            editOpen: true
        });
    };

    // Lấy message mới
    getMessage = (event) => {
        this.setState({msg: event.target.value})
    }

    // Đóng hộp thoại
    handleClose = () => {
        this.setState({ 
            deleteOpen: false,
            editOpen: false
        });
    };

    // xóa tin nhắn
    handleDelete = (messageId) => {
        api.deleteMessage(this.props.rid, messageId, resp => {
            console.log(resp)
            this.handleClose()
        })
    }

    // Edit message
    handleEdit = (messageId) => {
        let msg = this.state.msg
        api.editMessage(this.props.rid, messageId, msg  , resp => {
            console.log(resp)
            this.handleClose()
        })
    }

    //Hộp thoại xóa tin nhắn
    deleteMessageDialog = (messageId) => {
        return (
            <div>
                <Dialog
                    open={this.state.deleteOpen}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Do you want to delete this message??"}</DialogTitle>
                    {/* <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Let Google help apps determine location. This means sending anonymous location data to
                            Google, even when no apps are running.
                        </DialogContentText>
                    </DialogContent> */}
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.handleDelete(messageId)} color="secondary" autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

    //Hộp thoại sửa tin nhắn
    editMessageDialog = (messageId) => {
        return (
            <div>
                <Dialog
                    open={this.state.editOpen}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Edit Message</DialogTitle>
                    <DialogContent>
                        {/* <DialogContentText>
                            To subscribe to this website, please enter your email address here. We will send
                            updates occasionally.
                        </DialogContentText> */}
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="New message"
                            type="email"
                            fullWidth
                            onChange={this.getMessage}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                    </Button>
                        <Button onClick={() => this.handleEdit(messageId)} color="secondary">
                            Edit
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    showMessage = messHistory => {
        if (messHistory) {
            let listmess = messHistory.data.messages.reverse()
            return listmess.map(message => (
                <div key={`div_${message._id}`} className="showPop">
                    {this.CpmMessageItem(message._id, message.u.username, message.msg, message.u._id === sessionStorage.getItem("userId"))}
                </div>
            ));
        }
    };

    /**
     * Hiển thị tin nhắn
     * 1. xác định tin nhắn là do thằng nào gửi
     * 2. xác định tin nhắn là văn bản hay url
     *
     * @param user
     * @param message
     * @param isSender
     * @returns {*}
     * @constructor
     */
    CpmMessageItem(msgid, user, message, isSender) {
        var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        var regex = new RegExp(expression);

        const avatar = (
            <Grid item xs={1}>
                <div className="boxAvatarMessage">
                    <Avatar>OP</Avatar>
                </div>
            </Grid>
        );

        const content = (
            <Grid item>
                <Paper elevation={1} className="boxMessage">
                    <Typography variant="caption">{user}</Typography>
                    <Typography>{message.match(regex) ? this.attachFile(message) : message}</Typography>
                </Paper>
            </Grid>
        );

        const option = (
            <div>
                <IconButton aria-label="Delete" className="iconMes" onClick={() => this.handleClickDeleteOpen()}>
                    <DeleteIcon />
                </IconButton>
                {this.deleteMessageDialog(msgid)}
                <IconButton aria-label="Delete" className="iconMes" onClick={() => this.handleClickEditOpen(message)}>
                    <BorderColor />
                </IconButton>
                {this.editMessageDialog(msgid)}
            </div>
        );

        return isSender ? (
            <div className="boxMyMessage">
                {option}
                {content}
                {avatar}
            </div>
        ) : (
                <div className="boxReceiveMessage">
                    {avatar}
                    {content}
                    {option}
                </div>
            );
    }

    /**
     * Hiển thị tin nhắn dựa tên URL
     * 1. Hình Ảnh
     * @param _message
     * @returns {*}
     */
    attachFile(_message) {
        return (
            <div>
                <GridList cellHeight={'160'} cols={1}>
                    <GridListTile key={_message} cols={1}>
                        <img src={_message} className="imgCover" />
                    </GridListTile>
                </GridList>
            </div>
        )
    }

    render() {
        return (
            <div>
                <Grid container spacing={0} className="cpmContainsMiddle_BoxChat">
                    <div className="boxContainsMessages">
                        {this.showMessage(this.props.messHistory)}
                    </div>
                    <CpmInputMessages uploadFile={this.props.uploadFile} rid={this.props.rid} />
                </Grid>
            </div>
        );
    }
}

export default cpmContainsMiddle_BoxChat;
