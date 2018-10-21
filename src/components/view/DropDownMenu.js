import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

class DropDownMenu extends React.Component {
    state = {
        anchorEl: null
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { anchorEl } = this.state;
        const { header, items, component: Component } = this.props;

        return (
            <React.Fragment>
                <Component
                    aria-owns={anchorEl ? "simple-menu" : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    {header}
                </Component>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    {items.map(item => (
                        <MenuItem
                            onClick={() => {
                                this.handleClose();
                                item.onClick && item.onClick();
                            }}
                        >
                            {item.value}
                        </MenuItem>
                    ))}
                </Menu>
            </React.Fragment>
        );
    }
}

export default DropDownMenu;
