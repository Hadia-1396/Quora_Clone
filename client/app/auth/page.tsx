"use client";
import React, { useState } from "react";
import { Typography, Grid, TextField, Button } from "@mui/material";

const Auth = () => {
  const [postData, setPostData] = useState({
    name: "",
    email: "",
    age: 0,
    gender: "",
    username: "",
    profile_picture: "",
  });

  const handleChange = (event: any) => {
    let { name, value } = event.target;

    if (name === "age") {
      value = parseInt(value);
    }
    setPostData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      console.warn("response: ", response);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        style={{
          justifyContent: "center",
        }}
      >
        <Typography variant="h5">Sign In</Typography>

        <TextField
          id="name"
          label="Name"
          variant="filled"
          name="name"
          value={postData.name}
          onChange={handleChange}
        />
        <TextField
          id="age"
          label="Age"
          variant="filled"
          name="age"
          value={postData.age}
          onChange={handleChange}
        />
        <TextField
          id="gender"
          label="Gender"
          variant="filled"
          name="gender"
          value={postData.gender}
          onChange={handleChange}
        />
        <TextField
          id="email"
          label="Email"
          variant="filled"
          name="email"
          value={postData.email}
          onChange={handleChange}
        />
        <TextField
          id="profile_picture"
          label="Profile Picture"
          variant="filled"
          name="profile_picture"
          value={postData.profile_picture}
          onChange={handleChange}
        />
        <TextField
          id="username"
          label="Username"
          variant="filled"
          name="username"
          value={postData.username}
          onChange={handleChange}
        />
        {/* <TextField
          id="password"
          label="Password"
          variant="filled"
          type="password"
          name="password"
          value={postData.password}
          onChange={handleChange}
        /> */}
        <Button type="submit">Submit</Button>
      </Grid>
    </form>
  );
};

export default Auth;
