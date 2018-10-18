import React from 'react'

class FacebookButton extends React.Component {
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
                <button
                    style={{
                        backgroundColor: "#4267b2",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}
                    onClick={this.login}
                >
                    <span>
                        <img
                            style={{ width: "32px", height: "32px" }}
                            src="https://static.xx.fbcdn.net/rsrc.php/yo/r/iRmz9lCMBD2.ico"
                        />
                    </span>
                    <span style={{ color: 'white' }}>
                        ĐĂNG NHẬP VỚI FACEBOOK
                    </span>
                </button>
            </div>
        )
    }
}

export default FacebookButton;
