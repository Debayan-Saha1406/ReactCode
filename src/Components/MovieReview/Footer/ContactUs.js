/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import LoaderProvider from "./../../../Provider/LoaderProvider";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  toggleLoader,
  handleInputChange,
} from "./../../../Store/Actions/actionCreator";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { useState } from "react";
import { validateInputField } from "../../../Shared/Services/ValidationService";
import { validateUserEmail } from "./../../../Shared/Services/ValidationService";

const initialState = {
  value: "",
  isErrorExist: false,
  errorClassName: "",
};
const ContactUs = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState(initialState);
  const [email, setEmail] = useState(initialState);
  const [subject, setSubject] = useState(initialState);
  const [message, setMessage] = useState(initialState);
  const showLoader = useSelector((state) => state.uiDetails.showLoader);
  const screenOpacity = useSelector((state) => state.uiDetails.screenOpacity);

  useEffect(() => {
    dispatch(toggleLoader(true, 0));
    window.scrollTo({
      top: 0,
    });
    setTimeout(() => {
      dispatch(toggleLoader(false, 1));
    }, 2000);
  }, []);

  const handleInputChange = (e, setData) => {
    let isErrorExist = validateInputField(e.target.value);
    if (e.target.name === "email") {
      isErrorExist = validateUserEmail(e.target.value);
    }
    setUiState(e, isErrorExist, setData);
  };

  const setUiState = (e, isErrorExist, setData) => {
    if (isErrorExist) {
      setData({
        ...[e.target.name],
        isErrorExist: true,
        value: e.target.value,
        errorClassName: "input-error",
      });
    } else {
      setData({
        ...[e.target.name],
        isErrorExist: false,
        value: e.target.value,
        errorClassName: "",
      });
    }
  };

  const handleSendMail = (e) => {
    e.preventDefault();

    if (name.value === "") {
      setInputFieldError(name, setName);
    }

    if (email.value === "") {
      setInputFieldError(email, setEmail);
    }

    if (subject.value === "") {
      setInputFieldError(subject, setSubject);
    }

    if (message.value === "") {
      setInputFieldError(message, setMessage);
    }

    if (
      !name.isErrorExist &&
      !email.isErrorExist &&
      !subject.isErrorExist &&
      !message.isErrorExist
    ) {
      const body = {
        name: name.value,
        email: email.value,
        subject: subject.value,
        message: message.value,
      };

      console.log(body);
    }
  };

  const setInputFieldError = (inputField, setData) => {
    setData({
      ...[inputField],
      isErrorExist: true,
      errorClassName: "input-error",
    });
  };

  return (
    <React.Fragment>
      {showLoader && (
        <div id="loaderContainer">
          <div id="loader">
            <LoaderProvider></LoaderProvider>
          </div>
        </div>
      )}
      <div
        style={{
          backgroundColor: "#020d18",
          opacity: screenOpacity,
        }}
      >
        <Header showSearchBar={true}></Header>
        <section class="section">
          <div class="container">
            <div class="row">
              <div class="col-12 col-md-7 col-xl-8">
                <div class="row">
                  <div class="col-12">
                    <h2 class="section__title">
                      <b>Contact Form</b>
                    </h2>
                  </div>

                  <div class="col-12">
                    <div className="form-style-1 user-pro" action="">
                      <form action="" style={{ paddingBottom: "30px" }}>
                        <div className="row">
                          <div className="col-md-12 form-it" id="spacing-below">
                            <label className="required-label">Name</label>
                            <input
                              type="text"
                              name="name"
                              value={name.value}
                              placeholder={"Enter Your name"}
                              onChange={(e) => handleInputChange(e, setName)}
                            />
                            {name.errorClassName === "input-error" && (
                              <i
                                class="fa fa-exclamation-circle"
                                id="warning-exclamation"
                              ></i>
                            )}
                          </div>
                          <div className="col-md-12 form-it" id="spacing-below">
                            <label className="required-label">Email</label>
                            <input
                              type="text"
                              name="email"
                              value={email.value}
                              placeholder={"Enter Your Email Address"}
                              onChange={(e) => handleInputChange(e, setEmail)}
                            />
                            {email.errorClassName === "input-error" && (
                              <i
                                class="fa fa-exclamation-circle"
                                id="warning-exclamation"
                              ></i>
                            )}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12 form-it" id="spacing-below">
                            <label className="required-label">Subject</label>
                            <input
                              type="text"
                              name="subject"
                              value={subject.value}
                              placeholder="Enter subject of the mail"
                              onChange={(e) => handleInputChange(e, setSubject)}
                            />
                            {subject.errorClassName === "input-error" && (
                              <i
                                class="fa fa-exclamation-circle"
                                id="warning-exclamation"
                              ></i>
                            )}
                          </div>
                          <div className="col-md-12 form-it" id="spacing-below">
                            <label className="required-label">Message</label>
                            <textarea
                              name="message"
                              value={message.value}
                              placeholder="Type your message..."
                              onChange={(e) => handleInputChange(e, setMessage)}
                            />
                            {message.errorClassName === "input-error" && (
                              <i
                                class="fa fa-exclamation-circle"
                                id="warning-exclamation"
                              ></i>
                            )}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-2">
                            <input
                              className="submit"
                              type="button"
                              onClick={handleSendMail}
                              id="black-hover"
                              style={{ cursor: "pointer" }}
                              value="Send"
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12 col-md-5 col-xl-4">
                <div class="row">
                  <div class="col-12">
                    <h2 class="section__title">
                      <b>Info</b>
                    </h2>
                  </div>

                  <div class="col-12">
                    <p class="section__text">
                      It is a long fact that a reader will be distracted by the
                      readable content of a page when looking at its layout. The
                      point of using Lorem Ipsum is that it has a more-or-less
                      normal distribution of letters, as opposed to using.
                    </p>

                    <div class="social-links">
                      <a href="" class="facebook">
                        <i class="fa fa-facebook"></i>
                      </a>
                      <a href="" class="twitter">
                        <i class="fa fa-twitter"></i>
                      </a>
                      <a href="" class="instagram">
                        <i class="fa fa-instagram" aria-hidden="true"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer></Footer>
      </div>
    </React.Fragment>
  );
};

export default ContactUs;
