import React from 'react';
import styles from './Signup.module.css';
import LandingImage from './landing.png'
import SignUpForm from './SignUpForm/SignUpForm';

function SignUp(props) {
    return ( 
        <div>
            <div className={styles.container}>
                <div className={styles.imgContainer}>
                    <img src={LandingImage} alt="landing"/>
                </div>  
                <div className={styles.formContainer}>
                    <SignUpForm success={props.success} fail={props.fail}/>
                </div>
            </div>
        </div>
     );
}

export default SignUp;