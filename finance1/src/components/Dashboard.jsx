import { useState, useEffect } from 'react';
import { TextField, Typography, Card, CardContent } from '@mui/material';
import axios from 'axios';

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/data', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}` 
      }
    })
    .then(response => {
      setData(response.data);
    })
    .catch(error => {
      console.error('There was an error fetching the data!', error);
    });
  }, []);

  return (
    <div>
      <Typography variant='h3' style={{ color: 'black', textAlign: 'center', fontSize: '170%', fontWeight: 'bold', fontStyle: 'italic' }}>
        DASHBOARD
      </Typography>
      <br /><br /><br />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h3' style={{ padding: '0% 0%', color: 'black', fontSize: '250%', fontWeight: 'bold', textAlign: 'left', fontFamily: 'times roman' }}>
          MY INCOME
        </Typography>
        <TextField
          variant='outlined'
          sx={{
            backgroundColor: 'white',
            width: '30%',
            height: '90%',
            textAlign: 'right'
          }}
          label='amount'
          InputLabelProps={{
            sx: {
              color: 'lightgrey'
            }
          }}
        />
      </div>
      <div>
        {data.map(item => (
          <Card key={item._id} style={{ margin: '20px', padding: '20px' }}>
            <CardContent>
              <Typography variant='h5'>ID: {item.id}</Typography>
              <Typography variant='h6'>Title: {item.title}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
