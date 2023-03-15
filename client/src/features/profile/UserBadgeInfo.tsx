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
      <div className={styles.Logout}><button className="btn btn-link btn-sm" onClick={handleLogout}>Logout</button></div>
    </div>
  )
}

export default UserBadgeInfo
