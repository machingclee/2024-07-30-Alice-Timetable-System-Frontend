import getEnv from "../utils/getEnv";

const ENV = getEnv().VITE_ENV;

export default (props: { label: string, offsetTop?: number, offsetLeft?: number }) => {
    const { label, offsetLeft = 0, offsetTop = 0 } = props;
    if (ENV === "prod") {
        return null;
    }
    return (
        <div style={{ position: "relative" }}>
            <div style={{
                fontSize: 12,
                left: 0,
                top: 0,
                backgroundColor: "rgba(255,255,255,0.7)",
                padding: "4px 10px",
                border: "1px solid rgb(0,0,255,0.4)",
                color: "rgb(0,0,255,0.4)",
                borderRadius: 4,
                zIndex: 10 ** 7,
                fontWeight: 600,
                position: "absolute",
                pointerEvents: "none",
                transform: `translate(${offsetLeft - 20}px,${offsetTop - 10}px)`
            }}>
                {label}
            </div>
        </div>
    )
}