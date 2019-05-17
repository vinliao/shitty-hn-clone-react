import React, { Component } from 'react';

import CommentCard from '../../components/CommentCard/CommentCard'

import axios from 'axios';

class CommentContainer extends Component{
  state = {
    comments: null,
  }

  get_url = (id) => {
    let url = 'https://api.hnpwa.com/v0/item/';
    url += id + '.json';
    return url;
  }

  set_comments = (comment_array, descendants, comment_graph=[]) => {
    // traverse through the comment object (dfs)
    // and then create the "flat" comments

    // comment array: an array of comment to be visited
    // comment_object = the graph

    // base case
    if(comment_graph.length === descendants){
      this.setState({comments: comment_graph})
    }

    for(let i=0; i < comment_array.length; i++){
      let curr_comment = comment_array[i];
      if(!curr_comment.visited){
        curr_comment.visited = true;

        // decode the text into readable string
        const parser = new DOMParser();
        const dom = parser.parseFromString(
            '<!doctype html><body>' + curr_comment.content,
            'text/html');
        curr_comment.content = dom.body.textContent;

        comment_graph.push(curr_comment);
        this.set_comments(curr_comment.comments, descendants, comment_graph);
      }
    }
  }

  componentDidMount = () => {
    const post_id = parseInt(this.props.match.params.id);
    const post_url = this.get_url(post_id);
    axios.get(post_url)
      .then(response => {
        // set state of the post, take data from response.data
        this.set_comments(response.data.comments, response.data.comments_count);
      })
  }

  render(){
    // dynamically load the post state
    let card_list = null;

    if(this.state.comments){
      console.log(this.state);
      card_list = (
        <div>
          {/* how the fuck do I loop through the objcet here? */}
          {this.state.comments.map(one_comment => {
            return <CommentCard author_name={one_comment.user} 
              // author_link={one_comment.author_link}
              text={one_comment.content}
              key={one_comment.id} 
              time={one_comment.time_ago}
              depth={one_comment.level} />
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