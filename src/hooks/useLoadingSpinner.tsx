/**
* Copyright (c) 2024 Wonderbricks Limited
* All rights reserved.
*
* This source code is proprietary and confidential. It is not to be
* distributed or copied without express written permission from Wonderbricks Limited. 
*/
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

// Hook to control the spinner
function useLoadingSpinner() {
    const [isLoading, setLoading] = useState(false);

    // Component that will render the spinner
    const Spinner = () => (
        <Backdrop open={isLoading} style={{ backgroundColor: "rgba(255,255,255,0.7)", color: 'rgb(0,0,0,0.5)', zIndex: 10 ** 7 }}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );

    return {
        setLoading, // Function to set loading state
        Spinner,    // Spinner component
    };
}

export default useLoadingSpinner;