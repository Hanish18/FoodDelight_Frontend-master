import React from 'react'
import NavigationBar from '../Navigation/navigation'

export default (props) => {
  return (
    <div>
      <NavigationBar username={props.username} authToken={props.authToken} userType={props.userType} />
    </div>
  )
}
