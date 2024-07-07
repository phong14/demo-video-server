import bodyParser from 'body-parser';
import express, { type Express } from 'express';
import { ENV } from './configs/environments.configs';
import router from './routers/index.router';
import { withMiddlewareIP } from './middlewares/ip.middlewares';

const app: Express = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(withMiddlewareIP);
app.use(router);

const port = ENV.PORT;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
