import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import NavBar from './NavBar'
import Card from './Post/Card'

class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      posts: [],
      done_loading: true,
    }
  }

  // you can "create" the list here and then pass it to the state
  add_post = (post_id) => {
    let URL = 'https://hacker-news.firebaseio.com/v0/item/';
    URL = URL + post_id + '.json';
    console.log(URL);

    axios.get(URL)
      .then(response => {
        // change the state here, maybe
        console.log(response);
        
        // change the state here
        const posts = [...this.state.posts]
        posts.push({
          post_id: response.data.id,
          title: response.data.title,
          article_link: response.data.url,
          hn_link: 'https://news.ycombinator.com/item?id=' + response.data.id,
          author_name: response.data.by,
          author_link: 'https://news.ycombinator.com/user?id=' + response.data.by,
          points: response.data.score,
          comments: response.data.descendants,
        });
        this.setState({posts: posts});
      })
  }

  // call the function add_post when the page loads
  componentDidMount = () => {
    // send the get request here
    axios.get('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(response => {
        // if the get request gets back, execute this

        // loop add post here
        // TODO: add index so it's orderly
        for(let i=0; i<10; i++){
          this.add_post(response.data[i]);
        }
      });
    // this.add_post();
  }

  render(){

    // dynamically load the post state
    let card_list = null;

    card_list = (
      <div>
        {this.state.posts.map(one_post => {
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