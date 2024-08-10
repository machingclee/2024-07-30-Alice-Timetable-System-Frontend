import getRouter from "./router/router"
import { Provider } from "react-redux"
import { RouterProvider } from "react-router-dom"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "./redux/store"
import { ToastContainer } from "react-toastify"
import ConfigAxios from "./components/ConfigAxios"
import { OverlayScrollbarsComponent } from "overlayscrollbars-react"


function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <ConfigAxios store={store}>
                    <RouterProvider router={getRouter(store)} />
                    <ToastContainer
                        limit={1}
                    />
                </ConfigAxios>
            </PersistGate>
        </Provider>
    )
}

export default App
