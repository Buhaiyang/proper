let handler = module.exports = {};

handler.onGet = function(req, res, data) {
  res.writeHeader(500, {'Content-Type': 'application/json'});
  res.end(JSON.stringify({
    "timestamp": 1513932555104,
    "status": 500,
    "error": "error",
    "message": "error",
    "path": "/base/category/list"
  }));
};