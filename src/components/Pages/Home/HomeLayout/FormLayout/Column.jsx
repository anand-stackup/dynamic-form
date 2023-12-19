import React from "react";
import { useDrop } from "react-dnd";

const Column = ({ col, colIndex, rowIndex, deleteColumn, formik, openModal }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "string",
        drop: (item) => {
            console.log(rowIndex, colIndex);
            addDropValue(item.type, rowIndex, colIndex);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    function addDropValue(type, rowIndex, colIndex) {
        // console.log(rowIndex, colIndex);
        formik.setFieldValue(`rows[${rowIndex}].cols[${colIndex}].value`, type);
        
    }
    
    


    return (
        <>
            <div className="col" ref={drop}>
                <label htmlFor="">{col.label}</label>
                {col.value === 'textarea' ? <textarea name="" id="" cols="30" rows="5" placeholder={col.placeholder} value={col.value}></textarea> :
                <input type={col.value} placeholder={col.placeholder} value={col.value}  />}
                <button
                    type="button"
                    className="btn delete-col"
                    onClick={() => deleteColumn(rowIndex, colIndex)}
                >
                    <i className="fa-solid fa-circle-xmark"></i>
                </button>
                <button type="button" className="btn attribute" onClick={() => {openModal(rowIndex, colIndex)}}><i className="fa-solid fa-gear"></i></button>
            </div>
        </>
    );
};

export default Column;
