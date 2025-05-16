// middleware/logger.js
function logger(req, res, next) {
  console.log(`${req.method}${req.url}at${new Date().toDateString()}`);
  next();
}
module.exports = logger;
