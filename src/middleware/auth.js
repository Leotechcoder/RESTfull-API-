

export const isAuthenticated = (req, res) => {
  console.log(req.session);
  
  const isAuthenticated = req.isAuthenticated()
  
  if (!isAuthenticated) {
    return false
  } else {
    return true
  }
}