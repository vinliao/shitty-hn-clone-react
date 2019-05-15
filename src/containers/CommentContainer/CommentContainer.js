import React, { Component } from 'react';

import CommentCard from '../../components/CommentCard/CommentCard'

import axios from 'axios';

class CommentContainer extends Component{
  state = {
    comments: null,
  }

  get_url = (id) => {
    let url = 'https://hacker-news.firebaseio.com/v0/item/';
    url += id + '.json';
    return url;
  }

  //add depth parameter
  get_comments = (visited_id, comment_object, id, descendants) => {
    let url = null;

    if(visited_id.includes(id)){
      return;
    }

    visited_id.push(id);
    url = this.get_url(id);

    axios.get(url)
      .then(response => {

        // how do i make this orderly?
        response.data['author_link'] = ''
        if(response.data.descendants){
          descendants = response.data.descendants;
        }

        comment_object.splice(comment_object.length, 0, response.data);

        if(response.data.kids){
          for(let i=0; i<response.data.kids.length; i++){
            // set the depth value here
            this.get_comments(visited_id, comment_object, response.data.kids[i], descendants);
          }
        }
        // or maybe, set the depth value here
      })
    
    if(comment_object.length >= descendants && descendants !== 0){
      console.log('Setting state with array:');
      // console.log(comment_object.length);
      // return comment_object
      console.log(comment_object)
      this.setState({comments: comment_object})
    }
  }

  componentDidMount = () => {
    const post_id = this.props.match.params.id;
    this.get_comments([], [], post_id, 0);
  }

  render(){
    // dynamically load the post state
    let card_list = null;

    if(this.state.comments){
      console.log('hey')
      card_list = (
        <div>
          {this.state.comments.map(one_comment => {
          return <CommentCard author_name={one_comment.by} 
            author_link={one_comment.author_link}
            text={one_comment.text}
            key={one_comment.id} 
            time={one_comment.time} />
          })}
        </div>
      )
    }

    return(
      <div>
        {card_list}
      </div>
    )
  }
}

export default CommentContainer