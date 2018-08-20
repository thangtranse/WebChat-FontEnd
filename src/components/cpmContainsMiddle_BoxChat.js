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

class cpmContainsMiddle_BoxChat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null
        };
    }

    showMessage = messHistory => {
        if (messHistory) {
            let listmess = messHistory
            return listmess.map(message => (
                <div key={`div_${message._id}`} className="showPop">
                    {this.CpmMessageItem(message.u.username, message.msg, message.u._id === sessionStorage.getItem("userId"))}
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
    CpmMessageItem(user, message, isSender) {
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
                <IconButton aria-label="Delete" className="iconMes">
                    <DeleteIcon />
                </IconButton>
                <IconButton aria-label="Delete" className="iconMes">
                    <BorderColor />
                </IconButton>
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
                        <img src={_message} className="imgCover"/>
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
                    <CpmInputMessages uploadFile={this.props.uploadFile} rid={this.props.rid}/>
                </Grid>
            </div>
        );
    }
}

export default cpmContainsMiddle_BoxChat;
