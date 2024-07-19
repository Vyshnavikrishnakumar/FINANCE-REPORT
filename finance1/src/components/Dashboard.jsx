import { TextField, Typography } from '@mui/material'
import React from 'react'

const Dashboard = () => {
  return (
    <div>
        <br />
      <Typography variant='h3'style={{  color: 'black', textAlign: 'center',fontSize:'170%',fontWeight:'bold',fontStyle: 'italic' }}>
      DASHBOARD </Typography>
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
          label='amount'
          InputLabelProps={{
            sx: {
              color: 'lightgrey'
            }
          }}
        />
      </div>
    </div>
  )
}

export default Dashboard
