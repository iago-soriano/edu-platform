import { mainContainer } from "index";
import { IDomainServiceRegistry } from ".";

export const resolveDomainServicesRegistry = () =>
  mainContainer.resolve<IDomainServiceRegistry>("domainServiceRegistry");
