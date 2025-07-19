"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHubWebHookController = void 0;
class GitHubWebHookController {
    constructor() {
        this.webHookHandler = (req, res) => {
            var _a, _b;
            const githubEvent = (_a = req.header('x-github-event')) !== null && _a !== void 0 ? _a : 'unknown';
            const githubSignature = (_b = req.header('x-hub-signature-256')) !== null && _b !== void 0 ? _b : 'unknown';
            const payload = req.body;
            console.log(payload);
            res.status(202).json('bu');
        };
    }
}
exports.GitHubWebHookController = GitHubWebHookController;
