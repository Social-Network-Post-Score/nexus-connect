import React from 'react';
import LogoDark from './logo_dark.png'
import LogoLight from './logo_light.png'
import styles from './Header.module.css'
import { Link, useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function Header(props) {
    let location = useLocation();
    const history = useHistory();
    const userAvailable = localStorage.getItem('user') && Object.keys(JSON.parse(localStorage.getItem('user'))).length!==0;
    const handleSignOut = () => {
        localStorage.removeItem('user')
        history.replace('/')
    }
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
                        {userAvailable && <Link to="/posts" className={styles.darkstyleManipulation}>
                            <li className={location.pathname==='/posts'?styles.selected:''}>
                                Posts
                            </li>
                        </Link>}
                        <Link to="/about" className={styles.darkstyleManipulation}>
                            <li className={location.pathname==='/about'?styles.selected:''}>
                                About Us
                            </li>
                        </Link>
                        {userAvailable ?
                            <li className={styles.darkstyleManipulation} onClick={handleSignOut} style={{paddingBottom:'0'}}>
                                <button style={{backgroundColor:'black',border:'none',outline:'none',paddingBottom:'2px',position:'relative',top:'-2px'}}>Sign Out</button>
                            </li>:
                        <Link to="/signup" className={styles.darkstyleManipulation}>
                            <li className={location.pathname==='/signup'?styles.selected:''}>
                                <span>Sign Up / Login</span>
                            </li>
                        </Link>}
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
                            {userAvailable && <Link to="/posts" className={styles.lightstyleManipulation}>
                                <li className={location.pathname==='/posts'?styles.selectedlight:''}>
                                    Posts
                                </li>
                            </Link>}
                            <Link to="/about" className={styles.lightstyleManipulation}>
                                <li className={location.pathname==='/about'?styles.selectedlight:''}>
                                    About Us
                                </li>
                            </Link>
                            {userAvailable ? 
                                <li style={{padding:'0'}} onClick={handleSignOut}>
                                    <button className={styles.btnStyling}>Sign Out</button>
                                </li>
                                :
                            <Link to="/signup" className={styles.lightstyleManipulation}>
                                <li className={location.pathname==='/signup'?styles.selectedlight:''}>
                                    <span>Sign Up / Login</span>
                                </li>
                            </Link>}
                        </ul>
                    </div>
                </div>
            }
        </div>
     );
}

export default Header;