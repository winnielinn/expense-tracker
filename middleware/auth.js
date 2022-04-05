module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) return next()

    res.status(301).redirect('/users/login')
  }
}