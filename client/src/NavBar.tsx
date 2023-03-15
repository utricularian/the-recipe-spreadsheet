import React from 'react'

import UserBadge from "./features/profile/UserBadge";

import styles from './NavBar.module.css'

interface NavBarProps {
  isAuthenticationFlow?: boolean
}

const navBarPropDefaults: NavBarProps = {
  isAuthenticationFlow: false
}

const NavBar = (options: NavBarProps) => {
  const { isAuthenticationFlow } = { ...navBarPropDefaults, ...options }

  return (
    <div className="mb-3">
      <div className={styles.NavBar}>
        <div className={styles.NavMenu}>Menu</div>
        <a className={styles.Logo} href="/">
          <img src="/images/logo.jpg" alt="The Recipe Spreadsheet" />
          The Recipe Spreadsheet
        </a>
        <div className={styles.UserBadge}>{!isAuthenticationFlow && <UserBadge />}</div>
      </div>
    </div>
  )
}

export default NavBar
