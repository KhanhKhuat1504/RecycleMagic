import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import { Scanner } from '@yudiel/react-qr-scanner';

function ScannerScreen({ onScan }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full viewport height
        backgroundImage: `url(https://www.rainforest-alliance.org/wp-content/uploads/2020/11/peruvian-amazon-rainforest-canopy.jpg.optimal.jpg)`, // Replace with your image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Card sx={{ width: 300 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            <strong>RecycleMagic</strong>
          </Typography>
          <br />
          <Typography variant="body2" color="text.secondary">
            Scan the QR code on the bottle to learn more.
          </Typography>
          <br />
          <Scanner onScan={onScan} />
        </CardContent>
      </Card>
    </Box>
  );
}

export default ScannerScreen;
