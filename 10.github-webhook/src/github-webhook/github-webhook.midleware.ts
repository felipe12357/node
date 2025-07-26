import { envs } from "../config/envs";
import { NextFunction, Request, Response } from "express";

export class AuthGithubWebHook {

    private static encoder = new TextEncoder();

    static async verifyWebhookSignature(req: Request, res: Response, next: NextFunction) {
        const signature = req.headers["x-hub-signature-256"];
        const body = JSON.stringify(req.body);
        const secret = envs.WEB_HOOK_TOKEN;

        if(signature) {
            const isValid = await AuthGithubWebHook.verifySignature(secret,signature as string,body);
            if(isValid){
                next();
            } else {
                console.log('wrong signature provided');
                 res.status(401).json({error: 'wrong signature provided'})
            }
        } else {
             console.log('not signature provided');
            res.status(401).json({error: 'not signature provided'})
        }
    }

    private static async verifySignature(secret:string, header:string, payload:string):Promise<boolean> {
        let parts = header.split("=");
        let sigHex = parts[1];

        let algorithm = { name: "HMAC", hash: { name: 'SHA-256' } };

        let keyBytes = AuthGithubWebHook.encoder.encode(secret);
        let extractable = false;
        let key = await crypto.subtle.importKey(
            "raw",
            keyBytes,
            algorithm,
            extractable,
            [ "sign", "verify" ],
        );

        let sigBytes = AuthGithubWebHook.hexToBytes(sigHex);
        let dataBytes = this.encoder.encode(payload);
        let equal = await crypto.subtle.verify(
            algorithm.name,
            key,
            sigBytes,
            dataBytes,
        );

        return equal;
    }

    private static hexToBytes(hex:string) {
        let len = hex.length / 2;
        let bytes = new Uint8Array(len);

        let index = 0;
        for (let i = 0; i < hex.length; i += 2) {
            let c = hex.slice(i, i + 2);
            let b = parseInt(c, 16);
            bytes[index] = b;
            index += 1;
        }

        return bytes;
    }
}
