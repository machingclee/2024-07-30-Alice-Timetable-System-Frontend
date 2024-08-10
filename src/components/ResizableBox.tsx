import React, { useState, useRef } from "react";

interface ResizableDivProps {
    nonNull: boolean;
    hourUnixTimestamp: number;
    courseName: string;
    setIsResizing: (resizing: boolean) => void;
}

const ResizableBox: React.FC<ResizableDivProps> = ({ nonNull, hourUnixTimestamp, courseName, setIsResizing }) => {
    const resizableRef = useRef<HTMLDivElement>(null);
    const [handleHeight, setHandleHeight] = useState<number>(20); // Initial height for the handle

    const startResizing = (mouseDownEvent: React.MouseEvent<HTMLDivElement>) => {
        const startY = mouseDownEvent.clientY;

        const doResize = (moveEvent: MouseEvent) => {
            const currentY = moveEvent.clientY;
            const heightDifference = currentY - startY; // Direct difference calculation
            const newHeight = Math.max(20, handleHeight + heightDifference); // Ensure minimum height of 20px

            setHandleHeight(newHeight);
            moveEvent.preventDefault(); // Prevent default to stop any unwanted behavior
        };

        const stopResizing = () => {
            window.removeEventListener("mousemove", doResize);
            window.removeEventListener("mouseup", stopResizing);
            setIsResizing(false);
        };

        window.addEventListener("mousemove", doResize, false);
        window.addEventListener("mouseup", stopResizing, false);
        setIsResizing(true);
    };

    return (
        <div
            style={{
                height: `70px`, // Main div height is fixed
                backgroundColor: nonNull ? "#4096ff" : "transparent",
                padding: "5px",
                borderRadius: "4px",
                fontSize: "12px",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                userSelect: "none", // Avoid text selection during drag
            }}
            key={hourUnixTimestamp}
        >
            {courseName}
            <div
                ref={resizableRef}
                className="handle"
                style={{
                    width: "100%",
                    height: `${handleHeight}px`, // Controlled by state
                    background: "#333",
                    cursor: "ns-resize",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                }}
                onMouseDown={startResizing}
            />
        </div>
    );
};

export default ResizableBox;
