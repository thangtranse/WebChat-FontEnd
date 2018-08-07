import React from 'react';

var res = require('./ctrl/receiveApi');

class Api extends React.Component {
    render() {
        return (
            <div>
                <h1>api</h1>
                {res.getJSON()}
            </div>
        );
    }
}

export default Api;