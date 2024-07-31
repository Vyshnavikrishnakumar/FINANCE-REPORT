import { Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'universal-cookie'
import Logo from '../assets/Logo.png'

const Admin = () => {
	const navigate = useNavigate();
	const cookies = new Cookies();
	const [inputs, setInputs] = useState({
		username: "",
		password: ""
	});

	const inputHandler = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};

	const defaultKey=(event)=> {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
            loginAdmin();
        }
    };

	const loginAdmin = () => {
		axios.post("http://localhost:3000/api/admin/signin", inputs).then(
			(res) => {
			alert("Login success");
			cookies.set('session', res.data.token, { path: '/', secure: true, sameSite: true });
			navigate("/admin/dashboard");
			}
		).catch(
			(err) => {
			alert(err["response"]["data"]);
			}
		);
	};
	return (
		<div>
		<img src={Logo} alt="Logo" style={{ height:160,width:320, marginLeft: 10,borderRadius:100 }}></img>
		<br /><br />
		
		<Typography variant='h3' style={{ padding:'0%', color: 'black', textAlign: 'center', fontSize:'250%', fontWeight:'bold', fontStyle: 'italic' }}>
			ADMIN LOGIN
		</Typography>
		<br /><br />

		<TextField 
			variant='outlined'
			name='username'
			value={inputs.username}
			onChange={inputHandler}
			onKeyDown={defaultKey}
			sx={{
			backgroundColor: 'white',
			borderRadius: 1,
			width: '40%',
			marginTop: 2
			}}
			label='Username'
			InputLabelProps={{
			sx: {
				color: 'lightgrey'
			}
			}}
		/>
		<br /><br /><br />

		<TextField 
			variant='outlined'
			type='password'
			name='password'
			value={inputs.password}
			onChange={inputHandler}
			onKeyDown={defaultKey}
			sx={{
			backgroundColor: 'white',
			borderRadius: '10%',
			width: '40%',
			marginTop: 2
			}}
			label='Password'
			InputLabelProps={{
			sx: {
				color: 'lightgrey'
			}
			}}
		/>
		<br /><br /><br />

		<Button 
			variant='contained'
			onClick={loginAdmin}
			sx={{
			borderRadius: '20',
			width: '37%',
			backgroundColor: 'grey',
			color: 'white'
			}}
		>
			LOGIN
		</Button>
		<br /><br />
		</div>
	)
}

export default Admin;
