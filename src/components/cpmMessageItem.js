import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import GridListTile from '@material-ui/core/GridListTile';
import GridList from '@material-ui/core/GridList';
function CpmMessageItem({ user, message, isSender }) {

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
                <Typography>{message.match(regex) ? attachFile(message) : message}</Typography>
            </Paper>
        </Grid>
    );

    return isSender ? (
        <Grid container spacing={0} className="boxMyMessage">
            {content}
            {avatar}
        </Grid>
    ) : (
            <Grid container spacing={0} className="boxReceiveMessage">
                {avatar}
                {content}
            </Grid>
        );
}

/**
 * Dùng để xử lý hiển thị
 * @param {*} _message  URL hiển thị (Có thể message chứa đoạn URL)
 */
function attachFile(_message) {
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

export default CpmMessageItem;
