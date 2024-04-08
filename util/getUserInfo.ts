export const UserInfo = () => {
  // Retrieve the user data from local storage
  const userDataString = localStorage.getItem('userData')
  let userData
  if (userDataString) {
    userData = JSON.parse(userDataString)
  }
  return userData
}
