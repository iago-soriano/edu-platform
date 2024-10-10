import { TokenExpiredError } from "jsonwebtoken";
import { ITokenService } from "@edu-platform/common/platform/interfaces";
import { Request as TypedRequest } from "../interfaces";
import { CustomError, Forbidden } from "@edu-platform/common/errors";
import { IUserRepository } from "@application/interfaces";
import { User } from "@domain/entities";

class Unauthorized extends CustomError {
  HTTPstatusCode = 401;
  static message = "Token de acesso inválido";
  constructor() {
    super(Unauthorized.message);
  }
}

export class AccessTokenMiddlewareController {
  constructor(
    private tokenService: ITokenService,
    private userRepository: IUserRepository
  ) {}

  async execute(
    req: TypedRequest<{}, {}, {}>,
    headers: Record<string, string>
  ) {
    if (!headers.authorization) {
      console.error("No auth token");
      throw new Forbidden();
    }

    const [header, token] = headers.authorization.split(" ");
    if (header !== "Bearer") {
      console.error(
        `Authorization header present but incorrect form: ${header}`
      );
      throw new Forbidden();
    }

    let user: User | null;

    try {
      const { userEmail } = this.tokenService.verify(
        token,
        `${process.env.KEYCLOAK_URL}/realms/edu-platform`,
        `-----BEGIN PUBLIC KEY-----\n${process.env.KEYCLOAK_RSA_PUBLIC_KEY}\n-----END PUBLIC KEY-----`
      );

      user = await this.userRepository.getByEmail(userEmail);

      if (!user) throw new Error("User not found");
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new Unauthorized();
      }
      throw e;
    }

    req.user = user;
  }
}
