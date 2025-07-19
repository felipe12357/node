import { Router } from 'express';
import { GithubWebHookRoutes } from './github-webhook/github-webhook.route';

export class AppRoutes {

  static get routes(): Router {

    const router = Router();    
    // Definir las rutas
    router.use('/api/github-webhook', GithubWebHookRoutes.routes );
    return router;
  }

}