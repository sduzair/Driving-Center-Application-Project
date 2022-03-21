module.exports = (req, res) => {
  if (req.session.userId) {
    return res.render("driver/g2_page", { msg: "" })
  }
}
