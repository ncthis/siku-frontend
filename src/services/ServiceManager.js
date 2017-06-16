// @flow

export interface IService {
  static init(): void,
}

class ServiceManager {
  static services: Array<IService> = [];

  static bootstrap(service: IService, _ServiceManager = ServiceManager) {
    _ServiceManager.services.push(service);
  }

  static init(_ServiceManager = ServiceManager) {
    // $FlowFixMe
    _ServiceManager.services.forEach((service: IServiceManager) => service.init());
  }
}

export default ServiceManager;
