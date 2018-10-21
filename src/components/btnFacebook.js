import React from 'react'
import Avatar from '@material-ui/core/Avatar'

class btnFacebook extends React.Component {
    constructor(props) {
        super(props);
        this.FB = window.FB
        this.login = this.login.bind(this)
    }

    login() {
        this.FB.login(response => {
            console.log(response)
            this.props.onLogin && this.props.onLogin(response)
        })
    }

    
    render() {
        return (
            <div>
                <Avatar
                    style={{ width: "40px", height: "40px" }}
                    src="images/logo-facebook.png"
                />
            </div>
        )
    }
}

export default btnFacebook;
