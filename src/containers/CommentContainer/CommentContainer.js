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
  set_comments = (id, comment_object=null, visited_id=[], descendants=0, idx=0) => {
    let url = null;

    // urgent: I am not handling if kids === []

    // console.log(typeof visited_id)
    if(visited_id.includes(id)){
      return;
    }

    visited_id.push(id);
    url = this.get_url(id);

    axios.get(url)
      .then(response => {

        // response.data['author_link'] = ''
        if(response.data.descendants){
          descendants = response.data.descendants;

          // set comment object to an array of n items
          // n is descendant
          // this is so the splice works
          comment_object = new Array(descendants);
        }

        // console.log(response.data.id)
        //use index to splice properly
        // comment_object.splice(comment_object.length, 0, response.data);

        // here's the thing, the comment_object data has to be present in the first place before
        // you can put shit inside
        comment_object[idx] = response.data;
        console.log(comment_object)
        // console.log(idx + ' ' + response.data.by)
        // console.log(comment_object);

        // set the value of depth somewhere around here
        if(response.data.kids){
          for(let i=0; i<response.data.kids.length; i++){
            idx++;
            // this.set_comments(visited_id, comment_object, response.data.kids[i], descendants, idx);
            this.set_comments(response.data.kids[0], comment_object, visited_id, descendants, idx)
          }
        }
        // else{
        //   return comment_object;
        // }

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
    this.set_comments(post_id);
  }

  render(){
    // dynamically load the post state
    let card_list = null;

    if(this.state.comments){
      // console.log(this.state);
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