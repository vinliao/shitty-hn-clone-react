import React from 'react'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import './CommentCard.css';

const CommentCard = (props) => {
  return(
    <div className='card' style={{marginLeft: props.depth * 10 + 'px'}}>
      <Card>
        <CardContent>
          <Typography>
            {props.author_name} {props.time}
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