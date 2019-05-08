import React from 'react'
import PostCard from './Card'

const cardList = (props) => {
  return(
    <div>
      <PostCard 
        title="this is some really cool title" 
        upvotes={5} 
        author={'vinliao'} 
        comments={2} 
        post_page={'https://google.com'}
        author_page={'https://g.co'}
      />
      {/* <PostCard title="yo" upvotes={3} author={'vinliao'} comments={2}/>
      <PostCard title="sup" upvotes={10} author={'vinliao'} comments={2}/> */}
    </div>
  )
}

export default cardList;