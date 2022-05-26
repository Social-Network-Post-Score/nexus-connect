import React from 'react';
import styles from './Login.module.css';
import LandingImage from './landing.png'
import LoginForm from './LoginForm/LoginForm';

function Login(props) {
    return ( 
        <div>
            <div className={styles.container}>
                <div className={styles.formContainer}>
                    <LoginForm 
                        success={props.success} 
                        fail={props.fail}
                    />
                </div>
                <div className={styles.imgContainer}>
                    <img src={LandingImage} alt="landing"/>
                </div>  
            </div>
        </div>
     );
}

export default Login;