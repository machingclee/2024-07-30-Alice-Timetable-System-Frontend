import { IoCloseSharp } from "react-icons/io5";

export default ({ onClick, width, marginTop }: { onClick: () => void; width?: string; marginTop?: string }) => {
    return (
        <div
            onClick={() => {
                onClick();
            }}
            style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", width: "100%", paddingTop: marginTop ? marginTop : "1rem", cursor: "pointer" }}
        >
            <IoCloseSharp style={{ width: width, height: "auto" }} />
        </div>
    );
}
