import React from "react";
import Grid from "@material-ui/core/Grid";
import "../asset/css/style.css";
import TextField from "@material-ui/core/TextField";
import CpmMessageItem from "./cpmMessageItem";
import CpmInputMessages from "./cpmInputMessages";

class cpmContainsMiddle_BoxChat extends React.Component {
    showMessage = messHistory => {
        if (messHistory) {
            return messHistory.data.messages
                .reverse()
                .map(message => (
                    <CpmMessageItem
                        key={message._id}
                        user={message.u.username}
                        message={message.msg}
                        isSender={message.u._id === sessionStorage.getItem("userId")}
                    />
                ));
        }
    };

    render() {
        return (
            <div>
                <Grid container spacing={0} className="cpmContainsMiddle_BoxChat">
                    <div className="boxContainsMessages">
                        {this.showMessage(this.props.messHistory)}
                    </div>
                    <CpmInputMessages rid={this.props.rid} />
                </Grid>
            </div>
        );
    }
}

export default cpmContainsMiddle_BoxChat;
