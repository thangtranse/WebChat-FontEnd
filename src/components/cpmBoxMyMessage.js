import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import GridListTile from '@material-ui/core/GridListTile';
import GridList from '@material-ui/core/GridList';
class cpmBoxMyMessage extends React.Component {
    constructor(props) {
        super(props);
    }

    picture(img) {
        return (
            <div>
                <GridList cellHeight={160} cols={1}>
                    <GridListTile key={img} cols={1}>
                        <img src={img} />
                    </GridListTile>
                </GridList>
            </div>
        )
    }

    render() {
        var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        var regex = new RegExp(expression);

        return (
            <Grid container spacing={0} className="boxReceiveMessage">
                <Grid item>
                    <Paper elevation={1} className="boxMessage">
                        <Typography>
                            {this.props.user}
                        </Typography>
                        <Typography variant="subheading">
                            {this.props.message.match(regex) ? this.picture(this.props.message) : this.props.message}
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