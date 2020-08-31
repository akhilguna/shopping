import React from "react";
import axios from 'axios';

const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

export default class FormComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      mobile: "",
      // password: "",
      // passwordConfirmation: "",
      message:"",
      nameError: "",
      mobileError: "",
      emailError: "",
      // passwordError: "",
      // passwordConfirmationError: "",
      messageError:"",
      isFormSubmitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validatename = this.validatename.bind(this);
    this.validatemobile = this.validatemobile.bind(this);
    this.validateemail = this.validateemail.bind(this);
    // this.validatePassword = this.validatePassword.bind(this);
    // this.validatePasswordConfirmation = this.validatePasswordConfirmation.bind(
    //   this
    // );
    this.validatemessage=this.validatemessage.bind(this);
    this.validateField = this.validateField.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });

    return;
  }

  handleBlur(event) {
    const { name } = event.target;

    this.validateField(name);
    return;
  }

  handleSubmit(event) {
    event.preventDefault();
    let formFileds = [
      "name",
      "mobile",
      "email",
      "password",
      "passwordConfirmation"
    ];
    axios({
      method: "POST", 
      url:"http://localhost:3002/send", 
      data:  this.state
    }).then((response)=>{
      if (response.data.status === 'success'){
        alert("Message Sent."); 
        this.resetForm()
      }else if(response.data.status === 'fail'){
        alert("Message failed to send.")
      }
    })
    let isValid = true;
    formFileds.forEach(field => {
      isValid = this.validateField(field) && isValid;
    });

    if (isValid) this.setState({ isFormSubmitted: true });
    else this.setState({ isFormSubmitted: false });

    return this.state.isFormSubmitted;
 
  }

  validateField(name) {
    let isValid = false;

    if (name === "name") isValid = this.validatename();
    else if (name === "mobile") isValid = this.validatemobile();
    else if (name === "email") isValid = this.validateemail();
    // else if (name === "password") isValid = this.validatePassword();
    // else if (name === "passwordConfirmation") isValid = this.validatePasswordConfirmation();
    else if (name === "message") isValid = this.validatemessage();
    return isValid;
  }

  validatename() {
    let nameError = "";
    const value = this.state.name;
    if (value.trim() === "") nameError = "First Name is required";

    this.setState({
      nameError
    });
    return nameError === "";
  }

  validatemobile() {
    let mobileError = "";
    const value = this.state.mobile;
    if (value.trim() === "") mobileError = "Last Name is required";

    this.setState({
      mobileError
    });
    return mobileError === "";
  }

  validateemail() {
    let emailError = "";
    const value = this.state.email;
    if (value.trim === "") emailError = "Email Address is required";
    else if (!emailValidator.test(value))
      emailError = "Email is not valid";

    this.setState({
      emailError
    });
    return emailError === "";
  }

  // validatePassword() {
  //   let passwordError = "";
  //   const value = this.state.password;
  //   if (value.trim === "") passwordError = "Password is required";
  //   else if (!passwordValidator.test(value))
  //     passwordError =
  //       "Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase!";

  //   this.setState({
  //     passwordError
  //   });
  //   return passwordError === "";
  // }

  // validatePasswordConfirmation() {
  //   let passwordConfirmationError = "";
  //   if (this.state.password !== this.state.passwordConfirmation)
  //     passwordConfirmationError = "Password does not match Confirmation";

  //   this.setState({
  //     passwordConfirmationError
  //   });
  //   return passwordConfirmationError === "";
  // }
  validatemessage() {
    let messageError = "";
    const value = this.state.message;
    if (value.trim() === "") messageError = "message is required";

    this.setState({
      messageError
    });
    return messageError === "";
  }
  resetForm(){
    
    this.setState({
      name: "",
      mobile: "",
      email: "",
      // password: "",
      // passwordConfirmation: "",
      message:"",
    })
 }

  render() {
    return (
      <React.Fragment>
        
      <div className="container">
      <div class="row">
      <div class="col-md-6 bg-image">
      <div className="contact-info">
      <h3>Get in touch</h3>
      <p>Main Str, no 23, New York</p>
      <p>hosting@contact.com</p>
      <div class="contact-social">
						<a href="#"><i class="fa fa-pinterest"></i></a>
						<a href="#"><i class="fa fa-facebook"></i></a>
						<a href="#"><i class="fa fa-twitter"></i></a>
						<a href="#"><i class="fa fa-dribbble"></i></a>
						<a href="#"><i class="fa fa-behance"></i></a>
					</div>
        {this.state.isFormSubmitted ? (
          <div className="details">
            <h3>Thanks for signing up, find your details below:</h3>
            <div>First Name: {this.state.name}</div>
            <div>Last Name: {this.state.mobile}</div>
            <div>Email Address: {this.state.email}</div>
          </div>
        ) : (
          <form onSubmit={this.handleSubmit} class="contact-form" method="POST">
            <input
              type="text"
              placeholder="First Name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              autoComplete="off"
            />
            <br />
            {this.state.nameError && (
              <div className="errorMsg">{this.state.nameError}</div>
            )}
            <input
              type="text"
              placeholder="Last Name"
              name="mobile"
              value={this.state.mobile}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              autoComplete="off"
            />
            <br />
            {this.state.mobileError && (
              <div className="errorMsg">{this.state.mobileError}</div>
            )}
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              autoComplete="off"
            />
            <br />
            {this.state.emailError && (
              <div className="errorMsg">{this.state.emailError}</div>
            )}
            {/* <input
              type="password"
              placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              autoComplete="off"
            />
            <br />
            {this.state.passwordError && (
              <div className="errorMsg">{this.state.passwordError}</div>
            )}
            <input
              type="password"
              placeholder="Confirm Password"
              name="passwordConfirmation"
              value={this.state.passwordConfirmation}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              autoComplete="off"
            />
            <br />
            {this.state.passwordConfirmationError && (
              <div className="errorMsg">
                {this.state.passwordConfirmationError}
              </div>
            )} */}
            <textarea
              type="text"
              placeholder="message"
              name="message"
              value={this.state.message}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              autoComplete="off"
            />
            <br />
            {this.state.message && (
              <div className="errorMsg">{this.state.messageError}</div>
            )}
            <button className="site-btn">Submit</button>
          </form>
        )}
      </div>
      </div>
      <div class="col-md-6">
      <div class="map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14376.077865872314!2d-73.879277264103!3d40.757667781624285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1546528920522" allowfullscreen="" height="1000"></iframe></div>
      </div>
      </div>
      </div>
      </React.Fragment>
    );
  }
}
