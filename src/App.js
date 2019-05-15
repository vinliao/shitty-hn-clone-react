import React, { Component } from 'react';
import './App.css';

import MainContainer from './containers/MainContainer/MainContainer';
import CommentContainer from './containers/CommentContainer/CommentContainer'

import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component{

  render(){

    return(
      <BrowserRouter>
        <div className="App">
          <Route path="/" exact component={MainContainer} />
          <Route path="/:id" exact component={CommentContainer} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;