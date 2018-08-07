import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

function CpmMessageItem({ user, message, isSender }) {
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
                <Typography variant="headline">{message}</Typography>
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

export default CpmMessageItem;
