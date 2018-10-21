import React from 'react'
import Avatar from '@material-ui/core/Avatar'

class btnTelegram extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Avatar
                    style={{ width: "40px", height: "40px" }}
                    src="images/logo-telegram.png"
                />
            </div>
        )
    }
}

export default btnTelegram;
