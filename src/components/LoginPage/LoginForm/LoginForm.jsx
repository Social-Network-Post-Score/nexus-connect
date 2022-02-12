import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import { Button, Checkbox, Input } from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css'; 
import { Link } from 'react-router-dom';

function LoginForm(props) {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const handleChange = (e,type) => {
        if(type==="email")
        {
            setemail(e.target.value)
        }
        if(type==="pwd")
        {
            setpassword(e.target.value)
        }
    }
    const handleLogin = async () => {
        /*to be written*/
    }
    return ( 
        <div className={styles.container}>
            <div className={styles.headers}>
                <h1>Welcome Back</h1>
                <p>Happy to see you again</p>
            </div>
            <div>
                <Input placeholder='Email Address *' className={styles.input} size="large" onChange={(e)=>handleChange(e,"email")} style={{marginBottom:'15px'}} required/>
                <Input placeholder='Password *' type="password" className={styles.input} size="large" onChange={(e)=>handleChange(e,"pwd")} style={{marginBottom:'15px'}} required/>
                <Button type="primary" block size="large" style={{
                    backgroundColor: 'rgb(2,48,71)'
                }} className={styles.left} onClick={()=>handleLogin()}><span>Login</span></Button>
                <div className={styles.rem}>
                    <Checkbox className={styles.check}><p>Remember Password</p></Checkbox>
                </div>
                <p className={styles.signup}>New To Nexus? <Link to="/signup">Sign Up</Link> here</p>
            </div>
        </div>
     );
}

export default LoginForm;