import { Box, Button, CircularProgress, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Admin = () => {
	const navigate = useNavigate();
	const cookies = new Cookies();
	const [loginFlag, setLoginFlag] = useState(false);

	function LoadingCircle() {
		return <CircularProgress />;
	}

	const [showPassword, setShowPassword] = useState(false);
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

	const defaultKey = (event) => {
		if (event.code === "Enter" || event.code === "NumpadEnter") {
			loginAdmin();
		}
	};

	const loginAdmin = () => {
		setLoginFlag(true);
		axios.post("http://localhost:3000/api/admin/signin", inputs).then(
			(res) => {
				setLoginFlag(false);
				cookies.set('session', res.data.token, { path: '/', secure: true, sameSite: true });
				navigate("/admin/dashboard");
			}
		).catch(
			(err) => {
				setLoginFlag(false);
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
				ADMIN LOGIN
			</Typography>
<br /><br /><br />
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
			><br /><br />
				<TextField
					required
					autoFocus
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
				/> <br /><br /><br /><br />

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
						<br /><br /><br /><br /><br />
				<Button onClick={loginAdmin} variant='contained' sx={{
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
					Login
				</Button>

				{loginFlag ? <LoadingCircle /> : null}

				
			</Box>
		</Box>
	)
}

export default Admin;
