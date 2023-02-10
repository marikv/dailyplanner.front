import { api } from 'boot/axios';
import { Tools } from 'src/helpers/Tools';

export class BaseApi {
  constructor() {
    this.api = api;
  }

  get(url, config) {
    return this.api.get(url, config).catch((error) => {
      Tools.showNotify({}, error);
    });
  }

  delete(url, config) {
    return this.api.delete(url, config).catch((error) => {
      Tools.showNotify({}, error);
    });
  }

  post(url, data, config) {
    return this.api.post(url, data, config).catch((error) => {
      Tools.showNotify({}, error);
    });
  }
}
