import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/LoginPage/Login';
import SignUp from './components/SignUpPage/Signup';
import About from './components/About/About';
import Posts from './components/Posts/Posts';

function App() {
  const success = () => toast.success('Login Successful!!')
  const fail = (err) => toast.error(err)
  return (
    <div className="App">
    <Switch>
      <Route exact path="/"><LandingPage/></Route>
      <Route exact path="/signup" success={success} fail={fail}><SignUp/></Route>
      <Route exact path="/login" success={success} fail={fail}><Login/></Route>
      <Route exact path="/about"><About/></Route>
      <Route exact path="/posts"><Posts/></Route>
    </Switch>
    <ToastContainer theme='colored'/>
    </div>
  );
}

export default App;
