import React from 'react';
import './asset/css/style.css'
import Grid from '@material-ui/core/Grid';
import CpmContainsLeft from './components/cpmContainsLeft'
import CpmContainsRight_ListFriends from './components/cpmContainsRight_ListFriends'
import CpmContainsMiddle_BoxChat from './components/cpmContainsMiddle_BoxChat'

class App extends React.Component {


    constructor() {
        super();

    }

    render() {
        return (
            <div>
                <Grid container spacing={0}>
                    <Grid item xs={2} className="colorbackground_blue leftBox">
                        <CpmContainsLeft/>
                    </Grid>
                    <Grid item xs={8}>
                        <CpmContainsMiddle_BoxChat/>
                    </Grid>
                    <Grid item xs={2} className="colorbackground_silver">
                        <CpmContainsRight_ListFriends/>
                    </Grid>
                </Grid>

            </div>
        );
    }
}

export default App;
