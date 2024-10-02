import { IDomainServiceRegistry } from '.';
import { moduleContainer } from 'index.api';

export const resolveDomainServicesRegistry = () =>
  moduleContainer.resolve<IDomainServiceRegistry>('domainServiceRegistry');
