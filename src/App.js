import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import NavBar from './NavBar'
import Card from './Post/Card'
import Footer from './Footer/Footer'

class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      posts: [],
      post_id_list: [],
      start_index: 0,
      end_index: 10,
    }
  }

  // you can "create" the list here and then pass it to the state
  add_post = (post_id, post_index) => {
    let URL = 'https://hacker-news.firebaseio.com/v0/item/';
    URL = URL + post_id + '.json';

    axios.get(URL)
      .then(response => {
        // if the get request returns a json, then
        // add the data to the state
        const posts = [...this.state.posts]

        // add items to the state based on the index
        let main_link = null;
        if(response.data.url){
          main_link = response.data.url;
        }else{
          main_link = 'https://news.ycombinator.com/item?id=' + response.data.id;
        }
        posts.splice(post_index, 0, {
          post_id: response.data.id,
          title: response.data.title,
          article_link: main_link,
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
        let post_id_list = [...this.state.post_id_list];
        post_id_list = response.data;
        this.setState({post_id_list: post_id_list});
        
        // if the get request gets back, execute this
        for(let i=this.state.start_index; i<this.state.end_index; i++){
          this.add_post(this.state.post_id_list[i], i);
        }
      });
  }

  add_index = () => {
    // this doesn't change the ui because I didn't change the
    // state of the post
    const state = {...this.state};
    state.start_index += 10;
    state.end_index += 10;

    for(let i=state.start_index; i<state.end_index; i++){
      this.add_post(this.state.post_id_list[i], i);
    }

    this.setState(state)
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
        <Footer click_next={this.add_index}/>
      </div>
    )
  }
}

export default App;