import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from '../Utils/Common';

function Login(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios.post('http://localhost:4000/users/signin', { username: username.value, password: password.value }).then(response => {
      setLoading(false);
      setUserSession(response.data.token, response.data.user);
      props.history.push('/dashboard');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  return (
    <div className="container">
      <div className="col-md-12  login text-center">
      <div class="card">
      <div class="card-body">
    <h5 class="card-title">Login</h5>
       <form class="login-form">
      <div className="form-group">
      <label for="exampleInputEmail1">Email address</label>
        <input type="text" {...username} autoComplete="new-password" class="form-control" id="exampleInputEmail1" placeholder="enter the email" />
      </div>
      <div style={{ marginTop: 10 }} className="form-group">
      <label for="password">Password</label>
        <input type="password" {...password} autoComplete="new-password"class="form-control" id="password" placeholder="enter the password"/>
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="button" className="site-btn" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
      </form>
    </div>
    </div>
    </div>
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login;