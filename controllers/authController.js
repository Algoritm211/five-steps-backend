const User = require('../models/User')
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken');

class AuthController {

  async registerUser(request, response) {
    try {

      const {email, password, age, name, surName, birthdayDate, role} = request.body

      const person = await User.findOne({email: email})

      if (person) {
        return response.status(400).json({message: `This user with email ${email} already exist`})
      }

      const hashPassword = await bcrypt.hash(password, 8)
      const user = new User({email: email, password: hashPassword, name: name, surName: surName || '', age: age || '', birthdayDate: birthdayDate || '', role: role || 'student'})
      await user.save()
      return response.status(200).json({message: 'User created successfully'})

    } catch (error) {
      console.log(error)
      response.send({'Error while creating new User': error})
    }
  }

  async loginUser(request, response) {
    try {
      const {email, password} = request.body

      const user = await User.findOne({email: email})

      if (!user) {
        return response.status(400).json({message: 'User does not exist'})
      }

      const isPasswordValid = await bcrypt.compare(password, user.password)

      if (!isPasswordValid) {
        return response.status(400).json({message: 'Invalid password or login'})
      }

      const token = await JWT.sign({id: user._id}, process.env.secretKey, {})
      return response.status(200).json({
        token: token,
        user: {
          lessonsCompleted: user.lessonsCompleted,
          id: user._id,
          email: user.email,
          role: user.role,
          name: user.name,
          surname: user.surname,
        }
      })

    } catch (error) {
      console.log(error);
      response.send(500).json({message: 'Error during the login'})
    }
  }

  async authorizationUser(request, response) {

    try {
      const user = await User.findOne({_id: request.user.id})

      if (!user) {
        return response.status(401).json({message: 'This user was not found'})
      }

      const token = JWT.sign({id: user.id}, process.env.secretKey, {})
      return response.json({
        token: token,
        user: {
          lessonsCompleted: user.lessonsCompleted,
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name,
          surname: user.surname,
        }
      })

    } catch (error) {
      response.send({message: "Server Error"})
    }
  }

  async socialAuth(req, res) {
    try {
      const { authInfo, user } = req;
      // console.log(user)
      if (authInfo.statusCode === 200) {
        const token = JWT.sign({id: user.id}, process.env.secretKey, {})

        const userInfo = {
          token: token,
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
            name: user.name,
            surname: user.surname,
            lessonsCompleted: user.lessonsCompleted,
          }
        }

        res.send(
          `<script>window.opener.postMessage('${JSON.stringify(userInfo,)}', '*');window.close();</script>`,
        );
      }

      return res.send(
        `<script>window.opener.postMessage('${JSON.stringify({...user, error: 404},)}', '*');window.close();</script>`,
      );
    } catch (error) {
      console.log(error)
      return res.status(200).json({message: 'Auth Failed'})
    }
  }
}

module.exports = new AuthController()
