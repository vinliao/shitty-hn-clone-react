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

  // //add depth parameter
  // set_comments = (id, comment_object=[], visited_id=[], descendants=0, idx=0) => {
  //   let url = null;

  //   // urgent: I am not handling if kids === []

  //   // console.log(typeof visited_id)
  //   if(visited_id.includes(id)){
  //     return;
  //   }

  //   visited_id.push(id);
  //   url = this.get_url(id);

  //   axios.get(url)
  //     .then(response => {

  //       // this is for the post, not the comments
  //       if(response.data.descendants !== 0){
  //         descendants = response.data.descendants;

  //         // init an emtpy array and edit the value later
  //         comment_object = new Array(descendants);

  //         // comment_object[idx] = response.data;
  //         // console.log(comment_object)
  //       }

  //       comment_object[idx] = response.data;
  //       console.log(comment_object)

  //       if(response.data.kids){
  //         for(let i=0; i<response.data.kids.length; i++){
  //           idx++;
  //           this.set_comments(response.data.kids[0], comment_object, visited_id, descendants, idx)
  //         }
  //       }

  //       if(descendants !== 0){
  //         this.setState({comments: comment_object});
  //       }
  //     })
  // }

  set_comments = (id, comment_object, visited_id=[], index=0) => {
    let url = null;
    url = this.get_url(id);

    // this is still faulty because the parent is always visited
    // if(visited_id.includes(id)){
    //   return;
    // }

    axios.get(url)
      .then(response => {
        
        // if already visited, don't add to comment object
        if(visited_id.includes(id)){
          console.log('already visited');
        }else{
          visited_id.push(id);
          comment_object[index] = response.data;
          index++;
        }

        // console.log(comment_object)
        console.log(comment_object)

        // if it has no replies and reaches the end of the comment tree (base case)
        // WARNING: this might be faulty because I set the deskcendant into +1

        const kids = response.data.kids;

        // base case
        if(index === comment_object.length){
          console.log('Recursive done');
          // return comment_object;
          this.setState({comments: comment_object})
        }
        else if(!kids){
          //what do you do when there is no more replies?
          console.log('no mroe kids');
          // what to do when no more kids: climb up the
          // parent then re-call the function

          // this means I have to set the visited array

          // maybe, maybe, I have to use the visited id here
          return this.set_comments(response.data.parent, comment_object, visited_id, index)
        }
        // if it has replies
        else{
          for(let i=0; i<kids.length; i++){
            if(!visited_id.includes(kids[i])){
              return this.set_comments(kids[i], comment_object, visited_id, index);
            }
          }
          return this.set_comments(visited_id[0], comment_object, visited_id, index);
        }
      })
  }


  componentDidMount = () => {
    const post_id = parseInt(this.props.match.params.id);
    const post_url = this.get_url(post_id);
    axios.get(post_url)
      .then(response => {
        const descendants = response.data.descendants;
        let comment_object = new Array(descendants+1);

        // comment_object[0] = response.data;
        // let index = 1 // because index 0 is already filled with from the post
        // let index = 0;
        // comment_object = this.set_comments(post_id, comment_object, index);

        // how the fucking fuck do I get back the result?
        this.set_comments(post_id, comment_object)
        
      })
    // this.set_comments(post_id);
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