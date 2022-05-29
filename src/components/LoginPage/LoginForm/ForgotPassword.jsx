import React from 'react'
import { useState } from 'react'
import { Button, /*Checkbox,*/ Input } from 'antd';
// import 'antd/dist/antd.css'; 
import isEmail from 'validator/lib/isEmail';
import axios from 'axios';
import styles from './LoginForm.module.css';
import OtpInput from 'react-otp-input';
import { useHistory } from "react-router-dom";

function ForgotPassword(props) {
    const history = useHistory();
    const [email, setEmail] = useState(window.location.href.split('?')[1].slice(6).trim())
    const [err, setErr] = useState(null)
    const [otp, setOtp] = useState(null)
    const [providedOtp, setProvidedOtp] = useState(null)
    const [id, setId] = useState(null)
    const [divControl , setDivControl] = useState({
        showEmailDiv : true,
        showOtpDiv: false,
        showReEnterPasswordDiv: false,
        showSuccessDiv: false,
        showFailureDiv: false
    })
    const [password, setPassword] = useState({
        newPwd: '',
        cnfPwd: ''
    })

    const handleSubmit = async () => {
        setErr(null)
        const data = {
            "email" : email
        }
        if(isEmail(email)){
            await axios.post('https://secret-castle-58335.herokuapp.com/api/users/reset',data)
            .then(res => {
                setDivControl({
                    ...divControl,
                    showEmailDiv: false,
                    showOtpDiv: true
                })
                console.log(res.data.pass)
                setId(res.data.id)
                setOtp(res.data.pass)
            })
            .catch(err=>setErr(err.response.data.message))
        }
        else{
            setErr('Please enter a valid email')
        }
    }

    const handleEmailChange = (e) => {
        setErr(null)
        setEmail(e.target.value)
    }

    const handleProvidedOtp = (e) => {
        setErr(null)
        setProvidedOtp(e)
    }

    const handleOTPCheck = () => {
        setErr(null)
        if(otp === parseInt(providedOtp)){
            setDivControl({
                ...divControl,
                showOtpDiv: false,
                showReEnterPasswordDiv : true
            })
        }
        else{
            setErr('Please enter a valid OTP !')
        }
    }

    const handlePasswordCheck = async () => {
        setErr(null)
        const data = {
            "password" : password.cnfPwd
        }
        if(password.cnfPwd === password.newPwd){
            await axios.patch(`https://secret-castle-58335.herokuapp.com/api/users/${id}`,data)
            .then(()=>{
                props.passwordChangeSuccess()
                history.replace("/");
            })
            .catch(()=>{
                props.passwordChangeFail()
            })
        }
        else{
            setErr("Password doesn't match !")
        }
    }

    return ( 
        <div className={styles.outerPwdContainer}>
            <div className={styles.forgotPwdContainer}>
                <h1>Forgot Password</h1>
                {divControl.showEmailDiv && <div className='email'>
                    <p>Don't worry! Enter your registered valid email here. You will get an OTP on that mail.</p>
                    {
                        err && <p className={styles.error}>{err}</p>
                    }
                    <Input 
                        type="email" 
                        name="email" 
                        id="email" 
                        value = {email!==''?email:null}
                        placeholder = 'Enter a valid email'
                        onChange = {handleEmailChange}
                        style={{
                            marginBottom: '15px'
                        }}
                    />
                    <Button 
                        type="primary" 
                        block 
                        size="large" 
                        style={{
                            backgroundColor: 'rgb(2,48,71)'
                        }}
                        onClick = {handleSubmit}
                    >Submit</Button>
                </div>}
                {divControl.showOtpDiv && 
                <div className='otp'>
                    <p className={styles.otpConf}>OTP mailed at <span className={styles.emailId}><i>{`${email}`}</i></span>.</p>
                    {
                        err && <p className={styles.error}>{err}</p>
                    }
                    <OtpInput
                        value = {providedOtp}
                        onChange = {handleProvidedOtp}
                        numInputs = {4}
                        separator = {<span>-</span>}
                        containerStyle = {{
                            marginBottom: '15px',
                            width: '220px',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}
                        inputStyle = {{
                            width: '40px',
                            padding: '5px',
                            outline: 'none',
                            border: '1px solid black',
                            borderRadius: '4px',
                            margin: '0 5px'
                        }}
                    />
                    <Button 
                        type="primary" 
                        block 
                        size="large" 
                        style={{
                            backgroundColor: 'rgb(2,48,71)'
                        }}
                        onClick = {handleOTPCheck}
                    >Check OTP</Button>
                </div>}
                {divControl.showReEnterPasswordDiv && 
                    <div className='password'>
                        <p className={styles.pwdText}>Enter New Password</p>
                        <Input 
                            type="password" 
                            name="new-password" 
                            id="newpwd"
                            placeholder = 'New Password'
                            onChange = {(e)=>setPassword({
                                ...password,
                                newPwd: e.target.value
                            })}
                            style={{
                                marginBottom: '15px'
                            }}
                        />
                        <Input 
                            type="password" 
                            name="confirm-password" 
                            id="cnfpwd"
                            placeholder = 'Re-enter Password'
                            onChange = {(e)=>setPassword({
                                ...password,
                                cnfPwd: e.target.value
                            })}
                            style={{
                                marginBottom: '15px'
                            }}
                        />
                        <Button 
                            type="primary" 
                            block 
                            size="large" 
                            style={{
                                backgroundColor: 'rgb(2,48,71)'
                            }}
                            onClick = {handlePasswordCheck}
                        >Submit Password</Button>
                    </div>
                }
            </div>
        </div>
    );
}

export default ForgotPassword;