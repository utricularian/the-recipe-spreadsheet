import React from 'react';
import {Link} from "react-router-dom";

const UnauthenticatedUserControls = () => {

  return (
    <div className="UnauthenticatedUserControls">
      <div className="Login"><Link to={'/login'}>Login</Link></div>
      <div className="Register"><Link to={'/register'}>Sign Up</Link></div>
    </div>
  )
}

export default UnauthenticatedUserControls
