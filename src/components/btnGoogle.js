import React from 'react'
import Avatar from '@material-ui/core/Avatar'

class btnGoogle extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{marginLeft:"5px"}}>
                <Avatar
                    style={{ width: "40px", height: "40px" }}
                    src="images/logo-google.png"
                />
            </div>
        )
    }
}

export default btnGoogle;
