import React, { useState } from 'react';
import styles from './SignUpForm.module.css';
import { Button, Input } from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css'; 
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function SignUpForm(props) {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [name, setname] = useState('');
    const [cnfpassword, setcnfpassword] = useState('');
    const [err, seterr] = useState(null);
    const [disabled,setDisabled] = useState(false);

    const history = useHistory();

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
        setDisabled(true)
        const text = name.split(' ').join('').toLowerCase()
        if(name==='')
        {
            seterr('Name is required')
            setDisabled(false)
        }
        else if(email==='')
        {
            seterr('Email is required')
            setDisabled(false)
        }
        else if(password===' '||password.length<5)
        {
            seterr('Password should be minimum of length 5')
            setDisabled(false)
        }
        else if(cnfpassword === '')
        {
            seterr('Please re-enter password')
            setDisabled(false)
        }
        else if(password !== cnfpassword)
        {
            seterr('Password Mismatch!')
            setDisabled(false)
        }
        else{
            setDisabled(true)
            seterr(null)
            const data = {
                "name":name,
                "email":email,
                "password":password,
                "posts":'abc',
                "profileimage":`https://robohash.org/${text}.png?size=70x70&set=set2`
            }
            await axios.post('https://secret-castle-58335.herokuapp.com/api/users/signup',data)
                .then((res)=>{
                    setDisabled(false)
                    localStorage.setItem('user',JSON.stringify(res.data.user))
                    props.success('s');
                    history.push('/user/accountInfo')
                })
                .catch((err)=>{
                    setDisabled(false)
                    seterr(err.response.data.message)
                    }
                )
        }
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
                }} className={styles.left} onClick={()=>handleSignUp()}><span>{disabled?'Signing Up...':'Sign Up'}</span></Button>
                <p className={styles.login}>Already have an account? <Link to="/login">Login</Link> here</p>
            </div>
        </div>
     );
}

export default SignUpForm;