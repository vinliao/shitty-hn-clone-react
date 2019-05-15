import React, { Component } from 'react';

import PostCard from '../../components/PostCard/PostCard'
import Navbar from '../../components/Navbar/Navbar'

import axios from 'axios';

class MainContainer extends Component{
  state = {
    posts: [],
    all_post_id: [],
    start_index: 0,
    end_index: 10,
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

    // TODO: fix this shit. This container gets loaded everytime it's mounted
    // it's inefficient because everytime ppl hit back, it gets to the api again
    axios.get('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(response => {
        let all_post_id = [...this.state.all_post_id];
        all_post_id = response.data;
        this.setState({all_post_id: all_post_id});
        
        // if the get request gets back, execute this
        let current_all_post_id = [];

        current_all_post_id = all_post_id.slice(this.state.start_index, this.state.end_index);
        this.set_post_state(current_all_post_id);
      });
  }

  set_next_posts = () => {
    const difference = this.state.end_index-this.state.start_index;

    const new_start_index = this.state.start_index + difference;
    const new_end_index = this.state.end_index + difference;

    this.setState({start_index: new_start_index,
      end_index: new_end_index});

    
    // slice the id list from all_post_id with new index
    // feed it into set_post_state()
    let current_posts = [];

    current_posts = this.state.all_post_id.slice(new_start_index, new_end_index);
    this.set_post_state(current_posts);

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
          return <PostCard title={one_post.title}
            article_link={one_post.article_link} 
            hn_link={one_post.hn_link} 
            author_name={one_post.author_name} 
            author_link={one_post.author_link} 
            points={one_post.points} 
            comments={one_post.comments}
            id={one_post.post_id}
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
      <div>
        <Navbar click_next={this.set_next_posts}/>
        {card_list}
      </div>
    )
  }
}

export default MainContainer