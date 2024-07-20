import { Button, TextField, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Add = () => {
  return (
    <div>
        <br />
      <Typography variant='h3'style={{  color: 'black', textAlign: 'center',fontSize:'170%',fontWeight:'bold',fontStyle: 'italic' }}>
      
INCOME  &nbsp; &   &nbsp; EXPENSE  &nbsp; LOGGING  &nbsp;FORM</Typography>
      <br /><br /><br />

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h3' style={{ padding: '0% 0%', color: 'black', fontSize: '250%', fontWeight: 'bold', textAlign: 'left',fontFamily:'times roman' }}>
          MY  &nbsp;  INCOME
        </Typography>
        <TextField
          variant='outlined'
          sx={{
           
            backgroundColor: 'white',
            width: '30%',
            height:'90%',
            textAlign: 'right'
            // marginRight:'30%'
            
          }}
          marginLeft='30%'
          label='INCOME AMOUNT'
          InputLabelProps={{
            sx: {
              color: 'lightgrey'
            }
          }}
        />
      </div>
      <TextField variant='outlined' sx={{
          backgroundColor: 'white',
          borderRadius: 1,
          width: '40%',
          marginTop: 2
        }} label='AMOUNT'  InputLabelProps={{
            sx: {
              color: 'lightgrey'
            }
          }}></TextField>
          <br /><br /><br />
      <TextField variant='outlined' sx={{
          backgroundColor: 'white',
          borderRadius: 1,
          width: '40%',
          marginTop: 2
        }} label='CATEGORY'  InputLabelProps={{
            sx: {
              color: 'lightgrey'
            }
          }}></TextField>
      <br /><br /><br />
      <TextField variant='outlined'sx={{
          backgroundColor: 'white',
          borderRadius: '10%',
          width: '40%',
          marginTop: 2
        }} label='DATE'  InputLabelProps={{
            sx: {
              color: 'lightgrey'
            }
          }}></TextField>
            <br /><br /><br />
            <TextField variant='outlined'sx={{
          backgroundColor: 'white',
          borderRadius: '10%',
          width: '40%',
          marginTop: 2
        }} label='DESCRIPTION'  InputLabelProps={{
            sx: {
              color: 'lightgrey'
            }
          }}></TextField>
      
     
<br /><br /><br /><br />


      <Button variant='contained' sx={{
                backgroundColor: 'grey',
                border: '1px solid black',
                width:'10%',
                color: 'black',
                marginLeft: 'auto'
              }} style={{ marginLeft: 'auto' }}>
               <Link to={'/c'} 
                  style={{textDecoration:"none",color:'white'}}> 
                  ADD
                  </Link> 
            </Button>
    </div>
  )
}

export default Add
