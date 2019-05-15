import React from 'react'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import './CommentCard.css';

const CommentCard = (props) => {
  // in the comment, put author, x hours ago, and the comment itself
  return(
    <div className='Card'>
      <Card>
        <CardContent>
          <Typography>
            <a href={props.author_link} target="_blank" rel="noopener noreferrer">
              {props.author_name} 
            </a>
            {props.time} hours ago |  
          </Typography>
          <Typography>
            {/* put the comment here */}
            {props.text}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default CommentCard;