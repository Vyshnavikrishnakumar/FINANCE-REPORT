// src/components/Add.jsx
import React, { useContext } from 'react';
import { TextField, Typography, Button, Box, Container, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import IncomeContext from './IncomeContext';  // Ensure the import matches the default export

const Add = () => {
  const { income, setIncome } = useContext(IncomeContext);

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h3" sx={{ color: 'black', textAlign: 'center', fontSize: '170%', fontWeight: 'bold', fontStyle: 'italic' }}>
          INCOME & EXPENSE LOGGING FORM
        </Typography>
        <Box component="form" sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ color: 'black', fontWeight: 'bold', textAlign: 'left', fontFamily: 'Times New Roman' }}>
                MY INCOME
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="INCOME AMOUNT"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                InputLabelProps={{ sx: { color: 'lightgrey' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="CATEGORY"
                InputLabelProps={{ sx: { color: 'lightgrey' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="DATE"
                InputLabelProps={{ sx: { color: 'lightgrey' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="DESCRIPTION"
                InputLabelProps={{ sx: { color: 'lightgrey' } }}
              />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: 'grey',
                  color: 'white'
                }}
              >
                <Link to={'/dashboard'} style={{ textDecoration: "none", color: 'white' }}>
                  ADD
                </Link>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

export default Add;
