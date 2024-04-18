import React, { useState } from 'react';
import TodoCard from './TodoCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Update from './Update';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';
import axios from 'axios';

let id = sessionStorage.getItem("id");

const Home = () => {
    const [Inputs, setInputs] = useState({ title: "", body: "" });
    const [Array, setArray] = useState([]);

    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...Inputs, [name]: value });
    };

    const submit = async () => {
        if ( Inputs.title === "" || Inputs.body === ""){
            toast.error("Title Or Body cant be Empty");
        }else{
            if (id) {
                
            }
        setArray([...Array, Inputs]);
        setInputs({ title: "", body: "" });
        toast.success("Your Task is Added");
        toast.error("Please Sign up first");
        }
    }
    console.log(Array);

    const del = (id) => {
        Array.splice(id , "1");
        setArray([ ...Array]);
    };

    const dis = (value)=> {
        document.getElementById("todo-update").style.display = value;
    }
    return (
        <>
        <div className='todo'>
            <ToastContainer/>
            <div className='toto main-container'>
                <div className='flex flex-col'>
                    <input type='text' placeholder='Title' name='title' onChange={change} value={Inputs.title} />
                    <textarea type='text' placeholder='Body' name='body' onChange={change} value={Inputs.body} />
                </div>
                <div>
                    <button onClick={submit}>Add task</button>
                </div>
            </div>
            {
                Array.map((item, index) => (
                    <div className='' key={index}>
                        <TodoCard heading={item.title}  body = {item.body} id={index} delid={del} display={dis}/>
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
            <Update display={dis}/>
        </div>
        </>
    )
}

export default Home
