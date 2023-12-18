import axios from "axios";
import React, { useEffect, useState } from "react";
import './FormList.css'
import Header from "../../Common/Header/Header";
import { useNavigate } from "react-router-dom";

const FormList = () => {
    const navigate = useNavigate()
    const [list, setList] = useState();
    async function getFormSettings() {
        const res = await axios.get("http://localhost:4000/layout");
        setList(res.data.data);
    }
    // console.log(list);

    useEffect(() => {
        getFormSettings();
    }, []);

    return (
        <>
            <Header />
            <div className="list-container">
                <h4>Select the froms</h4>
            {list && list.map((list) => (<div className="list" key={list._id} >
                <h3 onClick={() => {navigate(`/form/${list._id}`)}}>{list.title}</h3>
                <div>
                    <button className="btn" onClick={() => {navigate(`/home/${list._id}`)}}>Edit</button>
                </div>
            </div>))}
            </div>
        </>
    );
};

export default FormList;
