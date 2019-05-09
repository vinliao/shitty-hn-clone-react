import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const navBar = () => {
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
    </div>
  )
}

export default navBar;