"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const github_webhook_route_1 = require("./github-webhook/github-webhook.route");
class AppRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        // Definir las rutas
        router.use('/api/github-webhook', github_webhook_route_1.GithubWebHookRoutes.routes);
        return router;
    }
}
exports.AppRoutes = AppRoutes;
