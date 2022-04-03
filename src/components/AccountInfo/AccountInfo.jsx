import React from 'react'
import styles from './AccountInfo.module.css';
import Header from '../Header/Header';
import { useState,useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField } from './TextField';
import { Bars } from 'react-loader-spinner';
import * as Yup from "yup";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
const AccountInfo = (props) => {

    const [loader,setLoader] = useState(false);
    const history = useHistory();

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(()=>{
        if(user===null)
        {
            props.failedAuthentication();
            history.replace('/');
        }
        setLoader(true);
        setTimeout(()=>{
            setLoader(false);
        },2000);
    },[])

    const validate = Yup.object({
        name: Yup.string().max(25, '*Must be 25 characters or less')
            .required('*Required'),
        email: Yup.string()
            .email('*Email is invalid')
            .required('*Required'),
        dob:Yup.date(),
        city:Yup.string()
                .max(25,"*City name should be less than 25 chars"),
        country: Yup.string()
                    .max(25,"*Country name should be less that 25 characters"),
        college:Yup.string().required("*Required"),
        about:Yup.string()
                    .max(100,"*Description should not exceed 100 words")
                    .required("*Required")
    });

    const handleOnSubmit = async(data) =>{
        setLoader(true);
        const val= {...user,...data};
        console.log("val",val);
        await axios.patch(`https://secret-castle-58335.herokuapp.com/api/users/${user._id}`,val)
                .then((res)=>{
                    localStorage.setItem('user',JSON.stringify(res.data.user))
                    setLoader(false);
                    toast.success("Updated Profile successfuly");
                    history.push('/profile');
                })
                .catch((err)=>{
                    toast.error("Failed to update user info");
                    console.log(err);
                    }
                )
        setLoader(false);
        }
  return (
        <>        
        <Header light/>
        <div style={{margin:'0 auto',width: '40%'}}>
                {loader && 
                    <div style={{margin: '0 auto', width:'60px',paddingTop:'20px'}}>
                        <h2 style={{textAlign:"center"}}>Please Wait..</h2>
                        <Bars color="#00BFFF" height={60} width={60}/>
                    </div>
                }
        </div>
        {!loader && user &&
        <div className={styles.mainContainer}>
            <div className={styles.leftPanel}>
                <div className={styles.userImage}>
                    <img src={`https://robohash.org/${user.name}.png?size=200x200&set=set2`}></img>
                    <p>Profile Picture</p>
                </div>
            </div>
            <div className={styles.rightPanel}>

                <h2>Account Details</h2>
                <div className={styles.formContainer}>
                <Formik
                    initialValues={{
                        name: user.name ? user.name:"",
                        email: user.email ? user.email:"",
                        dob: user.dob ? user.dob:"",
                        city: user.city ? user.city:"",
                        country: user.country ? user.country:"",
                        college: user.college ? user.college:'',
                        about:user.about? user.about:"Hey there I am using Nexus!"
                    }}
                    validationSchema={validate}
                    onSubmit={
                        async(values, { setSubmitting }) => {
                            await handleOnSubmit(values);
                            setSubmitting(false);
                        }
                    }>
                        {
                            formik => (
                                <Form>
                                    <TextField type="text" placeholder="enter your name" name="name" label="Name"></TextField>

                                    <TextField type="text" placeholder="enter your email id" name="email" label="Email" readonly="true"></TextField>

                                    <TextField type="date" name="dob" label="Date of birth"></TextField>

                                    <TextField type="text" name="city" placeholder="enter your city" label="City"></TextField>

                                    <TextField type="text" name="country" placeholder="enter your country" label="Country"></TextField>

                                    <TextField type="text" name="college" placeholder="enter your College/University/School name" label="College"></TextField>
                                    
                                    <div className={styles.formField}>
                                        <label htmlFor='about'>Description</label>
                                        <Field name="about" as="textarea" placeholder="write something about you in 100 words"/>
                                        <ErrorMessage name="about" component="div" className="error"/>
                                    </div>

                                    <button type="submit">Submit</button>
                                </Form>
                            )
                        }
                </Formik>
                </div>
            </div>
        </div>}
        </>
  )
}

export default AccountInfo