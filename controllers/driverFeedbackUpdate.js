const Driver = require("../models/Driver")

module.exports = function (req, res) {
    console.log(req.body)
    const {_id, examinerComment, testResult} = req.body
    const update = {
        examinerComment: examinerComment,
        testResult: testResult
    }
    Driver.findOneAndUpdate({_id: _id}, update, {
        new: true,
    }, (err, newDriver) => {
        if (err) {
            res.json(err)
        } else {
            res.json(newDriver)
        }
    })
}
