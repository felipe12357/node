import { Request, Response } from "express";
import { GitHubWebHookService } from "./github-webhook.service";

export class GitHubWebHookController {
    constructor(private readonly gitHubWebHookService: GitHubWebHookService){}

    webHookHandler = (req: Request, res: Response) => {
        const githubEvent = req.header('x-github-event') ?? 'unknown';
        const githubSignature = req.header('x-hub-signature-256') ?? 'unknown';
        const payload = req.body;
        let message:string;

        switch(githubEvent) {
            case 'star':
                message = this.gitHubWebHookService.onStar(payload);
            break;
            case 'issues':
                message = this.gitHubWebHookService.onIssue(payload);
            break;
            default:
                message = `Unknwon event ${githubEvent}`;
            break;
        }

        console.log(message);
        res.status(202).json('accepted');
    }
}