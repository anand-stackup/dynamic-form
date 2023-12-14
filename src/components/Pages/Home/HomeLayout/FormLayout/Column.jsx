import React, { useState } from "react";
import { useDrop } from "react-dnd";

const Column = ({ col, colIndex, rowIndex, deleteColumn, formik }) => {
    const [type, setType] = useState("");

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "string",
        drop: (item) => {
            setType(item.type);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    function addDropValue(type, rowIndex, colIndex) {
        console.log(rowIndex, colIndex);
        formik.setFieldValue(
            `rows[${rowIndex}].cols[${colIndex}].value`,
            type
        );
    }

    return (
        <>
            <div className="col">
                <button
                    type="button"
                    className="btn delete-col"
                    onClick={() => deleteColumn(rowIndex, colIndex)}
                >
                    <i className="fa-solid fa-circle-xmark"></i>
                </button>
                {type && addDropValue(type, rowIndex, colIndex)}
                <input
                    type="text"
                    value={col.value}
                    onChange={(e) => {
                        formik.setFieldValue(
                            `rows[${rowIndex}].cols[${colIndex}].value`,
                            e.target.value
                        );
                    }}
                    ref={drop}
                />
            </div>
        </>
    );
};

export default Column;
