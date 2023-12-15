import React, { useState } from "react";
import "./FormLayout.css";
import { useFormik } from "formik";
import Column from "./Column";
import { useNavigate } from "react-router-dom";

const FormLayout = () => {
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);

    const formik = useFormik({
        initialValues: {
            rows: [],
        },
        onSubmit: (values) => {
            console.log(values);
            // navigate("/form", { state: values });
        },
    });

    const modalFormik = useFormik({
        initialValues: {
            label: "",
            placeholder: "",
            rowIndex: "",
            colIndex: "",
        },
        onSubmit: (values, helpers) => {
            // console.log(values);
            addAttributes(values, values.rowIndex, values.colIndex);
            helpers.resetForm({ values: "" });
            setModal(false);
        },
    });

    console.log(formik.values);

    function addAttributes(values, rowIndex, colIndex) {
        // console.log(rowIndex, colIndex);
        formik.setFieldValue(
            `rows[${rowIndex}].cols[${colIndex}].label`,
            values.label
        );
        formik.setFieldValue(
            `rows[${rowIndex}].cols[${colIndex}].placeholder`,
            values.placeholder
        );
    }

    function addRow() {
        formik.setFieldValue("rows", [
            ...formik.values.rows,
            {
                id: `row${formik.values.rows.length}`,
                cols: [
                    {
                        id: `row${formik.values.rows.length}-col0`,
                        value: "",
                        label: "",
                        placeholder: "",
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
                                    label: "",
                                    placeholder: "",
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
                    const updatedCols = row.cols.filter(
                        (col) => col.id !== `row${rowIndex}-col${colIndex}`
                    );
                    return {
                        ...row,
                        cols: updatedCols,
                    };
                }
                return row;
            })
        );
    }

    function openModal(rowIndex, colIndex) {
        // console.log(modalFormik.setFieldValue.rowIndex);
        setModal(true);
        modalFormik.setFieldValue("rowIndex", rowIndex);
        modalFormik.setFieldValue("colIndex", colIndex);
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
                <button className="btn submit" type="submit">
                    Save
                </button>
                {formik.values.rows &&
                    formik.values.rows.map((row, rowIndex) => (
                        <div className="row" key={row.id}>
                            {row.cols &&
                                row.cols.map((col, colIndex) => {
                                    return (
                                        <Column
                                            key={col.id}
                                            col={col}
                                            colIndex={colIndex}
                                            rowIndex={rowIndex}
                                            deleteColumn={deleteColumn}
                                            formik={formik}
                                            openModal={openModal}
                                        />
                                    );
                                })}

                            {row.cols.length < 3 ? (
                                <button
                                    type="button"
                                    className="btn add-col"
                                    onClick={() => addColumn(rowIndex)}
                                >
                                    Add Column
                                </button>
                            ) : (
                                ""
                            )}
                        </div>
                    ))}
            </form>

            {modal ? (
                <div className="modal">
                    <form onSubmit={modalFormik.handleSubmit}>
                        <h4>Add to form</h4>
                        <label htmlFor="label">Add label</label>
                        <input
                            type="text"
                            name="label"
                            value={modalFormik.values.label}
                            onChange={modalFormik.handleChange}
                        />
                        <label htmlFor="placeholder">Add placeholder</label>
                        <input
                            type="text"
                            name="placeholder"
                            value={modalFormik.values.placeholder}
                            onChange={modalFormik.handleChange}
                        />
                        <div className="modal-btn">
                            <button className="btn" type="submit">Add</button>
                            <button
                                className="btn"
                                type="button"
                                onClick={() => {
                                    setModal(false);
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default FormLayout;
