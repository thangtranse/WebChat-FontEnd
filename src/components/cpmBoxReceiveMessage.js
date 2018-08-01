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
                            This is a sheet of paper.
                        </Typography>
                        <Typography component="p">
                            Paper can be used to build su1232131321rface or other elements for your application.
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