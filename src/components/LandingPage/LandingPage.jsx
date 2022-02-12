import React from 'react';
import Header from '../Header/Header';
import Landing from './landing.jpg'
import styles from './LandingPage.module.css'

function LandingPage() {
    return ( 
        <div className={styles.container}>
            <Header dark/>
            <div className={styles.bodyContainer}>
                <div className={styles.landingText}>
                    <p className={styles.header}>Lets Connect...</p>
                    <p className={styles.tagLine}><i>Welcome to the Nexus of Ideas</i></p>
                </div>
                <div className={styles.imageContainer}>
                    <img src={Landing} alt="landing-pic"/>
                </div>
            </div>
        </div>
     );
}

export default LandingPage;