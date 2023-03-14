import React from 'react';
import {Link} from "react-router-dom";

import styles from './UnauthenticatedUserControls.module.css'

const UnauthenticatedUserControls = () => {

  return (
    <div className={styles.UnauthenticatedUserControls}>
      <div className={styles.Login}><Link to={'/login'}>Login</Link></div>
      <div className={styles.Register}><Link to={'/register'}>Sign Up</Link></div>
    </div>
  )
}

export default UnauthenticatedUserControls
