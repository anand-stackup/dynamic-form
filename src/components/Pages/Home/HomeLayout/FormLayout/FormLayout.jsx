import React, { useEffect, useState } from "react";
import "./FormLayout.css";
import { useFormik } from "formik";
import Column from "./Column";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const FormLayout = () => {
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const { id } = useParams();
    // const [ data, setData ] = useState({});

    const formik = useFormik({
        initialValues: {},
        onSubmit: (values) => {
            console.log(values);
            editedFormLayout(values, id)
            // navigate("/form");
        },
    });

    async function getFormLayout(id) {
        const form = await axios.get(`http://localhost:4000/layout/?id=${id}`);
        formik.setValues(form.data.data)
    } 
    
    useEffect(() => {
        getFormLayout(id)
    }, [id])
    

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

    // console.log(formik.values);

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
                Index: formik.values.rows.length,
                cols: [
                    {
                        Index: `${formik.values.rows.length}0`,
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
                                    Index: `${rowIndex}${row.cols.length}`,
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
                        (col) => col.Index !== `${rowIndex}${colIndex}`
                    );
                    return {
                        ...row,
                        cols: updatedCols,
                    };
                }
                console.log(row);
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

    function editedFormLayout(data, id) {
        axios.put(`http://localhost:4000/layout/${id}`, data);
        navigate("/list");
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
                <div className="button">
                    <button className="btn submit" type="submit">
                        Save
                    </button>
                </div>
                <div className="title">
                    <h3>{formik.values.title}</h3>
                </div>
                {formik.values.rows &&
                    formik.values.rows.map((row, rowIndex) => (
                        <div className="row" key={row.Index}>
                            {row.cols &&
                                row.cols.map((col, colIndex) => {
                                    return (
                                        <Column
                                            key={col.Index}
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
                            <button className="btn" type="submit">
                                Add
                            </button>
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
