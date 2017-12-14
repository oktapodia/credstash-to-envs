import AbstractHandler from '../../AbstractHandler';

export default class A extends AbstractHandler {
  getOrder() {
    return 100;
  }

  handle() {
    return { foo: 'A' };
  }
}
