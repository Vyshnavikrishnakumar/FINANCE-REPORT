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
	const deleteEmp = (id)=>{
		axios.delete("http://localhost:3000/api/admin/deleteUser/" + id).then(
			(res)=>{
				loadData();
			}
		).catch(
			(err)=>{
				console.error(err);
			}
		)
	};
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
							<TableCell>USERNAME</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{output.map((val,i)=>{
							return (
								<TableRow key={i}>
									<TableCell>{val.username}</TableCell>
									<TableCell>
										<Button color='primary' variant='contained' onClick={()=>{
											navigate('/admin/userdashboard',{state:val})
										}}>View Expenses</Button>&nbsp;&nbsp;
										<Button color='error' variant='contained' onClick={()=>{
											deleteEmp(val._id);
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
