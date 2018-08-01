import React from 'react';
import '../asset/css/style.css';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Grid from '@material-ui/core/Grid';

class cpmBoxInfo extends React.Component {
    render() {
        return (
            <Grid container spacing={0} className="cpmBoxInfo">
                <Grid item xs={12}>
                    <Grid container>
                        <div className="elemtfloat">
                            <Avatar className="imgBoxInfo">H</Avatar>
                            <label>Thắng</label>
                        </div>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <IconButton aria-label="Delete">
                        <DeleteIcon/>
                    </IconButton>
                    <IconButton aria-label="Delete" disabled color="primary">
                        <DeleteIcon/>
                    </IconButton>
                    <IconButton color="secondary" aria-label="Add an alarm">
                        <Icon>alarm</Icon>
                    </IconButton>
                    <IconButton color="primary" aria-label="Add to shopping cart">
                        <AddShoppingCartIcon/>
                    </IconButton>
                </Grid>
            </Grid>
        );
    }
}

export default cpmBoxInfo;