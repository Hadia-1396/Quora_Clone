"use client";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface PostData {
  name: string;
  email: string;
  age: number;
  gender: string;
  username: string;
  password: string;
  profile_picture: File | null | string;
}

const Auth = () => {
  const router = useRouter();
  const [postData, setPostData] = useState<PostData>({
    name: "",
    email: "",
    age: 0,
    gender: "",
    username: "",
    password: "",
    profile_picture: null,
  });
  const [activeTab, setActiveTab] = useState("login");

  const handleChange = (event: any) => {
    let { name, value } = event.target;

    if (name === "age") {
      value = parseInt(value);
    }
    setPostData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      return;
    }

    setPostData({ ...postData, profile_picture: file });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (activeTab === "login") {
      try {
        const response = await signIn("credentials", {
          redirect: false,
          email: postData.email,
          password: postData.password,
        });

        if (!response?.error) {
          console.log("User signed in:", response);
        } else {
          console.error("Sign-in error:", response?.error);
        }
        router.push("/");
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      try {
        const data = new FormData();
        if (postData.profile_picture) {
          data.append("file", postData.profile_picture);
        }
        data.append("upload_preset", "profile_picture");
        data.append("cloud_name", "dpidz8n5y");

        fetch("https://api.cloudinary.com/v1_1/dpidz8n5y/image/upload", {
          method: "post",
          body: data,
        })
          .then((response) => response.json())
          .then(async (data) => {
            const response = await fetch(
              process.env.NEXT_PUBLIC_BASE_URL + "users",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  ...postData,
                  profile_picture: data.url,
                }),
              }
            );

            console.warn("response: ", response);
          });
      } catch (error) {
        console.error("Error: ", error);
      }
    }
  };

  const handleToChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center justify-end"
          id="default-tab"
        >
          <li className="me-2" role="presentation">
            <button
              className={
                activeTab === "login"
                  ? "inline-block p-4 border-b-2 rounded-t-lg border-blue-600"
                  : "inline-block p-4 border-b-2 rounded-t-lg"
              }
              id="login-tab"
              type="button"
              onClick={() => handleToChange("login")}
            >
              Login
            </button>
          </li>
          <li className="me-2" role="presentation">
            <button
              className={
                activeTab === "signup"
                  ? "inline-block p-4 border-b-2 rounded-t-lg border-blue-600"
                  : "inline-block p-4 border-b-2 rounded-t-lg"
              }
              id="signup-tab"
              type="button"
              onClick={() => handleToChange("signup")}
            >
              Signup
            </button>
          </li>
        </ul>
      </div>

      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        {activeTab === "login" ? (
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center p-4">
            Sign In
          </h1>
        ) : (
          <>
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center p-4">
              Sign Up
            </h1>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Name
              </label>
              <input
                id="name"
                name="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="dev"
                required
                value={postData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="age"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Age
              </label>
              <input
                id="age"
                name="age"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="20"
                required
                value={postData.age}
                onChange={handleChange}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="gender"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Gender
              </label>
              <div className="flex">
                <div className="flex items-center me-4">
                  <input
                    id="gender"
                    type="radio"
                    name="gender"
                    value="male"
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="gender"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Male
                  </label>
                </div>
                <div className="flex items-center me-4">
                  <input
                    id="gender_2"
                    type="radio"
                    value="female"
                    onChange={handleChange}
                    name="gender"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="gender_2"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Female
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-5">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Username
              </label>
              <input
                id="username"
                name="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="the-dev"
                required
                value={postData.username}
                onChange={handleChange}
              />
            </div>
          </>
        )}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="email"
            required
            value={postData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={postData.password}
            onChange={handleChange}
          />
        </div>
        {activeTab === "signup" && (
          <div className="mb-5">
            <label
              htmlFor="profile_picture"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Profile Picture
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              name="profile_picture"
              id="profile_picture"
              type="file"
              required
              onChange={handleImage}
            />
          </div>
        )}
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Auth;
