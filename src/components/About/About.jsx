import React from 'react'
import Header from '../Header/Header';
import Sourav from './sourav.jpeg';
import Pratik from './pratik.jpg';
import Rohan from './rohan.jpg';
import Keshav from './keshav.jpg';
import Sam from './sam.jpeg';
import styles from './About.module.css'
import Card from '../Card/Card';

function About() {
    return ( 
        <div className={styles.container}>
            <div style={{boxShadow: '0 8px 6px -6px rgba(0, 0, 0, 0.271)'}}>
                <Header light/>
            </div>
            <div className={styles.detailsContainer}>
                <p className={styles.heading}>About Us</p>
                <p className={styles.text}>
                    Almost everyone uses social media nowadays. 
                    They post various types of stuff. 
                    A social media post can be a picture,video,song or maybe some 
                    random text that he/she has written based on anything. That post may be of 
                    some use to some other user in one way or the other. 
                    Our main task is to suggest that post to the user which 
                    will prove to be beneficial for him/her and also calculate 
                    the percentage of people who were suggested.
                </p>
            </div>
            <div>
                <p className={styles.heading}>Meet the team</p>
                <div className={styles.teamContainer}>
                    <Card name={'Sourav Saraf'} designation={'Frontend Web Developer'} image={Sourav} linkedin={'https://www.linkedin.com/in/souravsaraf2000'}/>
                    <Card name={'Pratik Mukherjee'} designation={'Backend developer, Integration Engineer'} image={Pratik} linkedin={'https://www.linkedin.com/in/pratikmukherjee20'}/>
                    <Card name={'Somyajit Chakraborty'} designation={'Research and Development Engineer'} image={Sam} linkedin={'https://somyajitchakraborty.com/'}/>
                    <Card name={'Rohan Ghosh'} designation={'Designer'} image={Rohan} linkedin={'https://www.linkedin.com/in/rohan-ghosh-8612a016b'}/>
                </div>
                <div className={styles.teamContainer}>
                    
                    <Card name={'Keshav Ojha'} designation={'System Design and Frontend Developer'} image={Keshav} linkedin={'https://www.linkedin.com/in/keshav-ojha'}/>
                </div>
            </div>
        </div>
     );
}

export default About;