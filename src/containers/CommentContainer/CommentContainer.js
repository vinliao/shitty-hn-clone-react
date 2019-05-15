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
    // comment.length repeats itself, maybe you should splice by using index

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

    // return comment_object
    // console.log(comment_object);

    // this shit seems to return when everytime the function is called
    // how do I return when all the comments are already called?
    // if(comment_object.length === descendants)
    
    // only half of all comment is probably enough for now
    
    console.log(comment_object.length);
    return comment_object
    // if((comment_object.length/2) >= descendants && descendants !== 0){
    //   // console.log(descendants);
    //   // return comment_object;
    //   this.setState({comments: comment_object})
    // }

    // if(this.state.descendants){
    //   // return comment_object;
    //   console.log(this.state.descendants);
    //   console.log('heeyyy')
    //   this.setState({comments: comment_object})
    // }
  }

  componentDidMount = () => {
    // const URL = 'https://hacker-news.firebaseio.com/v0/item/' + post_id + '.json';

    console.log('dic')
    const post_id = this.props.match.params.id;

    // let comments = null;
    // comments = this.get_comments([], [], post_id, 0);
    // //oh okay, the comments aren't set properly, fix this shit
    // // comments[0] returned undefined, which is fucking stupid
    // this.setState({comments: comments});

    this.get_comments([], [], post_id, 0);
  }

  render(){
    // dynamically load the post state
    let card_list = null;

    // console.log(this.state.comments.length)
    // the comment state always seems to be empty, this is fucking stupid
    // console.log(this.state);
    // console.log(this.state.comments.length);

    if(this.state.comments.length > 0 && this.state.comments){
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