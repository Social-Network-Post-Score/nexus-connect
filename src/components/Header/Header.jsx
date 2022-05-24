import React from "react";
import LogoDark from "./logo_dark.png";
import LogoLight from "./logo_light.png";
import styles from "./Header.module.css";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

function Header(props) {
  const [user, setUser] = useState({});
  const [dpClicked, setDpClicked] = useState(false);

  console.log("header:", user);

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
  return (
    <div>
      {props.dark && (
        <div className={styles.darkcontainer}>
          <div className={styles.imageContainer}>
            <Link to="/">
              <img src={LogoDark} alt="dark-logo" />
            </Link>
          </div>
          <div className={styles.darkmenuContainer}>
            <ul>
              <Link to="/" className={styles.darkstyleManipulation}>
                <li
                  className={location.pathname === "/" ? styles.selected : ""}
                >
                  Home
                </li>
              </Link>
              {userAvailable && (
                <Link to="/posts" className={styles.darkstyleManipulation}>
                  <li
                    className={
                      location.pathname === "/posts" ? styles.selected : ""
                    }
                  >
                    Posts
                  </li>
                </Link>
              )}
              <Link to="/about" className={styles.darkstyleManipulation}>
                <li
                  className={
                    location.pathname === "/about" ? styles.selected : ""
                  }
                >
                  About Us
                </li>
              </Link>
              {userAvailable ? (
                <li
                  className={styles.darkstyleManipulation}
                  onClick={handleSignOut}
                  style={{ paddingBottom: "0" }}
                >
                  <button
                    style={{
                      backgroundColor: "black",
                      border: "none",
                      outline: "none",
                      paddingBottom: "2px",
                      position: "relative",
                      top: "-2px",
                    }}
                  >
                    Sign Out
                  </button>
                </li>
              ) : (
                <Link to="/signup" className={styles.darkstyleManipulation}>
                  <li
                    className={
                      location.pathname === "/signup" ? styles.selected : ""
                    }
                  >
                    <span>Sign Up / Login</span>
                  </li>
                </Link>
              )}
            </ul>
          </div>
        </div>
      )}
      {props.light && (
        <div className={styles.lightContainer}>
          <div className={styles.imageContainer}>
            <Link to="/">
              <img src={LogoLight} alt="dark-logo" />
            </Link>
          </div>
          <div className={styles.lightmenuContainer}>
            <ul>
              <Link to="/" className={styles.lightstyleManipulation}>
                <li
                  className={
                    location.pathname === "/" ? styles.selectedlight : ""
                  }
                >
                  Home
                </li>
              </Link>
              {userAvailable && (
                <Link to="/posts" className={styles.lightstyleManipulation}>
                  <li
                    className={
                      location.pathname === "/posts" ? styles.selectedlight : ""
                    }
                  >
                    Posts
                  </li>
                </Link>
              )}
              <Link to="/about" className={styles.lightstyleManipulation}>
                <li
                  className={
                    location.pathname === "/about" ? styles.selectedlight : ""
                  }
                >
                  About Us
                </li>
              </Link>
              {userAvailable ? (
                <li
                  className={styles.dpContainer}
                  onClick={() => setDpClicked(!dpClicked)}
                >
                  <img
                    src={`https://robohash.org/${user.name}.png?size=50x50&set=set2`}
                    alt="user dp"
                    className={styles.userDp}
                  ></img>
                </li>
              ) : (
                <Link to="/signup" className={styles.lightstyleManipulation}>
                  <li
                    className={
                      location.pathname === "/signup"
                        ? styles.selectedlight
                        : ""
                    }
                  >
                    <span>Sign Up / Login</span>
                  </li>
                </Link>
              )}
            </ul>
          </div>
        </div>
      )}
      {dpClicked && (
        <div className={styles.dropDownContainer}>
          <div className={styles.dropDownOptions}>
            <FontAwesomeIcon icon={faUser} />
            <Link to={`/profile/${user._id}`} replace>
              Profile
            </Link>
          </div>
          <div className={styles.dropDownOptions}>
            <FontAwesomeIcon icon={faRightToBracket} />
            <a onClick={handleSignOut}>Logout</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
