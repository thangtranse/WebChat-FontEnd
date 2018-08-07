import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Api from './Api';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Route, Link} from "react-router-dom";

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route exact path="/" component={App}/>
            <Route path="/api" component={Api}/>
        </div>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
