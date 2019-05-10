import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import NavBar from './Navbar/Navbar'
import Card from './Post/Card'

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

  set_post_state = (id_array) => {
    let posts_object = []
    
    for(let i=0; i<id_array.length; i++){
      let URL = 'https://hacker-news.firebaseio.com/v0/item/';
      URL = URL + id_array[i] + '.json';

      axios.get(URL)
        .then(response => {
          // add items to the state based on the index
          let main_link = null;
          if(response.data.url){
            main_link = response.data.url;
          }else{
            main_link = 'https://news.ycombinator.com/item?id=' + response.data.id;
          }

          // splice is an array command to insert something in the middle of an array
          posts_object.splice(i, 0, {
            post_id: response.data.id,
            title: response.data.title,
            article_link: main_link,
            hn_link: 'https://news.ycombinator.com/item?id=' + response.data.id,
            author_name: response.data.by,
            author_link: 'https://news.ycombinator.com/user?id=' + response.data.by,
            points: response.data.score,
            comments: response.data.descendants,
          });

          // if all the post already returned
          if(posts_object.length === this.state.end_index-this.state.start_index){
            this.setState({posts: posts_object});
          }
        })
    }
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
        let current_post_id_list = [];

        current_post_id_list = post_id_list.slice(this.state.start_index, this.state.end_index);
        this.set_post_state(current_post_id_list);
      });
  }

  set_next_posts = () => {
    const difference = this.state.end_index-this.state.start_index;

    const new_start_index = this.state.start_index + difference;
    const new_end_index = this.state.end_index + difference;

    this.setState({start_index: new_start_index,
      end_index: new_end_index});

    
    // slice the id list from post_id_list with new index
    // feed it into set_post_state()
    let current_post_id_list = [];

    current_post_id_list = this.state.post_id_list.slice(new_start_index, new_end_index);
    this.set_post_state(current_post_id_list);

  }

  render(){
    // dynamically load the post state
    let card_list = null;

    // if 
    if(this.state.posts.length === this.state.end_index-this.state.start_index){
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
      )
      // this div is equivalent to
      // <div>
      //   <Card props="whatever/>
      //   <Card props="whatever/>
      // </div>

    }

    return(
      <div className="App">
        <NavBar click_next={this.set_next_posts}/>
        {card_list}
      </div>
    )
  }
}

export default App;