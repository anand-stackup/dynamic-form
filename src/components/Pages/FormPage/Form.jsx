import { useFormik } from "formik";
import React from "react";
import { useLocation } from "react-router-dom";
import * as Yup from "yup";
import "./Form.css";
import Header from "../../Common/Header/Header";

const Form = () => {
    const { state } = useLocation();
    // console.log(state);

    const formik = useFormik({
        initialValues: {},
        // validationSchema: Yup.object().shape({
        //     text: Yup.string()
        //         .min(2, "Too Short!")
        //         .max(50, "Too Long!")
        //         .required("Required"),
        //     textarea: Yup.string()
        //         .min(2, "Too Short!")
        //         .max(50, "Too Long!")
        //         .required("Required"),
        // }),
        onSubmit: (values) => {
            console.log(values);
        },
    });
    return (
        <>
            <Header />
            <form className="new-form" onSubmit={formik.handleSubmit}>
                {state.rows &&
                    state.rows.map((row) => (
                        <div className="form-row" key={row.id}>
                            {row.cols &&
                                row.cols.map((col) => (
                                    <div className="form-col" key={col.id}>
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
