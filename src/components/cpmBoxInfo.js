import React from "react";
import "../asset/css/style.css";
import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Grid from "@material-ui/core/Grid";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";

import LensIcon from "@material-ui/icons/Lens";
import DropDownMenu from "./view/DropDownMenu";
import STATUS from "../constant/status";
var api = require("../ctrl/useApi");

class cpmBoxInfo extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        this.logout = this.logout.bind(this);
        this.getProp = this.getProp.bind(this);
        this.getProp();
        this.state = { message: "" };
    }

    componentDidMount() {
        api.getPresence().then(response =>
            this.setState({ status: response.data.presence })
        );
    }

    logout() {
        api.logout();
    }

    getProp() {
        console.log("thangse 2", this.props.infor);
    }

    render() {
        const statusItems = Object.keys(STATUS)
            .filter(status => status != "offline")
            .map(status => {
                return {
                    value: (
                        <React.Fragment>
                            <LensIcon style={{ color: STATUS[status] }} />
                            <span>{status}</span>
                        </React.Fragment>
                    ),
                    onClick: () => {
                        this.props.onStatusChange(status)
                    }
                };
            });

        return (
            <Grid container spacing={0} className="cpmBoxInfo">
                <Grid item xs={12}>
                    <Grid container>
                        <div className="elemtfloat">
                            <Avatar className="imgBoxInfo">
                                <span>T</span>
                                <LensIcon
                                    className="statusIndicator"
                                    style={{
                                        color: STATUS[this.props.status]
                                    }}
                                />
                            </Avatar>
                            <label className="textUser">
                                {this.props.infor.name}
                            </label>
                        </div>
                        <DropDownMenu
                            component={IconButton}
                            header={<ArrowDropDown color="error" />}
                            items={[
                                ...statusItems,
                                { value: "Profile" },
                                { value: "My account" },
                                { value: "Logout", onClick: this.logout }
                            ]}
                        />
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default cpmBoxInfo;
