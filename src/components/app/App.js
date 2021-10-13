import React, {Component} from 'react';
import './App.scss';

import ItemPage from '../pages/ItemPage';
import MainPage from '../pages/MainPage';

import {Switch, Route} from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route path="/" exact component={MainPage}/>
                    <Route path="/:id" component={ItemPage}/>
                </Switch>
            </div>
        );
  }
}

export default App;
