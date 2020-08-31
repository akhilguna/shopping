import React from 'react';
import { getUser, removeUserSession } from '../Utils/Common';
import App1 from '../App1';

function Dashboard(props) {
  const user = getUser();

  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  }

  return (
    <div>
      Welcome {user.name}!<br /><br />
      <input type="button" onClick={handleLogout} value="Logout" />
      <App1/>
    </div>
  );
}

export default Dashboard;