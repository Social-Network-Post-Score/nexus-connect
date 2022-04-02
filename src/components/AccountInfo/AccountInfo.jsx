import React from 'react'
import styles from './AccountInfo.module.css';
import Header from '../Header/Header';
import { useState,useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField } from './TextField';
import { Bars } from 'react-loader-spinner';
import * as Yup from "yup";
const AccountInfo = (props) => {

    const [loader,setLoader] = useState(false);

    useEffect(()=>{
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
        dob:Yup.date().required("*Required"),
        city:Yup.string()
                .max(25,"*City name should be less than 25 chars")
                .required("*Required"),
        country: Yup.string()
                    .max(25,"*Country name should be less that 25 characters")
                    .required("*Required"),
        college:Yup.string().required("*Required"),
        description:Yup.string()
                    .max(100,"*Description should not exceed 100 words")
                    .required("*Required")
    });

    const handleOnSubmit = async(values) =>{
        setLoader(true);
        setTimeout(()=>{
            console.log(JSON.stringify(values));
            setLoader(false);
            alert("Form Submitted");
        },3000);
        }
  return (
        <>        
        <Header dark/>
        <div style={{margin:'0 auto',width: '40%'}}>
                {loader && 
                    <div style={{margin: '0 auto', width:'60px',paddingTop:'20px'}}>
                        <h2 style={{textAlign:"center"}}>Please Wait..</h2>
                        <Bars color="#00BFFF" height={60} width={60}/>
                    </div>
                }
        </div>
        {!loader &&
        <div className={styles.mainContainer}>
            <div className={styles.leftPanel}>
                <div className={styles.userImage}>
                    <img src="https://images.performgroup.com/di/library/GOAL/19/ef/lionel-messi-barcelona-2018-19_r1yc5vs8q1z11uy1i9rt9tk8g.jpg?t=271447297"></img>
                    <p>Profile Picture</p>
                </div>
            </div>
            <div className={styles.rightPanel}>
                <h2>Account Details</h2>
                <div className={styles.formContainer}>
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        dob:'',
                        city:'',
                        country:'',
                        college:'',
                        description:"Hey there I am using Nexus!"
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

                                    <TextField type="text" placeholder="enter your email id" name="email" label="Email"></TextField>

                                    <TextField type="date" name="dob" label="Date of birth"></TextField>

                                    <TextField type="text" name="city" placeholder="enter your city" label="City"></TextField>

                                    <TextField type="text" name="country" placeholder="enter your country" label="Country"></TextField>

                                    <TextField type="text" name="college" placeholder="enter your College/University/School name" label="College"></TextField>
                                    
                                    <div className={styles.formField}>
                                        <label htmlFor='description'>Description</label>
                                        <Field name="description" as="textarea" placeholder="write something about you in 100 words"/>
                                        <ErrorMessage name="description" component="div" className="error"/>
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