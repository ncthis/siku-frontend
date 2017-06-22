interface IService {
  init(): void;
}

class ServiceManager {
  public static bootstrap(service: IService, _ServiceManager = ServiceManager) {
    _ServiceManager.services.push(service);
  }

  public static init(_ServiceManager = ServiceManager) {
    _ServiceManager.services.forEach((service: IService) => service.init());
  }

  private static services: IService[] = [];
}

export default ServiceManager;
