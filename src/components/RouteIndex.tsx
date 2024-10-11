import { Outlet } from "react-router-dom"
import FadeIn from "./FadeIn"

export default () => {
    return <div style={{
        height: "100%",
        width: "100%",
        position: "relative",
        marginBottom: 15
    }}>
        <Outlet />
        {/* <AppLoading /> */}
    </div>
}