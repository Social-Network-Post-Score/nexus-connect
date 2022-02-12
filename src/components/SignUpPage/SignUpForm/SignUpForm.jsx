import React, { useState } from 'react';
import styles from './SignUpForm.module.css';
import { Button, Input } from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css'; 
import { Link } from 'react-router-dom';

function SignUpForm(props) {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [name, setname] = useState('');
    const [cnfpassword, setcnfpassword] = useState('');
    const [err, seterr] = useState(null);
    const handleChange = (e,type) => {
        if(type==="email")
        {
            setemail(e.target.value)
        }
        if(type==="pwd")
        {
            setpassword(e.target.value)
        }
        if(type==="name")
        {
            setname(e.target.value)
        }
        if(type==="cnfpwd")
        {
            setcnfpassword(e.target.value)
        }
    }
    const handleSignUp = async () => {
        /*to be written*/
        if(name==='')
            seterr('Name is required')
        else if(email==='')
            seterr('Email is required')
        else if(password===' '||password.length<5)
            seterr('Password should be minimum of length 5')
        else if(cnfpassword === '')
            seterr('Please re-enter password')
        else if(password !== cnfpassword)
            seterr('Password Mismatch!')
    }
    return ( 
        <div className={styles.container}>
            <div className={styles.headers}>
                <h1>Hello there...</h1>
                <p>Pleased to have you on Nexus</p>
            </div>
            <div className={styles.body}>
                {err && <p className={styles.error}>{err}</p>}
                <Input placeholder='Name *' className={styles.input} size="large" onChange={(e)=>handleChange(e,"name")} style={{marginBottom:'15px'}} required/>
                <Input placeholder='Email Address *' className={styles.input} size="large" onChange={(e)=>handleChange(e,"email")} style={{marginBottom:'15px'}} required/>
                <Input placeholder='Password *' type="password" className={styles.input} size="large" onChange={(e)=>handleChange(e,"pwd")} style={{marginBottom:'15px'}} required/>
                <Input placeholder='Confirm Password *' type="password" className={styles.input} size="large" onChange={(e)=>handleChange(e,"cnfpwd")} style={{marginBottom:'15px'}} required/>
                <Button type="primary" block size="large" style={{
                    backgroundColor: 'rgb(2,48,71)'
                }} className={styles.left} onClick={()=>handleSignUp()}><span>Sign Up</span></Button>
                <p className={styles.login}>Already have an account? <Link to="/login">Login</Link> here</p>
            </div>
        </div>
     );
}

export default SignUpForm;