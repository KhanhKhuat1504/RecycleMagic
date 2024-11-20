import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Import a check mark icon
import { Scanner } from '@yudiel/react-qr-scanner';
import { doc, updateDoc } from 'firebase/firestore'; // Import Firestore updateDoc function
import { db } from '../configuration'; // Ensure your Firebase configuration is correctly imported

function formatCollection(rawValue) {
  // Split by '=' and take the part to the left
  const [leftSide] = rawValue.split('=');
  return leftSide;
}

function formatDocID(rawValue) {
  // Split by '=' and take the part to the right
  const [, rightSide] = rawValue.split('=');
  return rightSide;
}

function ScannerScreen({ onScan }) {
  const [scanned, setScanned] = useState(false); // State to track if a scan is completed

  const handleScan = async (data) => {
    if (data) {
      const collectionName = formatCollection(data[0].rawValue); // Extract collection name from QR code
      const documentID = formatDocID(data[0].rawValue); // Extract document ID from QR code

      try {
        const docRef = doc(db, collectionName, documentID); // Get the document reference
        await updateDoc(docRef, { status: 'recycled' }); // Update the status to "recycled"
        console.log('Document successfully updated!');
      } catch (error) {
        console.error('Error updating document: ', error);
      }

      setScanned(true); // Mark the bottle as scanned
      onScan(data); // Call the onScan prop function
    }
  };

  const handleRescan = () => {
    setScanned(false); // Reset the scanned state to allow scanning another bottle
  };

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
      {!scanned ? (
        <Card sx={{ width: 300 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              <strong>RecycleMagic Staff</strong>
            </Typography>
            <br />
            <Typography variant="body2" color="text.secondary">
              Scan the QR code on the bottle to mark it as recycled.
            </Typography>
            <br />
            <Scanner onScan={handleScan} />
          </CardContent>
        </Card>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Card sx={{ width: 300 }}>
            <CardContent>
              <CheckCircleIcon sx={{ fontSize: 100, color: 'green' }} /> {/* Check mark icon */}
              <Typography variant="h5" component="div" sx={{ marginTop: 2 }}>
                <strong>Bottle Scanned!</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 3 }}>
                You have successfully marked this bottle as recycled.
              </Typography>
              <Button variant="contained" color="primary" onClick={handleRescan}>
                Scan Another Bottle
              </Button>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
}

export default ScannerScreen;
