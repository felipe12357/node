"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubWebHookRoutes = void 0;
const express_1 = require("express");
const github_webhook_controller_1 = require("./github-webhook.controller");
class GithubWebHookRoutes {
    static get routes() {
        const gitHubWebHookController = new github_webhook_controller_1.GitHubWebHookController();
        const router = (0, express_1.Router)();
        router.post('/', gitHubWebHookController.webHookHandler);
        return router;
    }
}
exports.GithubWebHookRoutes = GithubWebHookRoutes;
