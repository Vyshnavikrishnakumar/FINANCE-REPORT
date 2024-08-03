import { useState } from 'react';
import { TextField, Typography, Button, Container, Paper, Box, Grid, FormControl, Select, MenuItem, FormHelperText } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Cookies from 'js-cookie';

const Dashboard = () => {
	const [inputs,setInputs] = useState({
		income:0,
		category:"None",
		description:"None"
	});
	const inputHandler = (e)=>{
		setInputs({...inputs,[e.target.name]:e.target.value});
	};

	const addIncome = ()=>{
		inputs["type"] = type;
		inputs["date"] = dayjs(date);
		axios.post("http://localhost:3000/api/addRecord",inputs,{
			headers: {
				"Authorization": `Bearer ${Cookies.get("session")}`
			}
		}).then(
			(res)=>{
				alert("Added record");
				navigate("/dashboard");
			}
		).catch(
			(err)=>{
				alert(err.response.data);
			}
		);
	};

	const [type, setType] = useState('credit');
	const typeChange = (event) => {
		setType(event.target.value);
	};

	const [date, setDate] = useState(dayjs(new Date()));

  return (
	<div>
		<Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
		<Paper elevation={3} sx={{ p: 3 }}>
		<Typography variant="h3" sx={{ color: 'black', textAlign: 'center', fontSize: '170%', fontWeight: 'bold', fontStyle: 'italic' }}>
			INCOME & EXPENSE LOGGING FORM
		</Typography>
		<Box component="form" sx={{ mt: 3 }}>
			<Grid container spacing={3}>
			<Grid item xs={12} sm={6}>
				<TextField
				name='income'
				fullWidth
				variant="outlined"
				label="AMOUNT"
				required
				onChange={inputHandler}
				InputLabelProps={{ sx: { color: 'lightgrey' } }}
				/>
			</Grid>
			<FormControl sx={{ m: 1, minWidth: 120 }}>
					<FormHelperText>Type</FormHelperText>
					<Select
					value={type}
					onChange={typeChange}
					>
					<MenuItem value={'credit'}>Credit</MenuItem>
					<MenuItem value={'debit'}>Debit</MenuItem>
					</Select>
				</FormControl>
			<Grid item xs={12}>
				<TextField
				name='category'
				fullWidth
				variant="outlined"
				label="CATEGORY"
				onChange={inputHandler}
				InputLabelProps={{ sx: { color: 'lightgrey' } }}
				/>
			</Grid>
			<Grid item xs={12}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DemoContainer
				components={[
					'DatePicker'
				]}
				>
				<DemoItem>
					<DatePicker
					label='Date'
					format='DD / MM / YYYY'
					value={date}
					onChange={setDate}
					/>
				</DemoItem>
				</DemoContainer>
			</LocalizationProvider>
			</Grid>
			<Grid item xs={12}>
				<TextField
				name='description'
				fullWidth
				variant="outlined"
				label="DESCRIPTION"
				onChange={inputHandler}
				multiline
				rows={3}
				InputLabelProps={{ sx: { color: 'lightgrey' } }}
				/>
			</Grid>
			<Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Button
					variant="contained"
					sx={{
						backgroundColor: 'grey',
						color: 'white',
						marginRight: '10px'
					}}
					>
					<Link to={'/dashboard'} style={{ textDecoration: "none", color: 'white' }}>
						RETURN TO DASHBOARD
					</Link>
				</Button>
				<Button
					variant="contained"
					sx={{
						background:'#4cd964'
					}}
					onClick={addIncome}
					>
					SAVE
				</Button>
			</Grid>
			</Grid>
		</Box>
		</Paper>
	</Container>
	</div>
  );
}

export default Dashboard;
