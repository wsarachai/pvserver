module.exports = function (cache) {
  
  return function (req, res, next) {
    req.cache = cache;
    next()
  }
};