import { Button, TextField, Typography } from '@mui/material'
import React from 'react'
import Logo from '../assets/Logo.png'

const Admin = () => {
	return (
	<div >
		<img src={Logo} alt="Logo" style={{ height:160,width:900, marginLeft: 10,borderRadius:100 }}></img>
		<br /><br />
		
		<Typography variant='h3'style={{ padding:'0%', color: 'black', textAlign: 'center',fontSize:'250%',fontWeight:'bold',fontStyle: 'italic' }}>
		ADMIN LOGIN
		</Typography>
		<br /><br />

		<TextField variant='outlined' sx={{
			backgroundColor: 'white',
			borderRadius: 1,
			width: '40%',
			marginTop: 2}}
			label='Username' 
			InputLabelProps={{
				sx: {
					color: 'lightgrey'
			}}}>
		</TextField>
		<br /><br /><br />

		<TextField variant='outlined' type='password' sx={{
			backgroundColor: 'white',
			borderRadius: '10%',
			width: '40%',
			marginTop: 2}}
			label='Password'
			InputLabelProps={{
				sx: {
					color: 'lightgrey'
				}
			}}>
		</TextField>
		<br /><br /><br />

		<Button variant='contained' sx={{
			borderRadius: '20',
			width: '37%',
			backgroundColor: 'grey',
			color: 'white'
			}}>
			LOGIN
		</Button>
		<br /><br />		
	</div>
	)
}

export default Admin