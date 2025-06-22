import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@fontsource/roboto'; // Defaults to weight 400
import '@fontsource/roboto/400.css'; // Specify weight
import '@fontsource/roboto/400-italic.css'; // Specify weight and style
import 'overlayscrollbars/overlayscrollbars.css';
import { ClickToComponent } from 'click-to-react-component';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ClickToComponent editor="cursor" />
        <App />
    </React.StrictMode>
);
