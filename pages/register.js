import React, { useState } from "react";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import "../styles/Register.css";
import Container from "@components/Container";
import Head from "next/head";
import Link from "next/link";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Head>
        <title>Register &mdash; EpicNews</title>
      </Head>

      <Container>
        <div className="register-main">
          <div className="register-left hidden-custom">
            <img src={"/image_register.png"} alt="" />
          </div>
          <div className="register-right">
            <div className="register-right-container">
              <div className="register-logo">
                <img src={"/logo.png"} alt="logo epicnews" />
              </div>
              <div className="register-center">
                <h2>Register for news!</h2>
                <p>Please enter your details</p>
                <form>
                  <input type="email" placeholder="Email" />
                  <div className="pass-input-div">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                    />
                    {showPassword ? (
                      <FaEyeSlash
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                      />
                    ) : (
                      <FaEye
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                      />
                    )}
                  </div>
                  <input type="date"></input>

                  <div className="register-center-buttons">
                    <button type="button">Register</button>
                    <button type="button">
                      <img src={"/icons8-google.svg"} alt="" />
                      Register with Google
                    </button>
                  </div>
                </form>
              </div>

              <p className="register-bottom-p">
                Already have an account? <a href="/login">Log In</a>
              </p>
            </div>
          </div>

          <div className="relative">
            <a href="/" className="absolute top-10 right-14">
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-x"
                  className="contrast-50"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </a>
          </div>
        </div>
      </Container>
    </>
  );
};

export default RegisterPage;
