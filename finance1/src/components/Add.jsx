import { useState, useEffect } from 'react';
import { TextField, Typography, Button } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
	axios.get('http://localhost:3000/api/data', {
	  headers: {
		'Authorization': `Bearer ${localStorage.getItem('token')}` 
	  }
	})
	.then(response => {
	  setData(response.data);
	})
	.catch(error => {
	  console.error('There was an error fetching the data!', error);
	});
  }, []);

  return (
	<div>
		<br />
		<Typography variant='h3'style={{  color: 'black', textAlign: 'center',fontSize:'170%',fontWeight:'bold',fontStyle: 'italic' }}>
		INCOME  &nbsp; &   &nbsp; EXPENSE  &nbsp; LOGGING  &nbsp;FORM
		</Typography>
		<br /><br /><br />

		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
		<Typography variant='h3' style={{ padding: '0% 0%', color: 'black', fontSize: '250%', fontWeight: 'bold', textAlign: 'left',fontFamily:'times roman' }}>
			MY  &nbsp;  INCOME
		</Typography>
		
		<TextField variant='outlined' sx={{
			backgroundColor: 'white',
			width: '30%',
			height:'90%',
			textAlign: 'right'
			}}
			marginLeft='30%'
			label='INCOME AMOUNT'
			InputLabelProps={{
				sx: {
					color: 'lightgrey'
				}
			}}
		/>
		</div>
		<TextField variant='outlined' sx={{
			backgroundColor: 'white',
			borderRadius: 1,
			width: '40%',
			marginTop: 2
			}}
			label='AMOUNT'
			InputLabelProps={{
				sx: {
					color: 'lightgrey'
				}
			}}
		/>
		<br /><br /><br />
		<TextField variant='outlined' sx={{
			backgroundColor: 'white',
			borderRadius: 1,
			width: '40%',
			marginTop: 2
			}}
			label='CATEGORY'
			InputLabelProps={{
				sx: {
					color: 'lightgrey'
				}
			}}
		/>
		<br /><br /><br />
		<TextField variant='outlined' sx={{
			backgroundColor: 'white',
			borderRadius: '10%',
			width: '40%',
			marginTop: 2
			}}
			label='DATE'
			InputLabelProps={{
				sx: {
					color: 'lightgrey'
				}
			}}
		/>
		<br /><br /><br />
		<TextField variant='outlined' sx={{
			backgroundColor: 'white',
			borderRadius: '10%',
			width: '40%',
			marginTop: 2
			}}
			label='DESCRIPTION'
			InputLabelProps={{
				sx: {
					color: 'lightgrey'
				}
			}}
		/>
		<br /><br /><br /><br />
		<Button variant='contained' sx={{
			backgroundColor: 'grey',
			border: '1px solid black',
			width:'10%',
			color: 'black',
			marginLeft: 'auto'
			}}
			style={{ marginLeft: 'auto' }}
		>
			<Link to={'/dashboard'} 
				style={{textDecoration:"none",color:'white'}}> 
				ADD
			</Link> 
		</Button>
	</div>
  );
}

export default Dashboard;
