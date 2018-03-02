const host = 'http://127.0.0.1:9000/api/';
export default {
  'GET /api/(.*)':host,
  'POST /api/(.*)':host,
  'PUT /api/(.*)':host,
  'DELETE /api/(.*)':host,
  'GET /back/(.*)':'http://192.168.1.196/back/',
}
