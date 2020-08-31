// import React from "react";

// const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

// export default class FormComponent extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       firstName: "",
//       lastName: "",
//       emailAddress: "",
//       password: "",
//       passwordConfirmation: "",
//       feedback:"",
//       firstNameError: "",
//       lastNamerror: "",
//       emailAddressError: "",
//       passwordError: "",
//       passwordConfirmationError: "",
//       feedbackError:"",
//       isFormSubmitted: false
//     };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleBlur = this.handleBlur.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.validateFirstName = this.validateFirstName.bind(this);
//     this.validateLastName = this.validateLastName.bind(this);
//     this.validateEmailAddress = this.validateEmailAddress.bind(this);
//     this.validatePassword = this.validatePassword.bind(this);
//     this.validatePasswordConfirmation = this.validatePasswordConfirmation.bind(
//       this
//     );
//     this.validatefeedback=this.validatefeedback.bind(this);
//     this.validateField = this.validateField.bind(this);
//   }

//   handleChange(event) {
//     const { name, value } = event.target;

//     this.setState({
//       [name]: value
//     });

//     return;
//   }

//   handleBlur(event) {
//     const { name } = event.target;

//     this.validateField(name);
//     return;
//   }

//   handleSubmit(event) {
//     event.preventDefault();
//     let formFileds = [
//       "firstName",
//       "lastName",
//       "emailAddress",
//       "password",
//       "passwordConfirmation"
//     ];
//     let isValid = true;
//     formFileds.forEach(field => {
//       isValid = this.validateField(field) && isValid;
//     });

//     if (isValid) this.setState({ isFormSubmitted: true });
//     else this.setState({ isFormSubmitted: false });

//     return this.state.isFormSubmitted;
//   }

//   validateField(name) {
//     let isValid = false;

//     if (name === "firstName") isValid = this.validateFirstName();
//     else if (name === "lastName") isValid = this.validateLastName();
//     else if (name === "emailAddress") isValid = this.validateEmailAddress();
//     else if (name === "password") isValid = this.validatePassword();
//     else if (name === "passwordConfirmation") isValid = this.validatePasswordConfirmation();
//     else if (name === "feedback") isValid = this.validatefeedback();
//     return isValid;
//   }

//   validateFirstName() {
//     let firstNameError = "";
//     const value = this.state.firstName;
//     if (value.trim() === "") firstNameError = "First Name is required";

//     this.setState({
//       firstNameError
//     });
//     return firstNameError === "";
//   }

//   validateLastName() {
//     let lastNameError = "";
//     const value = this.state.lastName;
//     if (value.trim() === "") lastNameError = "Last Name is required";

//     this.setState({
//       lastNameError
//     });
//     return lastNameError === "";
//   }

//   validateEmailAddress() {
//     let emailAddressError = "";
//     const value = this.state.emailAddress;
//     if (value.trim === "") emailAddressError = "Email Address is required";
//     else if (!emailValidator.test(value))
//       emailAddressError = "Email is not valid";

//     this.setState({
//       emailAddressError
//     });
//     return emailAddressError === "";
//   }

//   validatePassword() {
//     let passwordError = "";
//     const value = this.state.password;
//     if (value.trim === "") passwordError = "Password is required";
//     else if (!passwordValidator.test(value))
//       passwordError =
//         "Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase!";

//     this.setState({
//       passwordError
//     });
//     return passwordError === "";
//   }

//   validatePasswordConfirmation() {
//     let passwordConfirmationError = "";
//     if (this.state.password !== this.state.passwordConfirmation)
//       passwordConfirmationError = "Password does not match Confirmation";

//     this.setState({
//       passwordConfirmationError
//     });
//     return passwordConfirmationError === "";
//   }
//   validatefeedback() {
//     let feedbackError = "";
//     const value = this.state.feedback;
//     if (value.trim() === "") feedbackError = "feedback is required";

//     this.setState({
//       feedbackError
//     });
//     return feedbackError === "";
//   }


//   render() {
//     return (
//       <React.Fragment>
        
//       <div className="container">
//       <div class="row">
//       <div class="col-md-6 bg-image">
//       <div>
//       <h3>Get in touch</h3>
//       <p>Main Str, no 23, New York</p>
//       <p>hosting@contact.com</p>
//       <div class="contact-social">
// 						<a href="#"><i class="fa fa-pinterest"></i></a>
// 						<a href="#"><i class="fa fa-facebook"></i></a>
// 						<a href="#"><i class="fa fa-twitter"></i></a>
// 						<a href="#"><i class="fa fa-dribbble"></i></a>
// 						<a href="#"><i class="fa fa-behance"></i></a>
// 					</div>
//         {this.state.isFormSubmitted ? (
//           <div className="details">
//             <h3>Thanks for signing up, find your details below:</h3>
//             <div>First Name: {this.state.firstName}</div>
//             <div>Last Name: {this.state.lastName}</div>
//             <div>Email Address: {this.state.emailAddress}</div>
//           </div>
//         ) : (
//           <form onSubmit={this.handleSubmit} class="contact-form">
//             <input
//               type="text"
//               placeholder="First Name"
//               name="firstName"
//               value={this.state.firstName}
//               onChange={this.handleChange}
//               onBlur={this.handleBlur}
//               autoComplete="off"
//             />
//             <br />
//             {this.state.firstNameError && (
//               <div className="errorMsg">{this.state.firstNameError}</div>
//             )}
//             <input
//               type="text"
//               placeholder="Last Name"
//               name="lastName"
//               value={this.state.lastName}
//               onChange={this.handleChange}
//               onBlur={this.handleBlur}
//               autoComplete="off"
//             />
//             <br />
//             {this.state.lastNameError && (
//               <div className="errorMsg">{this.state.lastNameError}</div>
//             )}
//             <input
//               type="email"
//               placeholder="Email Address"
//               name="emailAddress"
//               value={this.state.emailAddress}
//               onChange={this.handleChange}
//               onBlur={this.handleBlur}
//               autoComplete="off"
//             />
//             <br />
//             {this.state.emailAddressError && (
//               <div className="errorMsg">{this.state.emailAddressError}</div>
//             )}
//             {/* <input
//               type="password"
//               placeholder="Password"
//               name="password"
//               value={this.state.password}
//               onChange={this.handleChange}
//               onBlur={this.handleBlur}
//               autoComplete="off"
//             />
//             <br />
//             {this.state.passwordError && (
//               <div className="errorMsg">{this.state.passwordError}</div>
//             )}
//             <input
//               type="password"
//               placeholder="Confirm Password"
//               name="passwordConfirmation"
//               value={this.state.passwordConfirmation}
//               onChange={this.handleChange}
//               onBlur={this.handleBlur}
//               autoComplete="off"
//             />
//             <br />
//             {this.state.passwordConfirmationError && (
//               <div className="errorMsg">
//                 {this.state.passwordConfirmationError}
//               </div>
//             )} */}
//             <textarea
//               type="text"
//               placeholder="feedback"
//               name="feedback"
//               value={this.state.feedback}
//               onChange={this.handleChange}
//               onBlur={this.handleBlur}
//               autoComplete="off"
//             />
//             <br />
//             {this.state.feedback && (
//               <div className="errorMsg">{this.state.feedbackError}</div>
//             )}
//             <button className="site-btn">Signup</button>
//           </form>
//         )}
//       </div>
//       </div>
//       <div class="col-md-6">
//       <div class="map">
//         <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14376.077865872314!2d-73.879277264103!3d40.757667781624285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1546528920522" allowfullscreen="" height="1000"></iframe></div>
//       </div>
//       </div>
//       </div>
//       </React.Fragment>
//     );
//   }
// }
import React from "react";
import axios from 'axios';

class FormComponent extends React.Component {
  constructor(props) {
	super(props);
	this.state = {
  	name: '',
  	email: '',
  	message: ''
	}
  }
  handleSubmit(e){
    e.preventDefault();
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
  }

  resetForm(){
    
     this.setState({name: '', email: '', message: ''})
  }

render() {
 return(
   <div className="App">
   <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
    <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" className="form-control" value={this.state.name} onChange={this.onNameChange.bind(this)} />
    </div>
    <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input type="email" className="form-control" aria-describedby="emailHelp" value={this.state.email} onChange={this.onEmailChange.bind(this)} />
    </div>
    <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea className="form-control" rows="5" value={this.state.message} onChange={this.onMessageChange.bind(this)} />
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </div>
 );
}

  onNameChange(event) {
	this.setState({name: event.target.value})
  }

  onEmailChange(event) {
	this.setState({email: event.target.value})
  }

  onMessageChange(event) {
	this.setState({message: event.target.value})
  }


}

export default FormComponent;
