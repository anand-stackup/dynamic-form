import React, { useState, useRef } from "react";
import "./Sidebar.css";
import SidebarItems from "./SidebarItems";

const Sidebar = () => {

    const [inputs, setInputs] = useState([
        { type: "text" },
        { type: "textarea" },
        { type: "checkbox" },
        { type: "date" },
        { type: "file" },
    ]);

    return (
        <div className="sidebar">
            {inputs.map((input, index) => (
                <SidebarItems key={index} input={input} />
            ))}
        </div>
    );
};

export default Sidebar;
