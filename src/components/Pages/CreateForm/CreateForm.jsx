import React, { useState } from "react";
import Header from "../../Common/Header/Header";
import { useFormik } from "formik";
import "./CreateForm.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateForm = () => {
    const navigate = useNavigate()
    const [modal, setModal] = useState(false);

    async function postFormSettings(data) {
        const id = await axios.post("http://localhost:4000/layout", data);
        // console.log(id.data._id);
        navigate(`/home/${id.data._id}`);
    }

    const formik = useFormik({
        initialValues: {
            title: "",
            desc: "",
            rows: [],
        },
        onSubmit: (values) => {
            // console.log(values);
            // navigate('/home', {state: values})
            postFormSettings(values)
        },
    });

    return (
        <>
            <Header />
            <div className="create-from">
                <h2>Create your form</h2>
                <button
                    className="btn create-btn"
                    onClick={() => {
                        setModal(true);
                    }}
                >
                    Create Form
                </button>
                {modal ? (
                    <div className="overlay">
                        <form onSubmit={formik.handleSubmit}>
                            <label htmlFor="title">
                                Please enter your form title
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                placeholder="Enter form title"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                            />
                            <label htmlFor="desc">
                                Please enter your form description
                            </label>
                            <textarea
                                rows="5"
                                type="text"
                                name="desc"
                                id="desc"
                                placeholder="Enter form description"
                                value={formik.values.desc}
                                onChange={formik.handleChange}
                            />
                            <div className="buttons">
                                <button type="submit" className="btn save-btn">Next</button>
                                <button type="button" className="btn save-btn" onClick={() => {setModal(false)}}>Cancel</button>
                            </div>
                        </form>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </>
    );
};

export default CreateForm;
