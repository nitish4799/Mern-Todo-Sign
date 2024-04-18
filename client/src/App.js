import React, { useEffect } from 'react';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import { useDispatch } from 'react-redux';
import { authActions } from './store';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const id = sessionStorage.getItem("id");
    if ( id ){
      dispatch(authActions.login());
    }
  }, [])
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
