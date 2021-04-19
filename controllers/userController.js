const User = require('../models/User')
const bcrypt = require('bcryptjs')

class UserController {
  async updateUser(req, res) {
    try {
      const updateObj = req.body
      if (updateObj.password) {
        updateObj.password = await bcrypt.hash(updateObj.password, 8)
      }
      const user = await User.findOneAndUpdate(
        {_id: req.user.id},
        updateObj,
        {new: true}
      )
      return res.status(200).json({user})
    } catch (error) {
      console.log(error)
      return res.status(500).json({message: 'Error. Can not update user'})
    }
  }
}

module.exports = new UserController()
