import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import { Button, /*Checkbox,*/ Input } from "antd";
import axios from "axios";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function LoginForm(props) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [err, seterr] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const history = useHistory();

  const handleChange = (e, type) => {
    if (type === "email") {
      setemail(e.target.value);
    }
    if (type === "pwd") {
      setpassword(e.target.value);
    }
  };
  const handleLogin = async () => {
    setDisabled(true);
    if (email.length === 0) {
      seterr("Email is required");
      setDisabled(false);
    } else if (password.length < 5) {
      seterr("Password should be minimum of 5 characters");
      setDisabled(false);
    } else {
      setDisabled(true);
      seterr(null);
      const data = {
        email: email,
        password: password,
      };
      await axios
        .post("https://secret-castle-58335.herokuapp.com/api/users/login", data)
        .then((res) => {
          setDisabled(false);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          props.success("l");
          history.push("/posts");
        })
        .catch((err) => {
          setDisabled(false);
          seterr(err.response.data.message);
        });
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.headers}>
        <h1>Welcome Back</h1>
        <p>Happy to see you again</p>
      </div>
      <div>
        {err && <p className={styles.error}>{err}</p>}
        <Input
          placeholder="Email Address *"
          className={styles.input}
          size="large"
          onChange={(e) => handleChange(e, "email")}
          style={{ marginBottom: "15px" }}
          required
        />
        <Input
          placeholder="Password *"
          type="password"
          className={styles.input}
          size="large"
          onChange={(e) => handleChange(e, "pwd")}
          style={{ marginBottom: "15px" }}
          required
        />
        <Button
          type="primary"
          block
          size="large"
          style={{
            backgroundColor: "rgb(2,48,71)",
          }}
          className={styles.left}
          onClick={() => handleLogin()}
        >
          <span>{disabled ? "Logging in..." : "Login"}</span>
        </Button>
        {/* <div className={styles.rem}>
                    <Checkbox className={styles.check} onChange={()=>setsaveUser(!saveUser)}><p>Remember Me</p></Checkbox>
                </div> */}
        <p className={styles.signup}>
          New To Nexus? <Link to="/signup">Sign Up</Link> here
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
