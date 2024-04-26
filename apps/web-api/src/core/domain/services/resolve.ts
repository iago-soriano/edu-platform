import { mainContainer } from "../../../../index.api";
import { IDomainServiceRegistry } from ".";

export const resolveDomainServicesRegistry = () =>
  mainContainer.resolve<IDomainServiceRegistry>("domainServiceRegistry");
