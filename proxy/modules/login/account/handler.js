let handler = module.exports = {};

handler.onPost = function(req, res, data) {
  let userName = data.userName;
  let password = data.password;
  let type = data.type;
  res.writeHeader(200, {'Content-Type': 'application/json'});
  if(password === '888888' && userName === 'admin'){
    res.end(JSON.stringify({
      status: 'ok',
      type,
      currentAuthority: 'admin',
      token: 'eyJpZCI6ImRjNjU3NjZjLTAxNzYtNGExZS1hZDBlLWRkMDZiYTY0NWM3bCIsIm5hbWUiOiJhZG1pbiJ9.eyJlbXBOYW1lIjpudWxsLCJyb2xlcyI6ImEsYixjIn0.jgFLzfaFjADFUfti3jGMNqhYb1KN1anU8OkXKh3uKwk'
    }));
  }
  else if(password === '123456' && userName === 'user'){
    res.end(JSON.stringify({
      status: 'ok',
      type,
      currentAuthority: 'user'
    }));
  }else {
    res.end(JSON.stringify({
      status: 'error',
      type,
      currentAuthority: 'guest'
    }));
  }
};
