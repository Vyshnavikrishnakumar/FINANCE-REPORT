import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/Logo.png'

const Navbar = () => {
    
  return (
    <div>
        
      <Box>
        <AppBar sx={{ backgroundColor: 'lightgrey' }}>
          <Toolbar>
            <Typography variant='h4'></Typography>
            <img src={Logo} alt="Logo" style={{ height:60,width:350, marginLeft: 10 }} />
            <Button variant='contained' sx={{
                backgroundColor: 'grey',
                border: '1px solid black',
                width:'10%',
                color: 'black',
                marginLeft: 'auto'
              }} style={{ marginLeft: 'auto' }}>
               <Link to={'/'} 
                  style={{textDecoration:"none",color:'white'}}> 
                  LOGIN
                  </Link> 
            </Button>&nbsp;&nbsp;&nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

            <Button variant='contained'
            sx={{
                backgroundColor: 'grey',
                border: '1px solid black',
                color: 'black',
                width:'10%'
                
              }}><Link to={'/a'} 
              style={{textDecoration:"none",color:'white'}}> 
              SIGNUP
              </Link> 
             
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <br />
    </div>
  )
}

export default Navbar
