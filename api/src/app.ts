import express from 'express';
import cors from 'cors';
import routes from './routes';
import middleware from './middleware';

const app = express();

app.use(cors());
app.use(middleware.validateHeaders);

app.use('/', routes);

export default app;
