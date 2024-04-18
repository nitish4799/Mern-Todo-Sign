import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Inputs , setInputs] = useState({
    email: "",
    password: ""
  });

  const change = (e) => {
    const { name , value } = e.target;
    setInputs({ ...Inputs , [name] : value });
  };

  const submit = async (e) => {
    e.preventDefault();
    await axios
    .post("http://localhost:5000/api/v1/signin" , Inputs)
    .then((response)=> {
      console.log(alert(response.data.message));
      sessionStorage.setItem("id", response.data.others._id);
      dispatch(authActions.login())
      navigate("/");
    })
  }

  return (
    <div className='flex flex-col'>
        <input className='p-2 my-2'
        type='email'
        name='email'
        placeholder='Enter Your Email'
        value={Inputs.email}
        onChange={change}/>
        <input className='p-2 my-2'
        type='password'
        name='password'
        placeholder='Enter Your Password'
        value={Inputs.password}
        onChange={change}/>
        <button onClick={submit}>Sign In</button>
  </div>
  )
}

export default Login
