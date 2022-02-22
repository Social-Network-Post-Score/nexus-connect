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
import Profile from './components/Profile/Profile';

function App() {
  const success = (type) => type==='l'?toast.success('Login Successful!!'):toast.success('Signup Successful!!')
  const fail = (err) => toast.error(err)
  const postSuccess = () => toast.success('Post Created Successfully')
  const failedAuthentication = () => toast.warn('Please login to see posts')

  return (
    <div className="App">
    <Switch>
      <Route exact path="/"><LandingPage/></Route>
      <Route exact path="/signup"><SignUp success={success} fail={fail}/></Route>
      <Route exact path="/login"><Login success={success} fail={fail}/></Route>
      <Route exact path="/about"><About/></Route>
      <Route exact path="/posts"><Posts postSuccess={postSuccess} failedAuthentication={failedAuthentication}/></Route>
      <Route exact path="/profile"><Profile  failedAuthentication={failedAuthentication}/></Route>
    </Switch>
    <ToastContainer theme='colored'/>
    </div>
  );
}

export default App;
