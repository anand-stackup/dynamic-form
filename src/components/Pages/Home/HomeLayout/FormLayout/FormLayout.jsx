import React, { useState } from "react";
import "./FormLayout.css";
import { useFormik } from "formik";
import { useDrop } from "react-dnd";
import Column from "./Column";

const FormLayout = () => {
    const [type, setType] = useState("");

    const formik = useFormik({
        initialValues: {
            rows: [],
        },
    });

    // const [{ isOver }, drop] = useDrop(() => ({
    //     accept: "string",
    //     drop: (item) => {
    //         setType(item.type);
    //     },
    //     collect: (monitor) => ({
    //         isOver: monitor.isOver(),
    //     }),
    // }));

    function addRow() {
        formik.setFieldValue("rows", [
            ...formik.values.rows,
            {
                id: `row${formik.values.rows.length}`,
                cols: [
                    {
                        id: `row${formik.values.rows.length}-col0`,
                        value: "",
                    },
                ],
            },
        ]);
    }

    function addColumn(rowIndex) {
        formik.setFieldValue(
            "rows",
            formik.values.rows.map((row, index) => {
                if (index === rowIndex) {
                    if (row.cols.length < 3) {
                        return {
                            ...row,
                            cols: [
                                ...row.cols,
                                {
                                    id: `row${rowIndex}-col${row.cols.length}`,
                                    value: "",
                                },
                            ],
                        };
                    }
                }
                return row;
            })
        );
    }

    function deleteColumn(rowIndex, colIndex) {
        formik.setFieldValue(
            "rows",
            formik.values.rows.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...row,
                        cols: row.cols.filter((col, i) => i !== colIndex),
                    };
                }
                return row;
            })
        );
    }

    function addDropValue(type, rowIndex, colIndex) {
        console.log(rowIndex, colIndex);
        formik.setFieldValue(`rows[${rowIndex}].cols[${colIndex}].value`, type);
    }

    return (
        <div className="form-layout">
            <button
                className="btn add-row"
                onClick={() => {
                    addRow();
                }}
            >
                Add Row
            </button>
            <form className="form" onSubmit={formik.handleSubmit}>
                {console.log(formik.values)}
                {formik.values.rows &&
                    formik.values.rows.map((row, rowIndex) => (
                        <div className="row" key={row.id}>
                            {row.cols &&
                                row.cols.map((col, colIndex) => {
                                    return (
                                        <Column key={col.id} col={col} colIndex={colIndex} rowIndex={rowIndex} deleteColumn={deleteColumn} formik={formik} />
                                    );
                                })}

                            <button
                                type="button"
                                className="btn add-col"
                                onClick={() => addColumn(rowIndex)}
                            >
                                Add Column
                            </button>
                        </div>
                    ))}
            </form>
        </div>
    );
};

export default FormLayout;
