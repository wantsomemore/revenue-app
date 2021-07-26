import React from 'react'
import './notification.scss'
const Notification = ({notification}) => {
  
  return (
    <div className="notification-block">
      <h1 className="notification-status">{notification.status}</h1>
      <p className="notification-msg">{notification.message}</p>
    </div>
  )
}

export default Notification
