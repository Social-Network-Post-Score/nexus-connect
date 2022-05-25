import React from 'react'
import { useState } from 'react'
import { Button, /*Checkbox,*/ Input } from 'antd';
// import 'antd/dist/antd.css'; 
import isEmail from 'validator/lib/isEmail';
import axios from 'axios';
import styles from './LoginForm.module.css';
import OtpInput from 'react-otp-input';

function ForgotPassword(props) {
    const [email, setEmail] = useState(window.location.href.split('?')[1].slice(6).trim())
    const [err, setErr] = useState(null)
    const [otp, setOtp] = useState(null)
    const [providedOtp, setProvidedOtp] = useState(null)
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
        if(isEmail(email)){
            await axios.post('http://secret-castle-58335.herokuapp.com/api/users/reset')
            .then(res => {
                setDivControl({
                    ...divControl,
                    showEmailDiv: false,
                    showOtpDiv: true
                })
                console.log(res.data.pass)
                setOtp(res.data.pass)
            })
            .catch(err=>console.log(err))
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

    const handlePasswordCheck = () => {
        setErr(null)
        if(password.cnfPwd === password.newPwd){

        }
        else{
            setErr("Password doesn't match !")
        }
    }

    return ( 
        <div>
            <div>
                {divControl.showEmailDiv && <div className='email'>
                    <h1>Forgot Password</h1>
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
                    <p>{`OTP mailed at ${email}.`}</p>
                    {
                        err && <p className={styles.error}>{err}</p>
                    }
                    <OtpInput
                        value = {providedOtp}
                        onChange = {handleProvidedOtp}
                        numInputs = {4}
                        separator = {<span>-</span>}
                        inputStyle = {{
                            width: '30px',
                            padding: '5px',
                            outline: 'none',
                            border: '1px solid black',
                            borderRadius: '4px'
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
                        <p>Enter New Password</p>
                        <Input 
                            type="password" 
                            name="new-password" 
                            id="newpwd"
                            placeholder = 'New Password'
                            onChange = {(e)=>setPassword({
                                ...password,
                                newPwd: e.target.value
                            })}
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