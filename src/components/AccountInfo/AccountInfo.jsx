import React from 'react'
import styles from './AccountInfo.module.css';
import Header from '../Header/Header';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField } from './TextField';
import * as Yup from "yup";
const AccountInfo = (props) => {

    const validate = Yup.object({
        name: Yup.string().max(25, 'Must be 15 characters or less')
            .required('*Required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('*Required'),
        dob:Yup.date().required("*Required"),
        city:Yup.string()
                .max(25,"city name should be less than 25 chars")
                .required("*Required"),
        country: Yup.string()
                    .max(25,"country name should be less that 25 characters")
                    .required("*Required"),
        college:Yup.string().required("*Required"),
        description:Yup.string().max(100,"Description should not exceed 100 words")
    });

    const handleOnSubmit = async(values) =>{
        setTimeout(()=>{
            console.log(JSON.stringify(values));
            alert("form submitted successfully");
        },3000);
    }

  return (
    <>
        <Header dark/>
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
                        description:''
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
        </div>
    </>
  )
}

export default AccountInfo