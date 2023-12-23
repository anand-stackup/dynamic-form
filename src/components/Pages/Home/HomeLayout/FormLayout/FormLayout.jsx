import React, { useCallback, useEffect, useState } from "react";
import "./FormLayout.css";
import { useFormik } from "formik";
import Column from "./Column";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDrag } from "react-dnd";
import Row from "./Row";

const FormLayout = () => {
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const { id } = useParams();
    const [form, setForm] = useState(false);

    const formik = useFormik({
        initialValues: {},
        onSubmit: (values) => {
            console.log(values);
            editedFormLayout(values, id);
        },
    });

    async function getFormLayout(id) {
        // console.log("count");
        const form = await axios.get(`http://localhost:4000/layout/?id=${id}`);
        formik.setValues(form.data.data);
    }

    useEffect(() => {
        getFormLayout(id);
        setForm(true);
    }, [id]);

    const modalFormik = useFormik({
        initialValues: {
            label: "",
            placeholder: "",
            rowIndex: "",
            colIndex: "",
        },
        onSubmit: (values, helpers) => {
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
                        Index: `${formik.values.rows.length}`,
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
                                    Index: `${row.cols.length}`,
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
                    const updatedCols = [...row.cols];
                    updatedCols.splice(colIndex, 1);
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
        setModal(true);
        modalFormik.setFieldValue("rowIndex", rowIndex);
        modalFormik.setFieldValue("colIndex", colIndex);
    }
    // console.log(modal);

    function editedFormLayout(data, id) {
        axios.put(`http://localhost:4000/layout/${id}`, data);
        navigate("/list");
    }

    const moveItem = useCallback(
        (dragIndex, hoverIndex) => {
            const dragItem = formik.values.rows[dragIndex];
            const hoverItem = formik.values.rows[hoverIndex];

            const updatedRows = [...formik.values.rows];

            updatedRows[dragIndex] = hoverItem;
            updatedRows[hoverIndex] = dragItem;

            formik.setFieldValue("rows", updatedRows);
        },
        [formik.values.rows]
    );


    return (
        <div className="form-layout">
            <div className="title">
                <h3>{formik.values.title}</h3>
            </div>
            <button
                className="btn add-row"
                onClick={() => {
                    addRow();
                    setForm(true);
                }}
            >
                Add Row
            </button>
            {form ? (
                <form className="form" onSubmit={formik.handleSubmit}>
                    <div>
                        {formik.values.rows &&
                            formik.values.rows.map((row, rowIndex) => {
                                // console.log(row);

                                return (
                                    <Row 
                                        key={row._id}
                                        row={row}
                                        rowIndex={rowIndex}
                                        deleteColumn={deleteColumn}
                                        formik={formik}
                                        openModal={openModal}
                                        addColumn={addColumn}
                                        moveItem={moveItem}
                                    />
                                );
                            })}
                    </div>
                    <div className="button">
                        <button className="btn submit" type="submit">
                            Save
                        </button>
                    </div>
                </form>
            ) : (
                ""
            )}

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
