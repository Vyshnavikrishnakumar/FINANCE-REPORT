import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'universal-cookie'
import Logo from '../assets/Logo.png'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Admin = () => {
	const navigate = useNavigate();
	const cookies = new Cookies();

	const [showPassword, setShowPassword] = React.useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

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
			required
			autoFocus
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

		<FormControl sx={{ m: 1, width: '40%' }} variant="outlined">
			<InputLabel sx={{color:'lightgrey'}}>Password</InputLabel>
			<OutlinedInput
			type={showPassword ? 'text' : 'password'}
			endAdornment={
				<InputAdornment position="end">
				<IconButton
					aria-label="toggle password visibility"
					onClick={handleClickShowPassword}
					onMouseDown={handleMouseDownPassword}
					edge="end"
				>
					{showPassword ? <VisibilityOff /> : <Visibility />}
				</IconButton>
				</InputAdornment>
			}
			label="Password"
			required
			onChange={inputHandler}
			onKeyDown={defaultKey}
			name='password'
			sx={{
				backgroundColor: 'white'}}
				InputLabelProps={{
					sx: {
						color: 'lightgrey'
					}
				}}
			/>
        </FormControl>
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
