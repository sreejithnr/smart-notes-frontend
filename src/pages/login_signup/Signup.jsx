import React, { useState } from "react";
import MuiInput from "../../components/common/MuiInput";
import Button from "@mui/material/Button";
import Styles from "./login_signup.module.css";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateEmail = (val) => /\S+@\S+\.\S+/.test(val);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    // validation
    if (field === "name" && value.trim().length < 3) {
      setErrors((prev) => ({ ...prev, name: "Name too short" }));
    } else if (field === "email" && !validateEmail(value)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email address" }));
    } else if (field === "password" && value.length < 6) {
      setErrors((prev) => ({ ...prev, password: "Password must be 6+ chars" }));
    } else if (field === "confirmPassword" && value !== form.password) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      Object.values(errors).some((e) => e !== "") ||
      Object.values(form).some((v) => v === "")
    ) {
      alert("Fix validation errors");
      return;
    }

    // SIGNUP API CALL HERE
    console.log("Signup submitted:", form);
  };

  return (
    <>
      <div className={Styles.container}>
        <div className={Styles.wrapper}>
          <div className={Styles.header}>
            <h2>SignUp</h2>
          </div>
          <div>
            <form onSubmit={handleSubmit} className={Styles.form}>
              <MuiInput
                label="Name"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                error={Boolean(errors.name)}
                helperText={errors.name}
              />
              <MuiInput
                label="Email"
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
              <MuiInput
                label="Password"
                type="password"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                error={Boolean(errors.password)}
                helperText={errors.password}
              />
              <MuiInput
                label="Confirm Password"
                type="password"
                value={form.confirmPassword}
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
              >
                Signup
              </Button>
            </form>
          </div>
          <div className={Styles.footer}></div>
        </div>
      </div>
    </>
  );
}
