import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, Button, Container, Paper, Box, Grid } from '@mui/material';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const Dashboard = () => {
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	const [total, setTotal] = useState({});
	const [name, setName] = useState("user");
	var errTimes = -1;

	function TransactionHeading(transaction,income,description) {
		function Credit() {
			return (
				<Typography variant="h6" sx={{ fontWeight:'bold', color:'#4cd964' }}>+ ₹{income} ({description})</Typography>
			)
		}
		function Debit() {
			return (
				<Typography variant="h6" sx={{ fontWeight:'bold', color:'#ff3b30' }}>- ₹{income} ({description})</Typography>
			)
		}
		
		if (transaction === "credit") {
			return Credit();
		}
		else {
			return Debit();
		}
	}

	const refreshDashboard = () => {
		axios.get('http://localhost:3000/api/dashboard', {
			headers: {
				"Authorization": `Bearer ${Cookies.get("session")}`
			}
		})
		.then(response => {
			setTotal(response.data.total);
			setData(response.data.records);
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
	}

	function deleteRecord(index) {
		axios.delete('http://localhost:3000/api/deleteRecord/' + index, {
			headers: {
				"Authorization": `Bearer ${Cookies.get("session")}`
			}
		})
		.then(response => {
			refreshDashboard();
		})
		.catch(err => {
			alert(err.response.data);
		});
	}

	function getName() {
		axios.get('http://localhost:3000/api/getName', {
			headers: {
				"Authorization": `Bearer ${Cookies.get("session")}`
			}
		})
		.then(response => {
			setName(response.data.name);
		})
		.catch(err => {
			console.log(err.response.data);
		});
	}

	useEffect(() => {
		getName();
		refreshDashboard();
	}, []);

  return (
	<div>
		<Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
		<Paper elevation={3} sx={{ p: 3 }}>
		<Typography variant="h3" sx={{ color: 'black', textAlign: 'center', fontSize: '170%', fontWeight: 'bold', fontStyle: 'italic' }}>
		{name} - DASHBOARD
		</Typography>
		<Typography mt={3} variant="h5" sx={{ color: 'grey', fontWeight: 'bold', fontFamily: 'Times New Roman' }}>
		Balance: ₹{total.balance} &nbsp;&nbsp;&nbsp; Spent: ₹{total.spent}
		</Typography>
		<Box sx={{ mt: 3 }}>
			<Typography variant="h5" sx={{ color: 'black', fontWeight: 'bold', textAlign: 'center', fontFamily: 'Times New Roman', mb: 2 }}>
			Transactions - {data.length} (Credit:{total.credits}, Debit:{total.debits})
			</Typography>
			<Box sx={{ mt: 3, mb: 3 }}>
				<Button
				variant="contained"
				sx={{
					backgroundColor: 'grey',
					color: 'white'
				}}
				>
				<Link to={'/dashboard/add'} style={{ textDecoration: "none", color: 'white' }}>
					ADD RECORD
				</Link>
				</Button>
			</Box>
			<Grid container spacing={3}>
			{data.map(item => (
				<Grid item xs={12} key={item.index}>
				<Card sx={{ backgroundColor: 'white', borderRadius: 1, boxShadow: 3 }}>
					<CardContent>
					{TransactionHeading(item.type, item.income, item.category)}
					<Typography variant="body1">Description: {item.description}</Typography>
					<Typography variant="body2">Date: {item.date}</Typography>
					<Button sx={{color:'#ff3b30', marginTop:'10px'}} onClick={()=>{deleteRecord(item.index)}}><DeleteRoundedIcon />Delete</Button>
					</CardContent>
				</Card>
				</Grid>
			))}
			</Grid>
		</Box>
		</Paper>
	</Container>
	</div>
  );
}

export default Dashboard;
