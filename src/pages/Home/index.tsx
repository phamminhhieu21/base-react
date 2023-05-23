import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from 'store/reducers/auth.reducer'
const HomePage = () => {
  const user: any = useSelector(selectUser())

  return <div>{user ? user.email : 'null'}</div>
}
export default HomePage