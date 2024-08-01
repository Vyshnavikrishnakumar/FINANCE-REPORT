import React, { useState, useEffect } from 'react';
import { TextField, Typography, Card, CardContent, Button, Container, Paper, Box, Grid } from '@mui/material';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Dashboard = () => {
	const navigate = useNavigate();
	const { income, setIncome } = useState(0);
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
		<Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
		<Paper elevation={3} sx={{ p: 3 }}>
		<Typography variant="h3" sx={{ color: 'black', textAlign: 'center', fontSize: '170%', fontWeight: 'bold', fontStyle: 'italic' }}>
			DASHBOARD
		</Typography>
		<Box sx={{ mt: 3 }}>
			<Grid container spacing={3} alignItems="center">
			<Grid item xs={12} sm={6}>
				<Typography variant="h5" sx={{ color: 'black', fontWeight: 'bold', fontFamily: 'Times New Roman' }}>
				MY INCOME
				</Typography>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TextField
				fullWidth
				variant="outlined"
				label="Amount"
				value={income}
				onChange={(e) => setIncome(e.target.value)}
				sx={{ backgroundColor: 'white' }}
				InputLabelProps={{ sx: { color: 'lightgrey' } }}
				/>
			</Grid>
			</Grid>
		</Box>
		<Box sx={{ mt: 3 }}>
			<Typography variant="h5" sx={{ color: 'black', fontWeight: 'bold', textAlign: 'center', fontFamily: 'Times New Roman', mb: 2 }}>
			Recent Transactions
			</Typography>
			<Grid container spacing={3}>
			{data.map(item => (
				<Grid item xs={12} key={item._id}>
				<Card sx={{ backgroundColor: 'white', borderRadius: 1, boxShadow: 3 }}>
					<CardContent>
					<Typography variant="h6" sx={{ fontWeight: 'bold' }}>ID: {item.id}</Typography>
					<Typography variant="body1">Title: {item.title}</Typography>
					</CardContent>
				</Card>
				</Grid>
			))}
			</Grid>
		</Box>
		<Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
			<Button
			variant="contained"
			sx={{
				backgroundColor: 'grey',
				color: 'white'
			}}
			>
			<Link to={'/dashboard/add'} style={{ textDecoration: "none", color: 'white' }}>
				ADD
			</Link>
			</Button>
		</Box>
		</Paper>
	</Container>
	</div>
  );
}

export default Dashboard;
