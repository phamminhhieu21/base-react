import { useSelector } from 'react-redux'

const useLogOut = () => {
  const logOut = useSelector((state: any) => state.auth.logOut)
  return logOut
}

export default useLogOut
