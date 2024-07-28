import { AppBar, Box, Button, Toolbar } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/Logo.png'

const Navbar = () => {
	return (
	<div>
		<Box>
		<AppBar sx={{ backgroundColor: 'lightgrey' }}>
			<Toolbar>
			<img src={Logo} alt="Logo" style={{ height:60,width:120, marginLeft: 10 }} />
			
			<Button variant='contained' sx={{
				backgroundColor: 'grey',
				border: '1px solid black',
				width:'10%',
				color: 'black',
				marginLeft: 'auto'
				}} style={{ marginLeft: 'auto'
			}}>
				<Link to={'/'} style={{textDecoration:"none",color:'white'}}> 
					Login
				</Link>
			</Button>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

			<Button variant='contained'
				sx={{
					backgroundColor: 'grey',
					border: '1px solid black',
					color: 'black',
					width:'10%'
			}}>
				<Link to={'/signup'} style={{textDecoration:"none",color:'white'}}> 
					Sign Up
				</Link>
			</Button>
			</Toolbar>
		</AppBar>
		</Box>
		<br /><br /><br /><br />
	</div>
	)
}

export default Navbar
