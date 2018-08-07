import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'

class cpmBoxMyMessage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid container spacing={0} className="boxReceiveMessage">
            <Grid item>
                <Paper elevation={1} className="boxMessage">
                    <Typography variant="headline" component="h3">
                    {this.props.user}
                    </Typography>
                    <Typography component="p">
                    {this.props.message}
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={1}>
                <div className="boxAvatarMessage">
                    <Avatar>OP</Avatar>
                </div>
            </Grid>
        </Grid>
        );
    }
}

export default cpmBoxMyMessage;