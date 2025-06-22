import getRouter from './router/router';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import { ToastContainer } from 'react-toastify';
import ConfigAxios from './components/ConfigAxios';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import ThemeProvider from './components/ThemeProvider';

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <ConfigAxios store={store}>
                    <ThemeProvider>
                        <RouterProvider router={getRouter(store)} />
                        <ToastContainer limit={5} />
                    </ThemeProvider>
                </ConfigAxios>
            </PersistGate>
        </Provider>
    );
}
