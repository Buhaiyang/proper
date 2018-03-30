const jsonServer = require('json-server')
const getMockData = require('../proxy/readFile.js');
const prefix = '/pep'
getMockData((mockData)=> {
  console.log(mockData)
  start(mockData)
});
const start = (mockData)=>{
  const server = jsonServer.create()
  server.use(jsonServer.bodyParser)
// const router = jsonServer.router('test.json')
// const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
// server.use(middlewares)

// Add custom routes before JSON Server router
  mockData.forEach(data=>{
    for (let registerUrl in data){
      let method = '';
      let route = '';
      if(registerUrl.indexOf('POST:') === 0){
        route = registerUrl.replace('POST:','')
        method = 'post'
      }else if(registerUrl.indexOf('PUT:') === 0){
        route = registerUrl.replace('PUT:','')
        method = 'put'
      }else if(registerUrl.indexOf('DELETE:') === 0){
        route = registerUrl.replace('DELETE:','')
        method = 'delete'
      }else{
        route = registerUrl.replace('GET:','');
        method = 'get';
      }
      console.log(`register route : ${method.toUpperCase()} /api${route}`)
      server[method](`${prefix}${route}`, (req, res) => {
        const realUrl = `${req.method}:${req.url.replace(prefix,'')}`;
        // 直接用真实的url获取数据 如果没有用注册的url获取数据
        const result = data[realUrl] ? data[realUrl] : data[registerUrl] ;
        if(typeof result ==='object'){
          res.jsonp(result)
        }else if(typeof result ==='function'){
          result(req,res)
        }else{
          console.error('return mock data format error')
        }
      })
    }
  })

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
// server.use(jsonServer.bodyParser)

// server.use((req, res, next) => {
//   console.log(req.method)
//   if (req.method === 'POST') {
//     req.body.createdAt = Date.now()
//   }
//   // Continue to JSON Server router
//   next()
// })
// Use default router
// server.use(router)
// server.use('/api', router)

  server.listen(8080, () => {
    console.log('JSON Server is running')
  })

}

