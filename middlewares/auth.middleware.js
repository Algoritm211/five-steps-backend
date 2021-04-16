const JWT = require('jsonwebtoken')


const authMiddleware = async (request, response, next) => {
  if (request.method === "OPTIONS") {
    next()
  }

  try {
    const token = request.headers.authorization.split(' ')[1]
    if (token === 'null'|| token === 'undefined') {
      request.user = null
      next()
      return
    }

    const decodedUserId = await JWT.verify(token, process.env.secretKey)
    request.user = decodedUserId
    next()
  } catch (error) {
    console.log(error)
  }
}

module.exports = authMiddleware
