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
            <a href={props.article_link}>
              <p>{props.title}</p>
            </a>
          </Typography>
          <Typography>
            <p>
              {props.points} points by
              <a href={props.author_link}>
                {props.author_name} 
              </a>
              {props.time} hours ago |  
              <a href={props.hn_link}>
                {props.comments} comments
              </a>
            </p>
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default postCard;