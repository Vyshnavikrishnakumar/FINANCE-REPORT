import { AppBar, Box, Button, Toolbar } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/Logo.png'
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const Navbar = () => {
	const location = useLocation().pathname;
	const navigate = useNavigate();
	const cookies = new Cookies();
	
	function LoginButton() {
		function Code() {
			return (
				<Button variant='contained'
					sx={{
						backgroundColor: 'grey',
						border: '1px solid black',
						width:'10%',
						color: 'black',
						marginRight: '10px'
					}}>
					<Link to={'/'} style={{textDecoration:"none",color:'white'}}> 
						Login
					</Link>
				</Button>
				
			)
		}
		
		if (location === "/signup") {
			return Code();
		}
		else if (location === "/admin") {
			return Code();
		}
	}
	
	function SignUpButton() {
		function Code() {
			return (
				<Button variant='contained'
					sx={{
						backgroundColor: 'grey',
						border: '1px solid black',
						color: 'black',
						width:'10%',
						marginRight: '10px'
					}}>
					<Link to={'/signup'} style={{textDecoration:"none",color:'white'}}> 
						Sign Up
					</Link>
				</Button>
			)
		}
		
		if (location === "/") {
			return Code();
		}
		else if (location === "/admin") {
			return Code();
		}
	}
	
	function LogoutButton() {
		function Code() {
			return (
				<Button variant='contained'
					sx={{
						backgroundColor: 'grey',
						border: '1px solid black',
						color: 'white',
						width:'10%',
						marginRight: '10px',
						textDecoration: 'none'
					}} onClick={logOut}>
					Log Out
				</Button>
			)
		}
		
		if (location === "/dashboard") {
			return Code();
		}
		else if (location === "/admin/dashboard") {
			return Code();
		}
	}

	const logOut = ()=>{
		cookies.set('session', '', { path: '/', secure: true, sameSite: true });
		navigate("/");
		window.location.reload();
	};
	return (
	<div>
		<Box>
		<AppBar sx={{ backgroundColor: 'lightgrey' }}>
			<Toolbar>
			<img src={Logo} alt="Logo" style={{ height:60,width:120, marginLeft: 10, marginRight: 'auto'}} />			
			
			<LoginButton/>
			<SignUpButton/>
			<LogoutButton />
			
			</Toolbar>
		</AppBar>
		</Box>
		<br /><br /><br /><br />
	</div>
	)
}

export default Navbar
