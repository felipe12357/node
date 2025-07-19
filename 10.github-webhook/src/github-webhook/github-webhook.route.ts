import { Router } from "express";
import { Request, Response } from "express";
import { GitHubWebHookController } from "./github-webhook.controller";
import { GitHubWebHookService } from "./github-webhook.service";

export class GithubWebHookRoutes {
    
    static get routes(): Router {
        const gitHubWebHookService = new GitHubWebHookService();
        const gitHubWebHookController = new GitHubWebHookController(gitHubWebHookService);
        const router = Router();
        router.post('/', gitHubWebHookController.webHookHandler );

        return router;
    }
}
