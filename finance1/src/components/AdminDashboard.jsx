// adminDashboard.jsx
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
	const navigate = useNavigate();
	var [output,setOutput] = useState([]);
	var errTimes = -1;
	
	const loadData = ()=>{
		axios.get("http://localhost:3000/api/admin/getUserList", {
			headers: {
				"Authorization": `Bearer ${Cookies.get("session")}`
			}
		}).then(
			(res)=>{
				setOutput(res.data);
			}
		).catch(
			(err)=>{
				if (errTimes === 0) {
					alert(err.response.data);
					navigate("/");
				}
				else {
					errTimes = errTimes + 1;
				}
			}
		)
	};
	
	const deleteUser = (id)=>{
		axios.delete("http://localhost:3000/api/admin/deleteUser/" + id,{
			headers: {
				"Authorization": `Bearer ${Cookies.get("session")}`
			}
		}).then(
			(res)=>{
				loadData();
			}
		).catch(
			(err)=>{
				console.error(err);
			}
		)
	};

	function BlockButton(id,status) {
		function Enabled() {
			return (
				<Button color='secondary' variant='contained' onClick={()=>{
					blockUser(id,status);
				}}>Block</Button>
			)
		}
		function Disabled() {
			return (
				<Button color='secondary' variant='contained' onClick={()=>{
					blockUser(id,status);
				}}>Unblock</Button>
			)
		}
		if (status == 1) {
			return Disabled();
		}
		else {
			return Enabled();
		}
	}

	const blockUser = (id,blocked)=>{
		axios.post("http://localhost:3000/api/admin/blockUser/" + id,{
			data: {
				token: `Bearer ${Cookies.get("session")}`,
				blockStatus: blocked
			}
		}).then(
			(res)=>{
				loadData();
			}
		).catch(
			(err)=>{
				console.error(err);
			}
		)
	}

	useEffect(()=>{
		loadData();
	},[]);
	
	return (
		<div>
			<Typography variant='h3' style={{ color: 'black', textAlign: 'center', fontSize: '170%', fontWeight: 'bold', fontStyle: 'italic' }}>
				ADMIN DASHBOARD
			</Typography>
			<br /><br />
			<Typography variant='h4'>Users: {output.length}</Typography>
			<br />
			<Button variant='contained' color='success' onClick={()=>{
				loadData();
			}}>Refresh</Button>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell><Typography variant='h6'>USERNAME</Typography></TableCell>
							<TableCell><Typography variant='h6'>LAST LOGIN</Typography></TableCell>
							<TableCell><Typography variant='h6'>ACTIONS</Typography></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{output.map((val,i)=>{
							return (
								<TableRow key={i}>
									<TableCell><Typography variant='h7'>{val.username}</Typography></TableCell>
									<TableCell><Typography variant='h7'>{val.lastlogin}</Typography></TableCell>
									<TableCell>
										<Button color='primary' variant='contained' onClick={()=>{
											navigate('/admin/userdashboard',{state:val})
										}}>View dashboard</Button>&nbsp;&nbsp;
										{BlockButton(val._id,val.blocked)}&nbsp;&nbsp;
										<Button color='error' variant='contained' onClick={()=>{
											deleteUser(val._id);
										}}>Delete</Button>
									</TableCell>
								</TableRow>
							)
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	)
}

export default AdminDashboard;
