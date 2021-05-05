const JWT = require('jsonwebtoken')


// const authMiddleware = async (request, response, next) => {
//   if (request.method === "OPTIONS") {
//     next()
//   }
//
//   try {
//     const token = request.headers.authorization.split(' ')[1]
//     if (token === 'null'|| token === 'undefined') {
//       request.user = null
//       next()
//       return
//     }
//
//     const decodedUserId = await JWT.verify(token, process.env.secretKey)
//     request.user = decodedUserId
//     next()
//   } catch (error) {
//     console.log(error)
//   }
// }

// async function authMiddleware(req, res, next) {
//
//   if (req.method === "OPTIONS") {
//     next()
//   }
//
//   // check if client sent cookie
//   let cookie = req.cookies.authToken;
//   if (cookie === undefined) {
//     return res.status(401).json({message: 'You are not authorized'})
//   } else {
//     const decodedUserId = await JWT.verify(cookie, process.env.secretKey)
//     req.user = decodedUserId
//     next()
//   }
// }
//
// module.exports = authMiddleware


async function authMiddleware(req, res, next) {

  if (req.method === "OPTIONS") {
    next()
  }

  // check if client sent cookie
  let userJWT = req.session?.userId;
  if (userJWT === undefined) {
    return res.status(401).json({message: 'You are not authorized'})
  } else {
    const decodedUserId = await JWT.verify(userJWT, process.env.secretKey)
    req.user = decodedUserId
    next()
  }
}

module.exports = authMiddleware
