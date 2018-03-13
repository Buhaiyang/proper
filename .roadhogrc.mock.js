const host = 'http://127.0.0.1:8080/pep/';
export default {
  'GET /api/(.*)': host,
  'POST /api/(.*)': host,
  'PUT /api/(.*)': host,
  'DELETE /api/(.*)': host,
  'GET /workflow/(.*)': host + 'workflow/',
  'POST /workflow/(.*)': host + 'workflow/',
  'PUT /workflow/(.*)': host + 'workflow/',
  'DELETE /workflow/(.*)': host + 'workflow/',
  'GET /pep/(.*)': host,
  'POST /pep/(.*)': host,
  'PUT /pep/(.*)': host,
  'DELETE /pep/(.*)': host,
  'GET /pep/workflow/service/(.*)': host + 'workflow/service/',
  'POST /pep/workflow/service/(.*)': host + 'workflow/service/',
  'PUT /pep/workflow/service/(.*)': host + 'workflow/service/',
  'DELETE /pep/workflow/service/(.*)': host + 'workflow/service/'
}
