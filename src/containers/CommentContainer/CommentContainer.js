import React, { Component } from 'react';

import CommentCard from '../../components/CommentCard/CommentCard'

import axios from 'axios';

class CommentContainer extends Component{
  state = {
    comments: null,
    one: null,
  }

  get_url = (id) => {
    let url = 'https://hacker-news.firebaseio.com/v0/item/';
    url += id + '.json';
    return url;
  }

  //add depth parameter
  get_comments = (visited_id, comment_object, id, descendants, idx) => {
    let url = null;

    if(visited_id.includes(id)){
      return;
    }

    visited_id.push(id);
    url = this.get_url(id);

    axios.get(url)
      .then(response => {

        response.data['author_link'] = ''
        if(response.data.descendants){
          descendants = response.data.descendants;

          // set comment object to an array of n items
          // n is descendant
          // this is so the splice works
          comment_object = new Array(descendants);
        }

        //use index to splice properly
        // comment_object.splice(comment_object.length, 0, response.data);
        comment_object[idx] = response.data

        // set the value of depth somewhere around here
        if(response.data.kids){
          for(let i=0; i<response.data.kids.length; i++){
            idx++;
            this.get_comments(visited_id, comment_object, response.data.kids[i], descendants, idx);
          }
        }

        if(descendants !== 0){
          // console.log(comment_object);
          // TODO: sometimes the comment object isn't fully there yet and it's done
          // creating the state n stuff
          this.setState({comments: comment_object});
        }
      })
  }

  componentDidMount = () => {
    const post_id = this.props.match.params.id;
    this.get_comments([], [], post_id, 0, 0);
  }

  render(){
    // dynamically load the post state
    let card_list = null;

    if(this.state.comments){
      console.log(this.state);
      // console.log(this.state.comments);
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