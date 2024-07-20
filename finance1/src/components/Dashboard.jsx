import { TextField, Typography } from '@mui/material'
import axios from 'axios'
import React from 'react'

const Dashboard = () => {
	axios.post((req,res)=>{
		
	})
	return (
	<div>
		<Typography variant='h3'style={{  color: 'black', textAlign: 'center',fontSize:'170%',fontWeight:'bold',fontStyle: 'italic' }}>
			DASHBOARD
		</Typography>
		<br /><br /><br />

		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
			<Typography variant='h3' style={{ padding: '0% 0%', color: 'black', fontSize: '250%', fontWeight: 'bold', textAlign: 'left',fontFamily:'times roman' }}>
				MY INCOME
			</Typography>
			
			<TextField
				variant='outlined'
				sx={{
					backgroundColor: 'white',
					width: '30%',
					height:'90%',
					textAlign: 'right'
				}}
				label='amount'
				InputLabelProps={{
				sx: {
					color: 'lightgrey'
				}
				}}
			/>
		</div>
	</div>
	)
}

export default Dashboard
