import React from 'react';
import Grid from '@material-ui/core/Grid';
import '../asset/css/style.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const api = require('./../ctrl/useApi')

class cpmInputMessage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message:'',
        };
    }

    sendMessage = () => {
        api.sendMess(this.props.rid, this.state.message, resp => {
            console.log(resp)
            document.getElementById("textarea").value = ''
        })
    }

    messageInput = (event) =>{
        this.setState({message: event.target.value})
    }
    
    render(){
        return(
            <div className="boxInputChat">
                <div className="inputTextField">
                    <TextField
                        id="textarea"
                        placeholder="Nhập tin nhắn"
                        multiline
                        margin="normal"
                        rows="4"
                        fullWidth
                        onChange={this.messageInput}
                    />
                    
                </div>
                <div className="boxBtnSendMessage">
                    <Button type="submit" variant="contained" color="primary" onClick={() => this.sendMessage()}>
                        Send
                        <Icon>send</Icon>
                    </Button>
                </div>
            </div>
        )
    }
}
export default cpmInputMessage;