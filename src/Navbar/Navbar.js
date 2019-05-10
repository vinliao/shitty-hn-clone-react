import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import './Navbar.css'

const navbar = (props) => {
  // it just run a fat arrow, then put the returned
  // value into NavBar
  return(
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit" >
            A shitty hn clone
          </Typography>
        </Toolbar>
      </AppBar>

      <div className='navbar-button'>
        <Button
          // on click hasn't changed yet!!!
          onClick={props.click_next}
          variant='contained'
          color='default'>Load Prev</Button>
        <Button
          onClick={props.click_next}
          variant='contained'
          color='default'>Load Prev</Button>
      </div>
    </div>
  )
}

export default navbar;