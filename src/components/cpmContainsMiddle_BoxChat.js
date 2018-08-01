import React from 'react';
import Grid from '@material-ui/core/Grid';
import '../asset/css/style.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

class cpmContainsMiddle_BoxChat extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <Grid container spacing={0} className="cpmContainsMiddle_BoxChat">
                <div className="boxContainsMessages">1</div>
                <div className="boxInputChat">
                    <div style={{width: '80%', float: 'left ', 'padding-left': '10px'}}>
                        <TextField
                            id="textarea"
                            placeholder="Nhập tin nhắn"
                            multiline
                            margin="normal"
                            rows="4"
                            fullWidth
                        />
                    </div>
                    <Button variant="contained" color="primary">
                        Send
                        <Icon>send</Icon>
                    </Button>
                </div>
            </Grid>
        );
    }
}

export default cpmContainsMiddle_BoxChat;