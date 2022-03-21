module.exports = (req, res, next) => {
  if (req.body.username == "" || req.body.password == "") {
    return res.render("login", {
      msg: "Please ensure that all required fields have a value",
    })
  }
  next()
}
