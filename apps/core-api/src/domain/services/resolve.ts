import { mainContainer } from "main/api-gateway";
import { IDomainServiceRegistry } from ".";

export const resolveDomainServicesRegistry = () =>
  mainContainer.resolve<IDomainServiceRegistry>("domainServiceRegistry");
