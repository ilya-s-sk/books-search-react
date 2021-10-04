import React, {Component} from 'react';
import './App.css';

import BooksList from '../books-list/BooksList';
import SearchPanel from '../search-panel/SearchPanel';
import ItemPage from '../pages/ItemPage';
import MainPage from '../pages/MainPage';

import {Switch, Route} from 'react-router-dom';

class App extends Component {


    render() {


        return (
            <div className="App">
                
                {/* <SearchPanel/>
                <Switch>
                    <Route path="/" exact component={BooksList}/>
                    <Route path="/:id" component={ItemPage}/>
                </Switch> */}
                <Switch>
                    <Route path="/" exact component={MainPage}/>
                    <Route path="/:id" component={ItemPage}/>
                </Switch>
                
            </div>
        );
  }
}

export default App;
