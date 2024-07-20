import { Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Logo from '../assets/Logo.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
	const navigate = useNavigate();
	const [inputs,setInputs] = useState({
		"username":"",
		"password":""
	});

	const inputHandler = (e)=>{
		setInputs({...inputs,[e.target.name]:e.target.value});
	};

	const addUser = ()=>{
		axios.post("http://localhost:3000/api/signup",inputs).then(
			(res)=>{
				console.log("User created");
				alert("User created");
				navigate("/");
			}
		).catch(
			(err)=>{
				console.error(err);
			}
		);
	};

	return (
	<div >
		<img src={Logo} alt="Logo" style={{ height:160,width:900, marginLeft: 10,borderRadius:100 }} ></img>
		<br /><br />

		<Typography variant='h3'style={{ padding:'0%', color: 'black', textAlign: 'center',fontSize:'250%',fontWeight:'bold',fontStyle: 'italic' }}>
			SIGN UP
		</Typography>
		<br /><br />

		<TextField required onChange={inputHandler} name='username' variant='outlined' sx={{
			backgroundColor: 'white',
			borderRadius: 1,
			width: '40%',
			marginTop: 2}}
			label='Username'
			InputLabelProps={{
				sx: {
					color: 'lightgrey'
				}
			}}>
		</TextField>
		<br /><br /><br />

		<TextField required onChange={inputHandler} name='password' variant='outlined' type='password' sx={{
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
		
		<Button onClick={addUser} variant='contained' sx={{
			borderRadius: '20',
			width: '37%',
			backgroundColor: 'grey',
			color: 'white'}}>
			Sign Up
		</Button>			
	</div>
	)
}

export default Signup
