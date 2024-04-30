import { coreModuleContainer } from "../../../index.api";
import { IDomainServiceRegistry } from ".";

export const resolveDomainServicesRegistry = () =>
  coreModuleContainer.resolve<IDomainServiceRegistry>("domainServiceRegistry");
