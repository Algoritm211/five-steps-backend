module.exports = function staticMiddleware(filePath) {
  return (request, response, next) => {
    request.staticPath = filePath
    next()
  }
}
