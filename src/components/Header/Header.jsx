import React from 'react';
import LogoDark from './logo_dark.png'
import LogoLight from './logo_light.png'
import styles from './Header.module.css'
import { Link, useLocation } from 'react-router-dom';

function Header(props) {
    let location = useLocation();
    return ( 
        <div>
            {props.dark && <div className={styles.darkcontainer}>
                <div className={styles.imageContainer}>
                    <Link to="/"><img src={LogoDark} alt="dark-logo" /></Link>
                </div>
                <div className={styles.darkmenuContainer}>
                    <ul>
                        <Link to="/" className={styles.darkstyleManipulation}>
                            <li className={location.pathname==='/'?styles.selected:''}>
                                Home
                            </li>
                        </Link>
                        <Link to="/posts" className={styles.darkstyleManipulation}>
                            <li className={location.pathname==='/posts'?styles.selected:''}>
                                Posts
                            </li>
                        </Link>
                        <Link to="/about" className={styles.darkstyleManipulation}>
                            <li className={location.pathname==='/about'?styles.selected:''}>
                                About Us
                            </li>
                        </Link>
                        <Link to="/signup" className={styles.darkstyleManipulation}>
                            <li className={location.pathname==='/signup'?styles.selected:''}>
                                Sign Up / Login
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>}
            {
                props.light && <div className={styles.lightContainer}>
                    <div className={styles.imageContainer}>
                        <Link to="/"><img src={LogoLight} alt="dark-logo" /></Link>
                    </div>
                    <div className={styles.lightmenuContainer}>
                        <ul>
                            <Link to="/" className={styles.lightstyleManipulation}>
                                <li className={location.pathname==='/'?styles.selectedlight:''}>
                                    Home
                                </li>
                            </Link>
                            <Link to="/posts" className={styles.lightstyleManipulation}>
                                <li className={location.pathname==='/posts'?styles.selectedlight:''}>
                                    Posts
                                </li>
                            </Link>
                            <Link to="/about" className={styles.lightstyleManipulation}>
                                <li className={location.pathname==='/about'?styles.selectedlight:''}>
                                    About Us
                                </li>
                            </Link>
                            <Link to="/signup" className={styles.lightstyleManipulation}>
                                <li className={location.pathname==='/signup'?styles.selectedlight:''}>
                                    Sign Up / Login
                                </li>
                            </Link>
                        </ul>
                    </div>
                </div>
            }
        </div>
     );
}

export default Header;