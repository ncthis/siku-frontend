type Service = {
  init(): void;
}

class ServiceManager {
  static services: Array<Service> = [];

  static bootstrap(service: Service, _ServiceManager = ServiceManager) {
    _ServiceManager.services.push(service);
  }

  static init(_ServiceManager = ServiceManager) {
    // $FlowFixMe
    _ServiceManager.services.forEach((service: Service) => service.init());
  }
}

export default ServiceManager;
