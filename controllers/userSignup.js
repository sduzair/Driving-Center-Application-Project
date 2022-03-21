const User = require("../models/User")

module.exports = async function userSignup(req, res) {
  const userObj = {}
  userObj.username = req.body.username
  userObj.password = req.body.password
  userObj.userType = req.body.userType

  // creating document in db
  User.create(userObj, (err, user) => {
    if (!err) {
      res.render("login", {
        msg: "Signup successfull! Login to continue.",
      })
    } else console.log(err)
  })
}
