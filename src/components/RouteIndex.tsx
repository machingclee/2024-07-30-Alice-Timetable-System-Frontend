import { Outlet } from 'react-router-dom';

export default function RouteIndex() {
    return (
        <div
            style={{
                height: '100%',
                width: '100%',
                position: 'relative',
                marginBottom: 15,
            }}
        >
            <Outlet />
            {/* <AppLoading /> */}
        </div>
    );
}
