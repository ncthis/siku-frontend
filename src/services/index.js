// @flow

export interface IService {
  static init(): void,
}

class Bootstrapper {
  static services: Array<IService>;

  static bootstrapService(service: IService, _Bootstrapper = Bootstrapper) {
    _Bootstrapper.services.push(service);
  }

  static init(_Bootstrapper = Bootstrapper) {
    // $FlowFixMe
    _Bootstrapper.services.forEach((Service: IService) => Service.init());
  }
}

export default Bootstrapper;
