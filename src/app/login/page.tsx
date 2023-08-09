"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useUserContext } from "./components/authProvider";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    username: "",
    password: "",
    invalid: "", 
  });

  const {setAuth,setUser} = useUserContext()

  const router = useRouter();

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const { username, password } = formData;

   
    if (username === "chauhoaivu111@gmail.com" && password === "hoaivu123") {
     
      router.push("/")
     
      setAuth(true)
      setUser(username)
      
    } else {
      
      setFormErrors({ ...formErrors, invalid: "Invalid password or username" });
    }
  };

  useEffect(() => {
    validateForm();
  }, [formData.username, formData.password]);

  const validateForm = () => {
    let newFormErrors = {};

    if (
      !isValidEmail(formData.username) &&
      formData.username.length < 8 &&
      formData.username !== ""
    ) {
      newFormErrors.username = "Invalid email format or too short";
    }

    if (formData.password.length < 6 && formData.password !== "") {
      newFormErrors.password = "Password must have at least 6 characters";
    }

    setFormErrors(newFormErrors);
  };

  const isValidEmail = (email: string) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username (email):</label>
        <TextField
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          variant="outlined"
          error={Boolean(formErrors.username)}
          helperText={formErrors.username}
        />
      </div>
      <div>
        <label>Password:</label>
        <TextField
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          variant="outlined"
          error={Boolean(formErrors.password)}
          helperText={formErrors.password}
        />
      </div>
      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>
      {formErrors.invalid && <div className="error">{formErrors.invalid}</div>}
      <style jsx>
        {`
          .error {
            color: red;
            font-size: 14px;
            margin-top: 4px;
          }
        `}
      </style>
    </form>
  );
}

