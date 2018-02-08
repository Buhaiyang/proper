let handler = module.exports = {};

handler.onGet = function(req, res, data) {
  res.writeHeader(404, {'Content-Type': 'application/json'});
  res.end(JSON.stringify({
    "timestamp": 1513932643431,
    "status": 404,
    "error": "Not Found",
    "message": "No message available",
    "path": "/base/category/list/2121212"
  }));
};