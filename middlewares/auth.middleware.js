const JWT = require('jsonwebtoken')


const authMiddleware = async (request, response, next) => {
  if (request.method === "OPTIONS") {
    next()
  }

  try {
    const token = request.headers.authorization.split(' ')[1]

    const decodedUserId = await JWT.verify(token, process.env.secretKey)
    request.user = decodedUserId
    next()
  } catch (error) {
    console.log(error)
  }
}

module.exports = authMiddleware
