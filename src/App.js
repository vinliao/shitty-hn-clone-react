import React, { Component } from 'react';
import './App.css';
import NavBar from './NavBar'
import Card from './Post/Card'

class App extends Component{

  // you can "create" the list here and then pass it to the state

  state = {
    // this can be looped!
    post: [{
      post_id: 19854381,
      title: 'Google Is Turning Off the Works-with-Nest API',
      article_link: 'https://nest.com/whats-happening/',
      hn_link: 'https://news.ycombinator.com/item?id=19854381',
      author_name: 'cek',
      author_link: 'https://news.ycombinator.com/user?id=cek',
      points: 357,
      comments: 232,
    }, {
      post_id: 19852105,
      title: 'Css-only-chat: A truly monstrous async web chat using no JS on the front end',
      article_link: 'https://github.com/kkuchta/css-only-chat',
      hn_link: 'https://news.ycombinator.com/item?id=19852105',
      author_name: 'bennylope',
      author_link: 'https://news.ycombinator.com/user?id=bennylope',
      points: 626,
      comments: 106,
    }],
    done_loading: true,
  }

  render(){

    let card_list = null;

    // dynamically load the post state
    card_list = (
      <div>
        {this.state.post.map(one_post => {
        // what you wanna do with each post
        return <Card title={one_post.title}
          article_link={one_post.article_link} 
          hn_link={one_post.hn_link} 
          author_name={one_post.author_name} 
          author_link={one_post.author_link} 
          points={one_post.points} 
          comments={one_post.comments}
          key={one_post.post_id}/>
        })}
      </div>

      // this div is equivalent to
      // <div>
      //   <Card props="whatever/>
      //   <Card props="whatever/>
      // </div>

    )

    return(
      <div className="App">
        <NavBar />
        {card_list}
      </div>
    )
  }
}

export default App;