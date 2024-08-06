import React from 'react';
import { Typography, Button, Container, Box, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Home = () => {
    return (
        <HomeWrapper>
            <StyledContainer>
                <ContentBox mt={4} textAlign="center">
                    <Typography variant="h2" gutterBottom className="mainTitle">
                        Welcome to SpendSmart
                    </Typography>
                    

                    <Box mt={8} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Typography
            variant="h6"
            sx={{
               
                padding: '10px',
                borderRadius: '5px',
                textAlign: 'center',
                marginBottom: '2rem',
                color: 'white',
                textShadow: `
                1px 1px 2px rgba(0, 0, 0, 0.8), /* Dark shadow for depth */
                -1px -1px 2px rgba(0, 0, 0, 0.8) /* Additional shadow for each letter */
            `,
            }}
        >
            Already have an account?<br /> Log in to access your dashboard.
        </Typography>
              
        <StyledButton
    variant="outlined"
    component={Link}
    to="/login"
    className="loginButton"
    sx={{
        backgroundColor: 'white', // Set background color to white
        color: '#007bff', // Set text color to contrast with the white background
        borderColor: '#007bff', // Set border color to match the text color
        borderRadius: '20px',
        fontWeight: 'bold',
        fontSize: '1rem',
        textTransform: 'uppercase',
        marginLeft:'7rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)', // Keep the shadow
        '&:hover': {
            backgroundColor: '#e6e6e6', // Lighter shade on hover
            borderColor: '#0056b3', // Darker border color on hover
            color: '#0056b3', // Change text color on hover
        }
    }}
>
    Log In
</StyledButton>

    </Box>

    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <Typography
            variant="h6"
            sx={{
                
                padding: '10px',
                borderRadius: '5px',
                textAlign: 'center',
                marginBottom: '2rem',
                color: 'white',
                textShadow: `
                1px 1px 2px rgba(0, 0, 0, 0.8), /* Dark shadow for depth */
                -1px -1px 2px rgba(0, 0, 0, 0.8) /* Additional shadow for each letter */
            `,
            }}
        >
            Haven't joined yet? <br />Start by signing up
        </Typography>

        <StyledButton
            variant="contained"
            color="primary"
            component={Link}
            to="/signup"
            className="signupButton"
            sx={{ 
              marginLeft: 'auto', // Pushes the button to the right side
              marginRight: '9rem' // Adjust margin as needed
          }}
        >
            Sign Up
        </StyledButton>
    </Box>
</Box>


                </ContentBox>
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <Typography
    variant="h3"
    gutterBottom
    className="subTitle"
    textAlign="center"
    sx={{
        color: 'white',
        textShadow: `
            1px 1px 2px rgba(0, 0, 0, 0.8), /* Dark shadow for depth */
            -1px -1px 2px rgba(0, 0, 0, 0.8) /* Additional shadow for each letter */
        `,
        fontWeight: 500, /* Optional: adjust font weight for better visibility */
        fontFamily: 'Roboto, sans-serif' /* Optional: adjust font family if needed */
    }}
>
    Manage your finances with ease and confidence
</Typography>




                <ContentBox mt={8} textAlign="center">
                    <Typography variant="h4" gutterBottom className="sectionTitle">
                        About Us
                    </Typography>
                    <Typography variant="body1" className="aboutText">
                        At SpendSmart, we are dedicated to helping you manage your finances effectively. Our platform offers simple and intuitive tools to track your spending, set budgets, and achieve your financial goals. Whether you're looking to save more or invest wisely, SpendSmart provides the resources and guidance you need to take control of your financial future.
                    </Typography>
                </ContentBox>

                <ContentBox mt={8} textAlign="center">
                    <Typography variant="h4" gutterBottom className="sectionTitle">
                        Our Features
                    </Typography>
                    <Grid container spacing={4} justifyContent="center">
                        <Grid item xs={12} sm={6} md={4}>
                            <FeatureCard>
                                <Box p={2}>
                                    <Typography variant="h6" className="featureTitle">Feature 1: Budget Tracking</Typography>
                                    <Typography variant="body1" className="featureText">
                                        Easily track your income and expenses with our intuitive budgeting tools. Set monthly budgets, categorize your spending, and get insights into your financial habits.
                                    </Typography>
                                </Box>
                            </FeatureCard>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FeatureCard>
                                <Box p={2}>
                                    <Typography variant="h6" className="featureTitle">Feature 2: Financial Goals</Typography>
                                    <Typography variant="body1" className="featureText">
                                        Set and monitor your financial goals with personalized plans. Whether saving for a vacation or planning for retirement, our tools help you stay on track and motivated.
                                    </Typography>
                                </Box>
                            </FeatureCard>
                        </Grid>
                    </Grid>
                </ContentBox>
            </StyledContainer>
<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <Footer>
                &copy; 2024 SpendSmart. All rights reserved.
            </Footer>
        </HomeWrapper>
    );
};

const HomeWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: url('https://s1.ezgif.com/tmp/ezgif-1-09cf1b5d84.gif') no-repeat center center;
  background-size: cover;
  background-color: #050509; /* Darker blueish-black background color */
  color: white;
  padding: 0;
  margin: 0;
`;

const StyledContainer = styled(Container)`
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentBox = styled(Box)`
  z-index: 1;

  .mainTitle, .subTitle, .sectionTitle, .aboutText {
    color: white; /* Keep the text color white or adjust as needed */
  }

  .mainTitle {
    font-size: 3rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: #ffffff; /* White text color for the title */
    text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.7); /* Extra shadow for prominence */
    border: 2px solid #ffffff; /* Extra border for prominence */
    padding: 10px; /* Padding to make border visible */
    border-radius: 8px; /* Rounded corners for the border */
  }

  .subTitle {
    font-size: 1.5rem;
    font-weight: 400;
    color: #ffffff; /* White text color for the subtitle */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6); /* Extra shadow for prominence */
  }

  .sectionTitle {
    font-size: 2rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    color: black; /* Black color for the section title */
  }

  .aboutText {
    font-size: 1.2rem;
    font-weight: 300;
    line-height: 1.5;
    color: black; /* Black color for the about text */
  }

  .featureTitle {
    font-size: 1.5rem;
    font-weight: 500;
    color: black; /* Black color for feature title */
  }

  .featureText {
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.5;
    color: black; /* Black color for feature text */
  }
`;

const StyledButton = styled(Button)`
  &.signupButton {
    background-color: #007bff;
    color: white;
    border-radius: 20px;
    font-weight: bold;
    font-size: 1rem;
    text-transform: uppercase;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    margin-right: 16px;

    &:hover {
      background-color: #0056b3;
    }
  }

  &.loginButton {
    border-color: white;
    color: #007bff;
    border-radius: 20px;
    font-weight: bold;
    font-size: 1rem;
    text-transform: uppercase;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);

    &:hover {
      border-color: #0056b3;
      color: #0056b3;
    }
  }
`;

const FeatureCard = styled.div`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Adjust the shadow as needed */
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 16px;
`;

const Footer = styled.footer`
  background-color: #007BFF;
  color: #fff;
  padding: 20px 0;
  text-align: center;
  font-size: 1rem;
`;

export default Home;
