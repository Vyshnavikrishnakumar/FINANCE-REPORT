import { Box, Button, CircularProgress, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import Logo from '../assets/Logo.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Signup = () => {
	const [loginFlag, setloginFlag] = useState(false);

	function LoadingCircle() {
		return <CircularProgress />;
	}

	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const [inputs, setInputs] = useState({
		name: "",
		phoneNumber: "",
		email: "",
		username: "",
		password: ""
	});

	const inputHandler = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};

	const defaultKey = (event) => {
		if (event.code === "Enter" || event.code === "NumpadEnter") {
			addUser();
		}
	};

	const addUser = () => {
		setloginFlag(true);
		axios.post("http://localhost:3000/api/signup", inputs).then(
			(res) => {
				setloginFlag(false);
				alert("User created");
				navigate("/");
			}
		).catch(
			(err) => {
				setloginFlag(false);
				alert(err.response.data);
			}
		);
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				padding: '2rem',
				minHeight: '100vh',
				background: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
				justifyContent: 'center'
			}}
		>
			<img src={Logo} alt="Logo" style={{ height: 120, width: 500, borderRadius: 8, marginBottom: '1rem' }} />
			<br /><br />

			<Typography
				variant='h3'
				sx={{
					padding: '1rem',
					textAlign: 'center',
					fontSize: '2.5rem',
					fontWeight: 600,
					color: 'white',
					marginBottom: '2rem',
					fontFamily: 'Roboto, sans-serif',
					textTransform: 'uppercase',
					letterSpacing: '1px',
					textShadow: `
						1px 1px 0 rgba(0, 0, 139, 0.8), /* Dark blue outline */
						-1px -1px 0 rgba(0, 0, 139, 0.8),
						1px -1px 0 rgba(0, 0, 139, 0.8),
						-1px 1px 0 rgba(0, 0, 139, 0.8),
						0px 0px 4px rgba(0, 0, 139, 0.6) /* Soft glow */
					`
				}}
			>
				Sign Up
			</Typography>

			<Box sx={{
				background: 'rgba(255, 255, 255, 0.7)',
				borderRadius: 2,
				boxShadow: 3,
				padding: 4,
				width: '100%',
				maxWidth: 400,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center'
			}}
			>
				<TextField
					required
					autoFocus
					onChange={inputHandler}
					onKeyDown={defaultKey}
					name='name'
					variant='outlined'
					sx={{
						backgroundColor: '#fafafa',
						borderRadius: 1,
						width: '100%',
						marginBottom: 2,
					}}
					label='Name'
					InputLabelProps={{
						sx: {
							color: '#7f8c8d'
						}
					}}
				/>
				<TextField
					required
					onChange={inputHandler}
					onKeyDown={defaultKey}
					name='phoneNumber'
					variant='outlined'
					sx={{
						backgroundColor: '#fafafa',
						borderRadius: 1,
						width: '100%',
						marginBottom: 2,
					}}
					label='Phone Number'
					InputLabelProps={{
						sx: {
							color: '#7f8c8d'
						}
					}}
				/>
				<TextField
					required
					onChange={inputHandler}
					onKeyDown={defaultKey}
					name='email'
					variant='outlined'
					sx={{
						backgroundColor: '#fafafa',
						borderRadius: 1,
						width: '100%',
						marginBottom: 2,
					}}
					label='Email'
					InputLabelProps={{
						sx: {
							color: '#7f8c8d'
						}
					}}
				/>
				<TextField
					required
					onChange={inputHandler}
					onKeyDown={defaultKey}
					name='username'
					variant='outlined'
					sx={{
						backgroundColor: '#fafafa',
						borderRadius: 1,
						width: '100%',
						marginBottom: 2,
					}}
					label='Username'
					InputLabelProps={{
						sx: {
							color: '#7f8c8d'
						}
					}}
				/>
				<FormControl sx={{ width: '100%' }} variant="outlined">
					<InputLabel sx={{ color: '#7f8c8d' }}>Password</InputLabel>
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
							backgroundColor: '#fafafa',
							borderRadius: 1,
						}}
						InputLabelProps={{
							sx: {
								color: '#7f8c8d'
							}
						}}
					/>
				</FormControl>
				<br /><br />

				<Button onClick={addUser} variant='contained' sx={{
					borderRadius: '20px',
					marginTop: '20px',
					marginBottom: '10px',
					width: '100%',
					backgroundColor: '#3498db',
					color: 'white',
					'&:hover': {
						backgroundColor: '#2980b9',
					}
				}}>
					Sign Up
				</Button>
				<br /><br />

				{loginFlag ? <LoadingCircle /> : null}
			</Box>
		</Box>
	);
}

export default Signup;
