require('dotenv').config();
// SERVER PLUGIN IS CREATED BY HARPAL SINGH from scratch   and is OPEN SOURCE
require('./db');
const jaiSever = require('jai-server');
const app = jaiSever();

const cors = require('cors');
const jaiBodyParser = require('jai-body-parser');
const routers = require('./router');


app.use(cors({ origin: '*' }));
app.use(jaiBodyParser({
  allowedMethods: ['post', 'put', 'path'],
}));

// AUTOMATICALLY ADDS ROUTES
Object.keys(routers).forEach((router) => {
  app.use(`/${router}`, routers[router]);
});

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to the task manager API' });
})

app.listen(process.env.PORT, async () => {
  console.log(`App started on  http://localhost:${process.env.PORT}`);
});

function getRoutes(stack) {
const routes= [];
 stack.map((r) => {
    if (!r.url) return;
    const { handler, method, url } = r;
    if (typeof handler === 'function') {
      return routes.push({ method, url })
    }
    else{
      const subRoutes = getRoutes(handler.stack);
    
      return routes.push(...subRoutes)
    }
  })
  return routes;
}
const routes = getRoutes(app.stack);
console.log(routes,);