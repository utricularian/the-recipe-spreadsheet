import React from 'react'

import {User} from "../../types/User";

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
    <div className="UserBadgeInfo">
      <div className="Email">{loggedInUser.email}</div>
      <div className="Logout"><a href='#' onClick={handleLogout}>Logout</a></div>
    </div>
  )
}

export default UserBadgeInfo
