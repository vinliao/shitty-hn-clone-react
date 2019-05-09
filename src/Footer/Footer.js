import React from 'react'
import Button from '@material-ui/core/Button'
import './Footer.css';

const footer = (props) => {
  return(
    <div className='Footer'>
      <Button 
        onClick={props.click_next}
        variant='contained'
        color='default'>load more</Button>
    </div>
  )
}

export default footer;