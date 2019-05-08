import React, { Component } from 'react';
import './App.css';
import NavBar from './NavBar'
import Card from './Post/Card'

class App extends Component{
  state = {
    // this can be looped!
    post: [{
      title: 'Google Is Turning Off the Works-with-Nest API',
      article_link: 'https://nest.com/whats-happening/',
      hn_link: 'https://news.ycombinator.com/item?id=19854381',
      author_name: 'cek',
      author_link: 'https://news.ycombinator.com/user?id=cek',
      points: 357,
      comments: 232,
    }, {
      title: 'Css-only-chat: A truly monstrous async web chat using no JS on the front end',
      article_link: 'https://github.com/kkuchta/css-only-chat',
      hn_link: 'https://news.ycombinator.com/item?id=19852105',
      author_name: 'bennylope',
      author_link: 'https://news.ycombinator.com/user?id=bennylope',
      points: 626,
      comments: 106,
    }]
  }

  // changeNameHandler = () => {
  //   this.setState({
  //     names: ['asdf', 'doooom'],
  //   });
  // }

  // detectInputHandler = (event) => {
  //   console.log(event);
  //   this.setState({
  //     names: [
  //       'asdf',
  //       event.target.value,
  //     ]
  //   });
  // }

  render(){
    return(
      <div className="App">
        <NavBar />

        {/* this can be looped! */}
        <Card title={this.state.post[0].title}
          article_link={this.state.post[0].article_link} 
          hn_link={this.state.post[0].hn_link} 
          author_name={this.state.post[0].author_name} 
          author_link={this.state.post[0].author_link} 
          points={this.state.post[0].points} 
          comments={this.state.post[0].comments}/>

        <Card title={this.state.post[1].title}
          article_link={this.state.post[1].article_link} 
          hn_link={this.state.post[1].hn_link} 
          author_name={this.state.post[1].author_name} 
          author_link={this.state.post[1].author_link} 
          points={this.state.post[1].points} 
          comments={this.state.post[1].comments}/>
      </div>
    )
  }
}

export default App;