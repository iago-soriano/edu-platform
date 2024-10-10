import KeycloakConnect from "keycloak-connect";

const config: KeycloakConnect.KeycloakConfig = {
  realm: "my-realm",
  "auth-server-url": "http://localhost:8080/auth/",
  resource: "client id - qual o nosso? ele pegou o do express",
  "confidential-port": 0,
  "ssl-required": "external",
};

export const keycloak = new KeycloakConnect({}, config);
