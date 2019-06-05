import express from 'express';
import morgan from 'morgan';
import * as routes from './routes';
import * as errorMiddleware from './middleware/error';

const app: express.Application = express();
const router: express.Router = express.Router();

app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));

routes.register(router);
app.use('/api', router);
errorMiddleware.register(router);

export default app;
