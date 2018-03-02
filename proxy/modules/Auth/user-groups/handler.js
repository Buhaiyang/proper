let handler = module.exports = {};

handler.onPut = function(req, res, data) {
  res.writeHeader(200, {'Content-Type': 'application/json'});
  res.end();
};

handler.onPost = function(req, res, data) {
  res.writeHeader(201, {'Content-Type': 'application/json'});
  res.end();
};

handler.onDelete = function(req, res) {
  res.writeHeader(200, {'Content-Type': 'text/plain'});
  res.end('删除用户成功');
};

handler.onGet = function(req, res) {
  common.jsonRes(req, res, '/all');
};
