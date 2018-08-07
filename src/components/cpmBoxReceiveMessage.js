import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'

class CpmBoxReceiveMessage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid container spacing={0} className="boxMyMessage">
                <Grid item xs={1}>
                    <div className="boxAvatarMessage">
                        <Avatar>OP</Avatar>
                    </div>
                </Grid>
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
            </Grid>
        );
    }
}

export default CpmBoxReceiveMessage;