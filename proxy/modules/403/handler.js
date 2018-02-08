let handler = module.exports = {};

handler.onGet = function(req, res, data) {
  res.writeHeader(403, {'Content-Type': 'application/json'});
  res.end(JSON.stringify({
    "timestamp": 1513932555104,
    "status": 403,
    "error": "Unauthorized",
    "message": "Unauthorized",
    "path": "/base/category/list"
  }));
};