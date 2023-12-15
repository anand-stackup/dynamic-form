import React from "react";
import { useDrop } from "react-dnd";

const Column = ({ col, colIndex, rowIndex, deleteColumn, formik, openModal }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "string",
        drop: (item) => {
            addDropValue(item.type, rowIndex, colIndex);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    function addDropValue(type, rowIndex, colIndex) {
        console.log(rowIndex, colIndex);
        formik.setFieldValue(`rows[${rowIndex}].cols[${colIndex}].value`, type);

        // formik.setFieldValue(prevValues => {
        //     const updatedRows = prevValues.rows.map((row, index) => {
        //         if (index === rowIndex) {
        //             const updatedCols = row.cols.map((col, colIndex) => {
        //                 if (colIndex === initialColIndex) {
        //                     return { ...col, value: type };
        //                 }
        //                 return col;
        //             });
    
        //             return { ...row, cols: updatedCols };
        //         }
        //         return row;
        //     });
    
        //     return { ...prevValues, rows: updatedRows };
        // });
        
    }


    return (
        <>
            <div className="col" ref={drop}>
                <button
                    type="button"
                    className="btn delete-col"
                    onClick={() => deleteColumn(rowIndex, colIndex)}
                >
                    <i className="fa-solid fa-circle-xmark"></i>
                </button>
                <label htmlFor="">{col.label}</label>
                {col.value === 'textarea' ? <textarea name="" id="" cols="30" rows="5" placeholder={col.placeholder}></textarea> :
                <input type={col.value} placeholder={col.placeholder}  />}
                <button type="button" className="btn attribute" onClick={() => {openModal(rowIndex, colIndex)}}><i className="fa-solid fa-gear"></i></button>
            </div>
        </>
    );
};

export default Column;
