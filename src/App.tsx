import getRouter from './router/router';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import { ToastContainer } from 'react-toastify';
import ConfigAxios from './components/ConfigAxios';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import toastUtil from './utils/toastUtil';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { ConfigProvider } from 'antd';

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: err => {
            if (err?.message) {
                toastUtil.error(err.message);
            }
        },
    }),
});

export default function App() {
    return (
        <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <QueryClientProvider client={queryClient}>
                        <ConfigAxios store={store}>
                            <RouterProvider router={getRouter(store)} />
                            <ToastContainer limit={5} />
                        </ConfigAxios>
                        {/* <ReactQueryDevtools /> */}
                    </QueryClientProvider>
                </PersistGate>
            </Provider>
        </ConfigProvider>
    );
}
