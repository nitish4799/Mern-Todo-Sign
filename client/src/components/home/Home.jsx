import React, { useEffect, useState } from 'react';
import TodoCard from './TodoCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Update from './Update';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';
import axios from 'axios';

let id = sessionStorage.getItem("id");
console.log(id);

const Home = () => {
    const [Inputs, setInputs] = useState({ title: "", body: "" });
    const [Array, setArray] = useState([]);

    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...Inputs, [name]: value });
    };

    const submit = async () => {
        if (Inputs.title === "" || Inputs.body === "") {
            toast.error("Title Or Body cant be Empty");
        } else {
            if (id) {
                await axios
                    .post("http://localhost:5000/api/v2/addTask", {
                        title: Inputs.title,
                        body: Inputs.body,
                        id: id,
                    })
                    .then((response) => {
                        console.log(response);
                    });
                setInputs({ title: "", body: "" });
                toast.success("Your Task is Added");
            } else {
                setArray([...Array, Inputs]);
                setInputs({ title: "", body: "" });
                // toast.success("Your Task is Added");
                toast.error("Please Sign up first");
            }

        }
    }
    console.log(Array);

    const del = async (Cardid) => {
        await axios
            .delete(`http://localhost:5000/api/v2/deleteTask/${Cardid}`, {
                data: {id: id},
            })
            .then(() => {
                // console.log(response.data);
                toast.success("Task Deleted");
            })
    };

    const dis = (value) => {
        document.getElementById("todo-update").style.display = value;
    }

    useEffect(() => {
        const fetch = async () => {
            await axios
                .get(`http://localhost:5000/api/v2/getTasks/${id}`)
                .then((response) => {
                    setArray(response.data.list);
                });
        };
        fetch();
    }, [submit]);

    return (
        <>
            <div className='todo'>
                <ToastContainer />
                <div className='toto main-container'>
                    <div className='flex flex-col'>
                        <input type='text' placeholder='Title' name='title' onChange={change} value={Inputs.title} />
                        <textarea type='text' placeholder='Body' name='body' onChange={change} value={Inputs.body} />
                    </div>
                    <div>
                        <button onClick={submit}>Add task</button>
                    </div>
                </div>
                {Array &&
                    Array.map((item, index) => (
                        <div className='' key={index}>
                            <TodoCard heading={item.title} body={item.body} id={item._id} delid={del} display={dis} />
                        </div>
                    ))}
                {/* <div className='todo-body'>
        <div className='container-fluid'>
            <div className='row'>
                {Array && Array.map((item, index) => {
                    <div className='col-lg-3'>
                        <TodoCard/>
                    </div>
                })}
            </div>
        </div>
      </div> */}
            </div>
            <div className='absolute' id='todo-update'>
                <Update display={dis} />
            </div>
        </>
    )
}

export default Home
