import { useState, useEffect } from 'react';
import { TextField, Typography, Card, CardContent, Button } from '@mui/material';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Dashboard = () => {
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	var errTimes = -1;

	useEffect(() => {
		axios.get('http://localhost:3000/api/dashboard', {
			headers: {
				"Authorization": `Bearer ${Cookies.get("session")}`
			}
		})
		.then(response => {
			setData(response.data);
		})
		.catch(err => {
			if (errTimes === 0) {
				alert(err.response.data);
				navigate("/");
			}
			else {
				errTimes = errTimes + 1;
			}
		});
	}, []);

  return (
	<div>
		<Typography variant='h3' style={{ color: 'black', textAlign: 'center', fontSize: '170%', fontWeight: 'bold', fontStyle: 'italic' }}>
			DASHBOARD
		</Typography>
		<br /><br /><br />
		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
		<Typography variant='h3' style={{ padding: '0% 0%', color: 'black', fontSize: '250%', fontWeight: 'bold', textAlign: 'left', fontFamily: 'times roman' }}>
			MY INCOME
		</Typography>
		<TextField
			variant='outlined'
			sx={{
			backgroundColor: 'white',
			width: '30%',
			height: '90%',
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
		<Button variant='contained' sx={{
			backgroundColor: 'grey',
			border: '1px solid black',
			width:'10%',
			color: 'black',
			marginLeft: 'auto'
			}} style={{ marginLeft: 'auto' }}>
			<Link to={'/dashboard/add'} 
				style={{textDecoration:"none",color:'white'}}> 
				ADD
			</Link>
		</Button>
		<div>
		{data.map(item => (
			<Card key={item._id} style={{ margin: '20px', padding: '20px' }}>
			<CardContent>
				<Typography variant='h5'>ID: {item.id}</Typography>
				<Typography variant='h6'>Title: {item.title}</Typography>
			</CardContent>
			</Card>
		))}
		</div>
	</div>
  );
}

export default Dashboard;
