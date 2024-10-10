import { KeycloakAdminClient } from "@s3pweb/keycloak-admin-client-cjs";
import { IKeycloakAdmin } from "./interfaces";
function sanitizeString(input: string): string {
  // Use a regular expression to replace spaces and special characters with an empty string
  return input
    .replace(/[^a-zA-Z0-9]/g, "") // Remove special characters
    .toLowerCase(); // Convert to lowercase
}
export class KeycloakAdmin implements IKeycloakAdmin {
  _kcAdminClient: KeycloakAdminClient;
  constructor() {
    this._kcAdminClient = new KeycloakAdminClient({
      baseUrl: process.env.KEYCLOAK_URL,
      realmName: "edu-platform",
    });
    // Authorize with username / password
    if (!process.env.KEYCLOAK_CLIENT_ID || !process.env.KEYCLOAK_CLIENT_SECRET)
      throw new Error("Keycloak env vars not configured!");
    this._kcAdminClient.auth({
      grantType: "client_credentials",
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
    });
  }

  async createUser(username: string, email: string, password: string) {
    try {
      const resp = await this._kcAdminClient.users.create({
        realm: "edu-platform",
        firstName: username,
        enabled: true,
        username: sanitizeString(username),
        email,
        emailVerified: false,
        credentials: [
          {
            type: "password",
            value: password,
            temporary: false,
          },
        ],
      });
      return resp;
    } catch (e) {
      console.error((e as any)?.response?.responseData);
      return { id: "" };
    }
  }
}
