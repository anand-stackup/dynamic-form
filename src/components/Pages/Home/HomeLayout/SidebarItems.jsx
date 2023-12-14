import React from 'react'
import { useDrag } from "react-dnd";

const SidebarItems = ({input}) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "string",
        item: {type: input.type},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

  return (
    <div className="sidebar-items" ref={drag} style={{opacity: isDragging ? 0 : 1}} >{input.type}</div>
  )
}

export default SidebarItems