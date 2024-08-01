import { Button, CircularProgress, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import Logo from '../assets/Logo.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Signup = () => {
	const [loginFlag, setloginFlag] = useState(false);

	function LoadingCircle() {
		function Code() {
			return (
				<CircularProgress />
			)
		}
		return Code();
	}

	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const [inputs,setInputs] = useState({
		username:"",
		password:""
	});

	const inputHandler = (e)=>{
		setInputs({...inputs,[e.target.name]:e.target.value});
	};

	const defaultKey=(event)=> {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
            addUser();
        }
    };

	const addUser = ()=>{
		setloginFlag(true);
		axios.post("http://localhost:3000/api/signup",inputs).then(
			(res)=>{
				setloginFlag(false);
				alert("User created");
				navigate("/");
			}
		).catch(
			(err)=>{
				setloginFlag(false);
				alert(err.response.data);
			}
		);
	};

	return (
	<div >
		<img src={Logo} alt="Logo" style={{ height:160,width:320, marginLeft: 10,borderRadius:100 }} ></img>
		<br /><br />

		<Typography variant='h3'style={{ padding:'0%', color: 'black', textAlign: 'center',fontSize:'250%',fontWeight:'bold',fontStyle: 'italic' }}>
			SIGN UP
		</Typography>
		<br /><br />

		<TextField required autoFocus onChange={inputHandler} onKeyDown={defaultKey} name='username' variant='outlined' sx={{
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
		
		<Button onClick={addUser} variant='contained' sx={{
			borderRadius: '20',
			width: '37%',
			backgroundColor: 'grey',
			color: 'white'}}>
			Sign Up
		</Button>
		<br /><br />

		{ loginFlag ? <LoadingCircle/> : null }
		<br /><br />			
	</div>
	)
}

export default Signup
