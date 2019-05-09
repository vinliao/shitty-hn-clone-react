import React from 'react'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import './Card.css';

const postCard = (props) => {
  return(
    <div className='Card'>
      <Card>
        {/* <CardMedia 
          image="../../tabler.png" 
          title="A random image"
        /> */}
        <CardContent>
          <Typography>
            <a href={props.article_link} target="_blank" rel="noopener noreferrer">
              {props.title}
            </a>
          </Typography>
          <Typography>
            {props.points} points by
            <a href={props.author_link} target="_blank" rel="noopener noreferrer">
              {props.author_name} 
            </a>
            {props.time} hours ago |  
            <a href={props.hn_link} target="_blank" rel="noopener noreferrer">
              {props.comments} comments
            </a>
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default postCard;