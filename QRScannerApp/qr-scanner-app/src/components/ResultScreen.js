import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore methods
import { db } from '../configuration'; // Adjust the import based on your file structure

function formatTitle(rawValue) {
    // Split by '=' and take the part to the left
    const [leftSide] = rawValue.split('=');
    
    // Replace underscores with spaces and capitalize each word
    const formatted = leftSide
        .split('_') // Split words at underscores
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
        .join(' '); // Join the words back with spaces

    return formatted;
}

function formatCollection(rawValue) {
    // Split by '=' and take the part to the left
    const [leftSide] = rawValue.split('=');

    // return the left side
    return leftSide;
}

function formatDocID(rawValue) {
    // Split by '=' and take the part to the right
    const [, rightSide] = rawValue.split('=');

    // return the right side
    return rightSide;
}


function ResultScreen({ result }) {
    const [recycleData, setRecycleData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecycleInfo = async () => {
            if (!result) return;

            try {
                // Assume 'recyclingInfo' is the collection and `result` is the document ID
                const docRef = doc(db, formatCollection(result[0].rawValue), formatDocID(result[0].rawValue));
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setRecycleData(docSnap.data()); // Set the document data
                    console.log('Document data:', docSnap.data());
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error fetching document:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecycleInfo();
    }, [result]);

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column', // Align items in a column
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                gap: 2, // Adds space between the elements
            }}
        >
            <h1>{formatTitle(result[0].rawValue)}</h1>
            <Card sx={{ width: '80%' }}>
                <CardContent sx={{ textAlign: 'left' }}>
                    <Typography variant="h6" component="div">
                        <strong>How to Recycle</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {recycleData?.['how-to']?.length ? (
                            <ol>
                                {recycleData['how-to'].map((step, index) => (
                                    <li key={index}>{step}</li>
                                ))}
                            </ol>
                        ) : (
                            'No recycling instructions available.'
                        )}
                    </Typography>
                </CardContent>
            </Card>
            <Card sx={{ width: '80%' }}>
                <CardContent sx={{ textAlign: 'left' }}>
                    <Typography variant="h6" component="div">
                        <strong>Nearest Recycling Center</strong>
                    </Typography>
                    <br />
                    <Typography variant="body2" color="text.secondary">
                        {recycleData?.nearestCenter || 'No nearby recycling centers available.'}
                    </Typography>
                </CardContent>
            </Card>
            <Card sx={{ width: '80%' }}>
                <CardContent sx={{ textAlign: 'left' }}>
                    <Typography variant="h6" component="div">
                        <strong>Where It Came From</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {recycleData?.origin?.length ? (
                            <ul>
                                {recycleData.origin.map((item, index) => {
                                    const [label, value] = item.split(':');
                                    return (
                                        <li key={index}>
                                            <strong>{label.trim()}:</strong> {value.trim()}
                                        </li>
                                    );
                                })}
                            </ul>
                        ) : (
                            'No origin information available.'
                        )}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}

export default ResultScreen;
