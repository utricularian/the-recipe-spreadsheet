import React from 'react'

import {User} from "../../types/User";

import styles from './UserBadgeInfo.module.css'

interface UserBadgeInfoProps {
  loggedInUser: User
  onLogout: () => void
}

const UserBadgeInfo = ({ loggedInUser, onLogout }: UserBadgeInfoProps) => {

  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    onLogout()
  }

  return (
    <div className={styles.UserBadgeInfo}>
      <div className={styles.Email}>{loggedInUser.email}</div>
      {/* TODO make this <a> a button */}
      <div className={styles.Logout}><a href='#' onClick={handleLogout}>Logout</a></div>
    </div>
  )
}

export default UserBadgeInfo
