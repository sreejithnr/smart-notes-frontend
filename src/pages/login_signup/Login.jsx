import React, { useContext, useEffect, useState } from "react";
import MuiInput from "../../components/common/MuiInput";
import Button from "@mui/material/Button";
import Styles from "./login_signup.module.css";
import axiosClient from "../../api/axiosClient";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, user } = useContext(AuthContext);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      navigate("/app");
    }
  }, [user]);

  const validateEmail = (val) => /\S+@\S+\.\S+/.test(val);

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);

    if (!validateEmail(val)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email address" }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);

    if (val.length < 6) {
      setErrors((prev) => ({ ...prev, password: "Password must be 6+ chars" }));
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosClient.post("/auth/login", {
        // mailId: email,
        // password

        mailId: "ammu@gmail.com",
        password: "qwertyuiop",
      });

      login(res.data.user, res.data.token);
      navigate("/app");
    } catch (err) {
      console.log(err.response?.data);
      alert("Invalid email or password");
    }
  };

  return (
    <>
      <div className={Styles.container}>
        <div className={Styles.wrapper}>
          <div className={Styles.header}>
            <h2>Login</h2>
          </div>
          <div>
            <form onSubmit={handleSubmit} className={Styles.form}>
              <MuiInput
                label="Email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />

              <MuiInput
                label="Password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                error={Boolean(errors.password)}
                helperText={errors.password}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
              >
                Login
              </Button>
            </form>
            <Link to={"/signup"} className={Styles.navLink}>
              Signup
            </Link>
          </div>
          <div className={Styles.footer}></div>
        </div>
      </div>
    </>
  );
}
