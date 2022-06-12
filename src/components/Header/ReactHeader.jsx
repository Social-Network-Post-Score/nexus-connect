import React, { useState, useEffect } from 'react';
import LogoLight from "./logo_light.png";
import {Navbar, NavbarBrand, NavItem, NavbarToggler, Collapse, Nav, DropdownToggle, UncontrolledDropdown, DropdownMenu, DropdownItem} from 'reactstrap';
import styles from "./Header.module.css";
import LogoDark from "./logo_dark.png";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

function NavBarComponent(props) {
    const [isCollapsed, setCollapsed] = useState(false);
    const [user, setUser] = useState({});
    const [dpClicked, setDpClicked] = useState(false);
    const {dark} = props;
    let location = useLocation();
    const history = useHistory();
    const userAvailable =
        localStorage.getItem("user") &&
        Object.keys(JSON.parse(localStorage.getItem("user"))).length !== 0;

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user"));
        console.log(user);
        setUser(user);
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem("user");
        history.replace("/");
    };

    const handleProfileClick = () => {
        //this can be made better I found no other way to redirect to profile page from another profile page
        window.location.replace(`/profile/${user._id}`);
    };
    return ( 
        <div>
            <Navbar
                color={dark?"black":"light"}
                expand="md"
                light = {!dark}
                dark = {dark}
                fixed = 'top'
            >
                <NavbarBrand href="/">
                    <div className={styles.imageContainer}>
                        <Link to="/">
                            <img src={dark?LogoDark:LogoLight} alt="dark-logo" />
                        </Link>
                    </div>
                </NavbarBrand>
                <NavbarToggler onClick = {()=>setCollapsed(!isCollapsed)} />
                <Collapse navbar isOpen={isCollapsed}>
                    <Nav
                        className="ms-auto"
                        navbar
                    >
                        <NavItem>
                            <Link to='/' className={dark?styles.darkItems:styles.lightitems}>
                                <span 
                                    className={
                                        location.pathname === "/" ? dark?styles.selectedItemDark:styles.selectedItemLight : ""
                                }>
                                    Home
                                </span>
                            </Link>
                        </NavItem>
                        <NavItem>
                            {(userAvailable && <Link to='/posts' className={dark?styles.darkItems:styles.lightitems}>
                                <span 
                                    className={
                                        location.pathname === "/posts" ? styles.selectedItemLight : ""
                                }>
                                    Posts
                                </span>
                            </Link>)}
                        </NavItem>
                        <NavItem>
                            <Link to='/about' className={dark?styles.darkItems:styles.lightitems}>
                                <span
                                    className={
                                        location.pathname === "/about" ? styles.selectedItemLight : ""
                                    }
                                >
                                    About Us
                                </span>
                            </Link>
                        </NavItem>
                        <NavItem>
                            {userAvailable ? (
                                <div style={{padding:''}}>
                                    <UncontrolledDropdown
                                        inNavbar
                                        nav
                                    >
                                        <DropdownToggle
                                            caret
                                            nav
                                        >
                                            <span
                                                className={styles.dpContainer}
                                                onClick={() => setDpClicked(!dpClicked)}
                                            >
                                                <img
                                                    src={`https://picsum.photos/seed/${user.email}/50/50`}
                                                    alt="user dp"
                                                    className={styles.userDp}
                                                />
                                            </span>
                                        </DropdownToggle>
                                        <div style={{width:'150px'}}>
                                            <DropdownMenu right>
                                                <DropdownItem>
                                                    <div>
                                                        <FontAwesomeIcon icon={faUser} />&nbsp;&nbsp;&nbsp;&nbsp;
                                                        <a onClick={()=>handleProfileClick()}>Profile</a>
                                                    </div>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <div>
                                                        <FontAwesomeIcon icon={faRightToBracket} />&nbsp;&nbsp;&nbsp;&nbsp;
                                                        <a onClick={()=>handleSignOut()}>Logout</a>
                                                    </div>
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </div>
                                    </UncontrolledDropdown>
                                </div>
                                ) : (
                                <Link to="/signup" className={dark?styles.darkItems:styles.lightitems}>
                                    <span
                                        className={
                                        location.pathname === "/signup"
                                            ? styles.selectedlight
                                            : ""
                                        }
                                    >
                                        <span>Sign Up / Login</span>
                                    </span>
                                </Link>
                            )}
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
            {/* {dpClicked && (
                <div className={styles.dropDownContainer}>
                <div className={styles.dropDownOptions}>
                    <FontAwesomeIcon icon={faUser} />
                    <a onClick={()=>handleProfileClick()}>Profile</a>
                </div>
                <div className={styles.dropDownOptions}>
                    <FontAwesomeIcon icon={faRightToBracket} />
                    <a onClick={()=>handleSignOut()}>Logout</a>
                </div>
                </div>
      )} */}
        </div>
    );
}

export default NavBarComponent;