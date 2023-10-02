import { ITokenService } from "@interfaces";
import { TokenGenerationError } from "@edu-platform/common/errors";
import jwt from "jsonwebtoken";

export class JWTTokenService implements ITokenService {
  token_secret = process.env.TOKEN_SECRET;

  generate(args: any) {
    try {
      const resp = jwt.sign(
        {
          // tokens last 6 months
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30 * 6,
          data: args,
        },
        this.token_secret
      );
      return resp;
    } catch (e) {
      throw new TokenGenerationError({ error: e.message });
    }
  }

  verify(token: string) {
    try {
      const payload = jwt.verify(token, this.token_secret) as any;
      return payload.data;
    } catch(e) {
      console.error(e.message);
    }

  }
}
