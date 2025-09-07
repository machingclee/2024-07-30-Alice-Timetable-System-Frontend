import getRouter from './router/router';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';

import ConfigAxios from './components/ConfigAxios';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import ThemeProvider from './components/ThemeProvider';
import { Toaster } from './components/ui/toaster';

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <ConfigAxios store={store}>
                    <ThemeProvider>
                        <RouterProvider router={getRouter(store)} />
                        <Toaster />
                    </ThemeProvider>
                </ConfigAxios>
            </PersistGate>
        </Provider>
    );
}
