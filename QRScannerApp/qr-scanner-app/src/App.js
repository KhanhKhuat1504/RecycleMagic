import React, { useState } from 'react';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ScannerScreen from './components/ScannerScreen';
import ResultScreen from './components/ResultScreen';

const theme = createTheme({
  palette: {
    mode: 'light', // or 'dark' for dark mode
  },
});

function App() {
  const [scanned, setScanned] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const handleScan = (result) => {
    if (result) {
      setScanned(true);
      console.log(result);
      setScanResult(result);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {!scanned ? (
          <ScannerScreen onScan={handleScan} />
          //<ResultScreen result={scanResult} />
        ) : (
          <ResultScreen result={scanResult} />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
