import cookieSession from 'cookie-session';
import Express, { NextFunction, Request, Response, Express as TExpress } from 'express';
import logger from 'middlewares/logger.middleware';
import getEnvVar from 'env/index';
import Context from 'models/Context';
import { NotFoundError } from 'errors/not-found-error';
import { errorHandler } from 'middlewares/error.middleware';
import { IDatabase } from 'interfaces';
import AuthRouter from 'routers/auth';
import ProjectsRouter from 'routers/projects';
import ProposalsRouter from 'routers/proposals';
import InstitutionsRouter from 'routers/institutions';
import UsersRouter from 'routers/users';
import cors from 'cors'; // Import the cors package

export default class Server {
  db: IDatabase;
  engine: TExpress;

  constructor(database: IDatabase) {
    this.db = database;
    this.engine = Express();
  }

  #registerHandlers() {
    this.engine.use(logger);
    this.engine.use(Express.json());
    
    
    this.engine.use(cors({
      origin: 'http://localhost:5173', // Replace with your frontend URL
      methods: ['POST', 'GET', 'PUT', 'DELETE'],
      credentials: true // Enable if you need to send cookies
    }));

    this.engine.use(
      cookieSession({
        signed: false,
        secure: true,
      }),
    );

    this.engine.get('/health', (_, res) => {
      return res.sendStatus(200);
    });

    this.engine.get('/', (_, res) => {
      return res.sendStatus(200);
    });

    const ctx = new Context(this.db);

    const authRouter = new AuthRouter(ctx, this.engine, '/auth');
    authRouter.register();

    const usersRouter = new UsersRouter(ctx, this.engine, '/users');
    usersRouter.register();

    const projectsRouter = new ProjectsRouter(ctx, this.engine, '/projects');
    projectsRouter.register();

    const proposalsRouter = new ProposalsRouter(ctx, this.engine, '/proposals');
    proposalsRouter.register();

    const institutionsRouter = new InstitutionsRouter(ctx, this.engine, '/institutions');
    institutionsRouter.register();

    this.engine.all('*', async (__: Request, _: Response, next: NextFunction) => {
      next(new NotFoundError());
    });

    this.engine.use(errorHandler);
  }

  start() {
    this.#registerHandlers();
    this.engine.listen(parseInt(getEnvVar('SERVER_PORT')), () => {
      console.log(`Server listening at ${getEnvVar('SERVER_PORT')}`);
    });
  }
}
