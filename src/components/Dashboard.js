import {get} from "https";
import {TableBody, TableRow, TextTableCell} from 'evergreen-ui';

const React = require("react");

const api = require('../ctrl/useApi');

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            userId: this.props.userId,
            authToken: this.props.authToken,
            listRooms: [],
            rid: ''
        }
        api.getRoom(this.state.authToken, this.state.userId, resp => {
            this.setState({listRooms: resp})
        })
    }

    showRoom = (listRooms) => {
        return (
            <TableBody height={500}>
                {listRooms.map(room => (
                    <TableRow key={room._id} isSelectable onClick={() => this.setState({rid: room._id})}>
                        <TextTableCell borderRight={null}>{room.name}</TextTableCell>
                        {console.log(this.state.rid)}
                    </TableRow>
                ))}
            </TableBody>
        )
    }

    render() {
        return (
            <div>
                {this.showRoom(this.state.listRooms)}
            </div>
        )
    }
}

export default Dashboard;