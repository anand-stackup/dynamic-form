import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import "./Form.css";
import Header from "../../Common/Header/Header";
import axios from "axios";
import { useParams } from "react-router-dom";

const Form = () => {
    const [data, setData] = useState({})
    const { id } = useParams()
    console.log(id);

    async function getFormLayout(id) {
        const form = await axios.get(`http://localhost:4000/layout/?id=${id}`);
        console.log(form.data.data);
        setData(form.data.data)
    }

    function postFormData(data) {
        axios.post('http://localhost:4000/data', data)
    }

    useEffect(() => {
        getFormLayout(id)
    }, [id])


    const formik = useFormik({
        initialValues: {},
        onSubmit: (values) => {
            var array = []
            for (const [key, value] of Object.entries(values)) {
                const obj = {label: key, value: value}
                array.push(obj)
            }
            console.log({data: array});
            postFormData({data: array})
        },
    });
    return (
        <>
            <Header />
            <div className="title">
                    <h3>{data.title}</h3>
                    <span>{data.desc}</span>
                </div>
            <form className="new-form" onSubmit={formik.handleSubmit}>
                {data.rows &&
                    data.rows.map((row) => (
                        <div className="form-row" key={row._id}>
                            {row.cols &&
                                row.cols.map((col) => (
                                    <div className="form-col" key={col._id}>
                                        <label htmlFor={col.value}>
                                            {col.label}
                                        </label>
                                        {col.value === "textarea" ? (
                                            <>
                                            <textarea
                                                name={col.label}
                                                id={col.value}
                                                cols="30"
                                                rows="5"
                                                placeholder={col.placeholder}
                                                onChange={formik.handleChange}
                                            ></textarea>

                                            {formik.touched[col.value] &&
                                                formik.errors[col.value] ? (
                                                    <span className="error">
                                                        {
                                                            formik.errors[
                                                                col.value
                                                            ]
                                                        }
                                                    </span>
                                                ) : null}
                                                </>
                                        ) : (
                                            <>
                                                <input
                                                    className="input"
                                                    id={col.value}
                                                    name={col.label}
                                                    type={col.value}
                                                    placeholder={
                                                        col.placeholder
                                                    }
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                />
                                                {formik.touched[col.value] &&
                                                formik.errors[col.value] ? (
                                                    <span className="error">
                                                        {
                                                            formik.errors[
                                                                col.value
                                                            ]
                                                        }
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </div>
                                ))}
                        </div>
                    ))}
                <button className="btn form-submit" type="submit">Submit</button>
            </form>
        </>
    );
};

export default Form;
