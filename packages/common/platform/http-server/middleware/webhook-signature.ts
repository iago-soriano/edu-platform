import { Request, ITokenService, JWTPayload } from "../../interfaces";

export class WebhhookSignatureMiddlewareController {
  constructor(private tokenService: ITokenService) {}

  async execute(req: Request<{}, {}, {}>, headers: Record<string, string>) {
    // TODO: verify secret signature at req.headers['x-keycloak-signature']
    console.log("verifying webhook signature...");
  }
}
