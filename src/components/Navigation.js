import React from 'react';
 
function Navigation() {
  return (
    <nav class="main-navbar">
    <div class="container">
        {/* <div className="header">
      <NavLink exact activeClassName="active" to="/">Home</NavLink>
      <NavLink activeClassName="active" to="/login">Login</NavLink><small>(Access without token only)</small>
      <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink><small>(Access with token only)</small>
    </div> */}
    <ul class="main-menu">
					<li><a href="/login">Login</a></li>
					<li><a href="/dashboard">Dashboard</a></li>
                    <li><a href="/feedback">Feedback</a></li>
                    <li><a href="/cart">Cart</a></li>								
				</ul>
        </div>
</nav>
  );
}
 
export default Navigation;